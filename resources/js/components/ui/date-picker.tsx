'use client'

import type { DateRange as CalendarDateRange } from '@daypicker/react'

import { IconCalendar, IconX } from '@tabler/icons-react'
import {
  type ChangeEvent,
  type ComponentProps,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

import { Calendar } from './calendar'
import { InputGroup } from './input-group'
import { Popover } from './popover'

export type DateFormatToken = 'dd' | 'MM' | 'yyyy'

const TOKEN_REGEX = /yyyy|MM|dd/g

export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime())
}

export function startOfDay(date: Date): Date {
  const result = new Date(date)
  result.setHours(0, 0, 0, 0)
  return result
}

export function isSameDay(a: Date | undefined, b: Date | undefined) {
  if (!a || !b) return a === b

  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function getFormatTokens(format: string) {
  return [...format.matchAll(TOKEN_REGEX)].map((match) => ({
    token: match[0] as DateFormatToken,
    index: match.index!,
  }))
}

export function validateDateFormat(format: string) {
  const tokens = getFormatTokens(format)
  const names = tokens.map(({ token }) => token)

  if (
    tokens.length !== 3 ||
    new Set(names).size !== 3 ||
    !['dd', 'MM', 'yyyy'].every((token) =>
      names.includes(token as DateFormatToken),
    )
  ) {
    throw new Error(
      `Invalid dateFormat "${format}". Expected dd, MM and yyyy exactly once.`,
    )
  }
}

export function formatDate(date: Date | undefined, format: string) {
  if (!isValidDate(date)) return ''

  const values: Record<DateFormatToken, string> = {
    dd: String(date.getDate()).padStart(2, '0'),
    MM: String(date.getMonth() + 1).padStart(2, '0'),
    yyyy: String(date.getFullYear()).padStart(4, '0'),
  }

  return format.replace(
    TOKEN_REGEX,
    (token) => values[token as DateFormatToken],
  )
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function parseDate(value: string, format: string): Date | undefined {
  const tokens = getFormatTokens(format)
  let pattern = ''
  let cursor = 0

  for (const { token, index } of tokens) {
    pattern += escapeRegex(format.slice(cursor, index))
    pattern += token === 'yyyy' ? '(\\d{4})' : '(\\d{2})'
    cursor = index + token.length
  }

  pattern += escapeRegex(format.slice(cursor))

  const match = new RegExp(`^${pattern}$`).exec(value)

  if (!match) return undefined

  const parts: Partial<Record<DateFormatToken, number>> = {}

  tokens.forEach(({ token }, index) => {
    parts[token] = Number(match[index + 1])
  })

  const year = parts.yyyy!
  const month = parts.MM!
  const day = parts.dd!

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return undefined
  }

  const date = new Date(0)
  date.setHours(0, 0, 0, 0)
  date.setFullYear(year, month - 1, day)

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return undefined
  }

  return date
}

/**
 * Format digit-only input into the configured date format.
 *
 * Examples:
 * 31102026 -> 31/10/2026
 * 20261031 -> 2026-10-31
 */
export function applyDateMask(value: string, format: string) {
  const tokens = getFormatTokens(format)
  const digits = value.replace(/\D/g, '').slice(0, 8)

  let result = ''
  let offset = 0

  tokens.forEach(({ token, index }, tokenIndex) => {
    const length = token === 'yyyy' ? 4 : 2
    const segment = digits.slice(offset, offset + length)

    result += segment
    offset += segment.length

    const next = tokens[tokenIndex + 1]

    if (next && segment.length === length && offset < digits.length) {
      result += format.slice(index + token.length, next.index)
    }
  })

  return result
}

/**
 * Restore cursor position based on digit count,
 * not character count.
 */
export function getCaretPosition(value: string, digitCount: number) {
  if (digitCount <= 0) return 0

  let count = 0

  for (let i = 0; i < value.length; i++) {
    if (/\d/.test(value[i])) count++

    if (count === digitCount) return i + 1
  }

  return value.length
}

export function isDateInRange(date: Date, minDate?: Date, maxDate?: Date) {
  const current = startOfDay(date)

  if (minDate && current < startOfDay(minDate)) return false
  if (maxDate && current > startOfDay(maxDate)) return false

  return true
}

type InputProps = Omit<
  ComponentProps<typeof InputGroup.Input>,
  'value' | 'defaultValue' | 'onChange'
>

export type DatePickerProps = InputProps & {
  value?: Date | null
  defaultValue?: Date
  onChange?: (date: Date | undefined) => void

  dateFormat?: string
  mask?: boolean

  minDate?: Date
  maxDate?: Date
  isDateDisabled?: (date: Date) => boolean

  clearable?: boolean
  defaultMonth?: Date

  onTextChange?: (value: string) => void
  onInvalid?: (value: string) => void
}

type DateValidation = {
  valid: boolean
  date?: Date
}

function validateInput(
  value: string,
  format: string,
  minDate?: Date,
  maxDate?: Date,
  isDateDisabled?: (date: Date) => boolean,
): DateValidation {
  if (!value) {
    return { valid: true }
  }

  const date = parseDate(value, format)

  if (!date) {
    return { valid: false }
  }

  if (!isDateInRange(date, minDate, maxDate) || isDateDisabled?.(date)) {
    return { valid: false }
  }

  return { valid: true, date }
}

function DatePicker({
  value,
  defaultValue,
  onChange,
  dateFormat = 'dd/MM/yyyy',
  mask = true,
  minDate,
  maxDate,
  isDateDisabled,
  clearable = false,
  defaultMonth,
  onTextChange,
  onInvalid,
  disabled,
  readOnly,
  onKeyDown,
  onBlur,
  ...props
}: DatePickerProps) {
  validateDateFormat(dateFormat)

  // ---------------------------------------------------------------------------
  // Controlled / uncontrolled state
  // ---------------------------------------------------------------------------

  const controlled = value !== undefined

  const [internalDate, setInternalDate] = useState<Date | undefined>(() =>
    isValidDate(defaultValue) ? defaultValue : undefined,
  )

  const selectedDate = controlled
    ? isValidDate(value)
      ? value
      : undefined
    : internalDate

  // ---------------------------------------------------------------------------
  // Input state
  // ---------------------------------------------------------------------------

  const [inputValue, setInputValue] = useState(() =>
    formatDate(selectedDate, dateFormat),
  )

  const validation = validateInput(
    inputValue,
    dateFormat,
    minDate,
    maxDate,
    isDateDisabled,
  )

  const invalid = inputValue.length > 0 && !validation.valid

  // ---------------------------------------------------------------------------
  // Calendar state
  // ---------------------------------------------------------------------------

  const [open, setOpen] = useState(false)

  const [month, setMonth] = useState(
    () => selectedDate ?? defaultMonth ?? new Date(),
  )

  // ---------------------------------------------------------------------------
  // Refs
  // ---------------------------------------------------------------------------

  const inputRef = useRef<HTMLInputElement>(null)

  const caretRef = useRef<{
    start: number
    end: number
  } | null>(null)

  const previousFormat = useRef(dateFormat)

  // ---------------------------------------------------------------------------
  // Synchronization
  // ---------------------------------------------------------------------------

  useEffect(() => {
    setInputValue(formatDate(selectedDate, dateFormat))

    if (selectedDate) {
      setMonth(selectedDate)
    }
  }, [selectedDate?.getTime(), dateFormat])

  useEffect(() => {
    if (previousFormat.current === dateFormat) return

    previousFormat.current = dateFormat

    // Reformat the selected date when format changes.
    setInputValue(formatDate(selectedDate, dateFormat))
  }, [dateFormat])

  useLayoutEffect(() => {
    if (!caretRef.current) return

    inputRef.current?.setSelectionRange(
      caretRef.current.start,
      caretRef.current.end,
    )

    caretRef.current = null
  }, [inputValue])

  // ---------------------------------------------------------------------------
  // Date commit
  // ---------------------------------------------------------------------------

  const commitDate = useCallback(
    (nextDate: Date | undefined) => {
      if (nextDate && !isValidDate(nextDate)) return

      if (
        nextDate &&
        (!isDateInRange(nextDate, minDate, maxDate) ||
          isDateDisabled?.(nextDate))
      ) {
        return
      }

      if (isSameDay(selectedDate, nextDate)) return

      if (!controlled) {
        setInternalDate(nextDate)
      }

      onChange?.(nextDate)
    },
    [controlled, selectedDate, minDate, maxDate, isDateDisabled, onChange],
  )

  // ---------------------------------------------------------------------------
  // Input change
  // ---------------------------------------------------------------------------

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget
    const rawValue = input.value

    let nextValue = rawValue

    if (mask) {
      const start = input.selectionStart ?? rawValue.length
      const end = input.selectionEnd ?? start

      const startDigits = rawValue.slice(0, start).replace(/\D/g, '').length
      const endDigits = rawValue.slice(0, end).replace(/\D/g, '').length

      nextValue = applyDateMask(rawValue, dateFormat)

      caretRef.current = {
        start: getCaretPosition(nextValue, startDigits),
        end: getCaretPosition(nextValue, endDigits),
      }
    }

    setInputValue(nextValue)
    onTextChange?.(nextValue)

    const result = validateInput(
      nextValue,
      dateFormat,
      minDate,
      maxDate,
      isDateDisabled,
    )

    if (!result.valid) {
      if (nextValue.length > 0) {
        onInvalid?.(nextValue)
      }
      return
    }

    commitDate(result.date)
  }

  // ---------------------------------------------------------------------------
  // Clear
  // ---------------------------------------------------------------------------

  function handleClear() {
    setInputValue('')
    onTextChange?.('')
    commitDate(undefined)

    inputRef.current?.focus()
  }

  // ---------------------------------------------------------------------------
  // Keyboard
  // ---------------------------------------------------------------------------

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    onKeyDown?.(event)

    if (event.defaultPrevented || disabled) return

    if (event.key === 'ArrowDown' && !event.altKey && !readOnly) {
      event.preventDefault()
      setOpen(true)
    }

    if (event.key === 'Escape') {
      setOpen(false)
    }

    if (event.key === 'Enter' && open) {
      event.preventDefault()
      setOpen(false)
    }
  }

  // ---------------------------------------------------------------------------
  // Calendar
  // ---------------------------------------------------------------------------

  const isDisabledDate = useCallback(
    (date: Date) => {
      return (
        !isDateInRange(date, minDate, maxDate) ||
        Boolean(isDateDisabled?.(date))
      )
    },
    [minDate, maxDate, isDateDisabled],
  )

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <InputGroup>
      <InputGroup.Input
        {...props}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-invalid={props['aria-invalid'] ?? invalid}
        autoComplete="off"
        disabled={disabled}
        inputMode={mask ? 'numeric' : 'text'}
        onBlur={onBlur}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={props.placeholder ?? dateFormat}
        readOnly={readOnly}
        ref={inputRef}
        type="text"
        value={inputValue}
      />

      <InputGroup.Addon align="inline-end">
        {clearable && inputValue && !disabled && !readOnly && (
          <InputGroup.Button
            aria-label="Clear date"
            onClick={handleClear}
            size="icon-xs"
            type="button"
            variant="ghost"
          >
            <IconX />
          </InputGroup.Button>
        )}

        <Popover onOpenChange={setOpen} open={open}>
          <Popover.Trigger
            render={
              <InputGroup.Button
                aria-label="Open calendar"
                disabled={disabled}
                size="icon-xs"
                type="button"
                variant="ghost"
              />
            }
          >
            <IconCalendar />
            <span className="sr-only">Open calendar</span>
          </Popover.Trigger>

          <Popover.Content
            align="end"
            alignOffset={-3}
            aria-label="Choose date"
            className="w-auto overflow-hidden p-0"
            role="dialog"
            sideOffset={10}
          >
            <Calendar
              captionLayout="dropdown"
              disabled={isDisabledDate}
              mode="single"
              month={month}
              onMonthChange={setMonth}
              onSelect={(nextDate) => {
                if (!nextDate) return

                const formatted = formatDate(nextDate, dateFormat)

                setInputValue(formatted)
                onTextChange?.(formatted)
                commitDate(nextDate)
                setOpen(false)
              }}
              selected={selectedDate}
            />
          </Popover.Content>
        </Popover>
      </InputGroup.Addon>
    </InputGroup>
  )
}

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type DateRange = {
  from?: Date
  to?: Date
}

type RangeInputProps = Omit<
  ComponentProps<typeof InputGroup.Input>,
  'value' | 'defaultValue' | 'onChange' | 'type' | 'onKeyDown'
>

export type DateRangePickerProps = RangeInputProps & {
  value?: DateRange | null
  defaultValue?: DateRange

  onChange?: (range: DateRange | undefined) => void

  dateFormat?: string
  mask?: boolean

  minDate?: Date
  maxDate?: Date

  isDateDisabled?: (date: Date) => boolean

  numberOfMonths?: number
  defaultMonth?: Date

  onTextChange?: (value: string, field: 'from' | 'to') => void

  onInvalid?: (value: string, field: 'from' | 'to') => void

  onKeyDown?: (
    event: KeyboardEvent<HTMLInputElement>,
    field: 'from' | 'to',
  ) => void
}

type RangeField = 'from' | 'to'

type DraftRange = Record<RangeField, string>

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function normalizeRange(
  range: DateRange | null | undefined,
): DateRange | undefined {
  if (!range) return undefined

  return {
    from: isValidDate(range.from) ? range.from : undefined,
    to: isValidDate(range.to) ? range.to : undefined,
  }
}

function formatRange(range: DateRange | undefined, format: string): DraftRange {
  return {
    from: formatDate(range?.from, format),
    to: formatDate(range?.to, format),
  }
}

function isSameRange(a: DateRange | undefined, b: DateRange | undefined) {
  return (
    a?.from?.getTime() === b?.from?.getTime() &&
    a?.to?.getTime() === b?.to?.getTime()
  )
}

function isRangeValid(
  range: DateRange,
  minDate?: Date,
  maxDate?: Date,
  isDateDisabled?: (date: Date) => boolean,
) {
  const { from, to } = range

  if (
    from &&
    (!isDateInRange(from, minDate, maxDate) || isDateDisabled?.(from))
  ) {
    return false
  }

  if (to && (!isDateInRange(to, minDate, maxDate) || isDateDisabled?.(to))) {
    return false
  }

  if (from && to && from.getTime() > to.getTime()) {
    return false
  }

  return true
}

function createCalendarRange(
  range: DateRange | undefined,
): CalendarDateRange | undefined {
  if (!range?.from) return undefined

  return {
    from: range.from,
    to: range.to,
  }
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

function DateRangePicker({
  value,
  defaultValue,
  onChange,

  dateFormat = 'dd/MM/yyyy',
  mask = true,

  minDate,
  maxDate,
  isDateDisabled,

  numberOfMonths = 2,
  defaultMonth,

  onTextChange,
  onInvalid,
  onKeyDown,

  disabled,
  readOnly,

  placeholder,
  ...props
}: DateRangePickerProps) {
  validateDateFormat(dateFormat)

  // ---------------------------------------------------------------------------
  // Controlled / uncontrolled
  // ---------------------------------------------------------------------------

  const controlled = value !== undefined

  const [internalRange, setInternalRange] = useState<DateRange | undefined>(
    () => normalizeRange(defaultValue),
  )

  const range = normalizeRange(controlled ? value : internalRange)

  const fromTimestamp = range?.from?.getTime()
  const toTimestamp = range?.to?.getTime()

  // ---------------------------------------------------------------------------
  // Draft inputs
  // ---------------------------------------------------------------------------

  const [draft, setDraft] = useState<DraftRange>(() =>
    formatRange(range, dateFormat),
  )

  // ---------------------------------------------------------------------------
  // Calendar
  // ---------------------------------------------------------------------------

  const [open, setOpen] = useState(false)

  const [month, setMonth] = useState(
    () => range?.from ?? defaultMonth ?? new Date(),
  )

  // ---------------------------------------------------------------------------
  // Refs
  // ---------------------------------------------------------------------------

  const fromRef = useRef<HTMLInputElement>(null)
  const toRef = useRef<HTMLInputElement>(null)

  const pendingCaret = useRef<{
    field: RangeField
    start: number
    end: number
  } | null>(null)

  // ---------------------------------------------------------------------------
  // Synchronization
  // ---------------------------------------------------------------------------

  useEffect(() => {
    setDraft(formatRange(range, dateFormat))

    if (range?.from) {
      setMonth(range.from)
    } else if (range?.to) {
      setMonth(range.to)
    }
  }, [fromTimestamp, toTimestamp, dateFormat])

  useLayoutEffect(() => {
    const pending = pendingCaret.current

    if (!pending) return

    const input = pending.field === 'from' ? fromRef.current : toRef.current

    input?.setSelectionRange(pending.start, pending.end)

    pendingCaret.current = null
  }, [draft])

  // ---------------------------------------------------------------------------
  // Range update
  // ---------------------------------------------------------------------------

  const commitRange = useCallback(
    (nextRange: DateRange | undefined, syncDraft = true) => {
      const normalized = normalizeRange(nextRange)

      if (
        normalized &&
        !isRangeValid(normalized, minDate, maxDate, isDateDisabled)
      ) {
        return false
      }

      if (isSameRange(range, normalized)) {
        if (syncDraft) {
          setDraft(formatRange(normalized, dateFormat))
        }

        return true
      }

      if (!controlled) {
        setInternalRange(normalized)
      }

      if (syncDraft) {
        setDraft(formatRange(normalized, dateFormat))
      }

      onChange?.(normalized)

      return true
    },
    [range, controlled, dateFormat, minDate, maxDate, isDateDisabled, onChange],
  )

  // ---------------------------------------------------------------------------
  // Input handling
  // ---------------------------------------------------------------------------

  function handleInputChange(
    field: RangeField,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const input = event.currentTarget
    const rawValue = input.value

    let nextValue = rawValue

    if (mask) {
      const start = input.selectionStart ?? rawValue.length
      const end = input.selectionEnd ?? start

      const startDigits = rawValue.slice(0, start).replace(/\D/g, '').length

      const endDigits = rawValue.slice(0, end).replace(/\D/g, '').length

      nextValue = applyDateMask(rawValue, dateFormat)

      pendingCaret.current = {
        field,
        start: getCaretPosition(nextValue, startDigits),
        end: getCaretPosition(nextValue, endDigits),
      }
    }

    const nextDraft = {
      ...draft,
      [field]: nextValue,
    }

    setDraft(nextDraft)
    onTextChange?.(nextValue, field)

    // Clearing start date also clears end date.
    if (!nextValue) {
      if (field === 'from') {
        commitRange(undefined)
        return
      }

      commitRange({
        from: range?.from,
        to: undefined,
      })

      return
    }

    const parsedDate = parseDate(nextValue, dateFormat)

    if (!parsedDate) {
      onInvalid?.(nextValue, field)
      return
    }

    const nextRange: DateRange = {
      from: field === 'from' ? parsedDate : range?.from,
      to: field === 'to' ? parsedDate : range?.to,
    }

    if (!isRangeValid(nextRange, minDate, maxDate, isDateDisabled)) {
      onInvalid?.(nextValue, field)
      return
    }

    commitRange(nextRange, false)
  }

  // ---------------------------------------------------------------------------
  // Calendar
  // ---------------------------------------------------------------------------

  const handleCalendarSelect = useCallback(
    (nextRange: CalendarDateRange | undefined) => {
      const normalized = normalizeRange(nextRange)

      if (
        normalized &&
        !isRangeValid(normalized, minDate, maxDate, isDateDisabled)
      ) {
        return
      }

      commitRange(normalized)

      // Keep the calendar open while the range is incomplete.
      if (normalized?.from && normalized?.to) {
        setOpen(false)
      }
    },
    [commitRange, minDate, maxDate, isDateDisabled],
  )

  const isDisabledDate = useCallback(
    (date: Date) => {
      return (
        !isDateInRange(date, minDate, maxDate) ||
        Boolean(isDateDisabled?.(date))
      )
    },
    [minDate, maxDate, isDateDisabled],
  )

  // ---------------------------------------------------------------------------
  // Keyboard
  // ---------------------------------------------------------------------------

  function handleFieldKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
    field: RangeField,
  ) {
    onKeyDown?.(event, field)

    if (event.defaultPrevented || disabled) return

    if (event.key === 'ArrowDown' && !event.altKey) {
      event.preventDefault()
      setOpen(true)
    }

    if (event.key === 'Escape') {
      setOpen(false)
    }

    if (event.key === 'Enter' && open) {
      event.preventDefault()
      setOpen(false)
    }
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  const calendarRange = createCalendarRange(range)

  return (
    <InputGroup>
      <InputGroup.Input
        {...props}
        aria-label="Start date"
        autoComplete="off"
        disabled={disabled}
        id={`${props.id}_start`}
        inputMode={mask ? 'numeric' : 'text'}
        onChange={(event) => {
          handleInputChange('from', event)
        }}
        onKeyDown={(event) => {
          handleFieldKeyDown(event, 'from')
        }}
        placeholder={typeof placeholder === 'string' ? placeholder : dateFormat}
        readOnly={readOnly}
        ref={fromRef}
        type="text"
        value={draft.from}
      />

      <span aria-hidden="true" className="text-xs text-muted-foreground">
        –
      </span>

      <InputGroup.Input
        aria-label="End date"
        autoComplete="off"
        disabled={disabled}
        id={`end`}
        inputMode={mask ? 'numeric' : 'text'}
        onChange={(event) => {
          handleInputChange('to', event)
        }}
        onKeyDown={(event) => {
          handleFieldKeyDown(event, 'to')
        }}
        placeholder={dateFormat}
        readOnly={readOnly}
        ref={toRef}
        type="text"
        value={draft.to}
      />

      <InputGroup.Addon align="inline-end" className="gap-0">
        <Popover onOpenChange={setOpen} open={open}>
          <Popover.Trigger
            render={
              <InputGroup.Button
                aria-label="Open date range calendar"
                disabled={disabled}
                size="icon-xs"
                type="button"
                variant="ghost"
              />
            }
          >
            <IconCalendar />
            <span className="sr-only">Open calendar</span>
          </Popover.Trigger>

          <Popover.Content
            align="end"
            aria-label="Choose date range"
            className="w-auto overflow-hidden p-0"
            role="dialog"
            sideOffset={10}
          >
            <Calendar
              captionLayout="dropdown"
              disabled={isDisabledDate}
              mode="range"
              month={month}
              numberOfMonths={numberOfMonths}
              onMonthChange={setMonth}
              onSelect={handleCalendarSelect}
              selected={calendarRange}
            />
          </Popover.Content>
        </Popover>
      </InputGroup.Addon>
    </InputGroup>
  )
}

export { DatePicker, DateRangePicker }
