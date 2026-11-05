import type { ComponentProps, ReactElement } from 'react'

import { NumberField as NumberFieldPrimitive } from '@base-ui/react/number-field'
import {
  IconCaretLeftRight,
  IconCaretUpDown,
  IconChevronDown,
  IconChevronUp,
} from '@tabler/icons-react'
import { cn } from 'cn'

import { Field, Label } from './field'
import { InputGroup, InputGroupInput } from './input-group'

function NumberField({
  className,
  direction = 'vertical',
  ...props
}: NumberFieldPrimitive.Root.Props & {
  direction?: 'horizontal' | 'vertical'
}): ReactElement {
  return (
    <NumberFieldPrimitive.Root
      allowWheelScrub
      data-control="number-field"
      data-direction={direction}
      {...props}
      render={<Field />}
    />
  )
}

function NumberFieldInput({
  className,
  ...props
}: NumberFieldPrimitive.Input.Props): ReactElement {
  return (
    <NumberFieldPrimitive.Group
      className={cn(
        'group/input-group relative flex h-8 w-full min-w-0 items-center overflow-hidden rounded-lg border border-input transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit has-disabled:bg-input/50 has-disabled:opacity-50 has-[[slot=control]:focus-visible]:border-ring has-[[slot=control]:focus-visible]:ring-3 has-[[slot=control]:focus-visible]:ring-ring/50 has-[[slot=control][aria-invalid=true]]:border-destructive has-[[slot=control][aria-invalid=true]]:ring-3 has-[[slot=control][aria-invalid=true]]:ring-destructive/20 dark:bg-input/30 dark:has-disabled:bg-input/80 dark:has-[[slot=control][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5',
        className,
      )}
      slot="control"
    >
      <NumberFieldPrimitive.Input
        {...props}
        render={<InputGroupInput />}
        slot="control"
      />
      <InputGroup.Addon
        align="inline-end"
        className="flex flex-col gap-0 border-l p-0"
      >
        <NumberFieldPrimitive.Increment
          render={
            <InputGroup.Button
              className="flex-1 rounded-none border-x-0 border-t-0 border-b-0 pr-2.5"
              variant="outline"
            >
              <IconChevronUp />
              <span className="sr-only">Increment</span>
            </InputGroup.Button>
          }
        />
        <NumberFieldPrimitive.Decrement
          render={
            <InputGroup.Button
              className="flex-1 rounded-none border-x-0 border-b-0 pr-2.5"
              variant="outline"
            >
              <IconChevronDown />
              <span className="sr-only">Decrement</span>
            </InputGroup.Button>
          }
        />
      </InputGroup.Addon>
    </NumberFieldPrimitive.Group>
  )
}

function NumberFieldLabel({
  direction = 'horizontal',
  ...props
}: ComponentProps<typeof Label> & { direction?: 'horizontal' | 'vertical' }) {
  return (
    <NumberFieldPrimitive.ScrubArea
      className="cursor-ew-resize"
      direction={direction}
      style={{
        cursor: direction === 'horizontal' ? 'ew-resize' : 'ns-resize',
      }}
    >
      <Label
        style={{
          cursor: direction === 'horizontal' ? 'ew-resize' : 'ns-resize',
        }}
        {...props}
      />
      <NumberFieldPrimitive.ScrubAreaCursor className="text-muted-foreground *:[svg]:size-5">
        {direction === 'horizontal' ? (
          <IconCaretLeftRight />
        ) : (
          <IconCaretUpDown />
        )}
      </NumberFieldPrimitive.ScrubAreaCursor>
    </NumberFieldPrimitive.ScrubArea>
  )
}
NumberField.Input = NumberFieldInput
NumberField.Label = NumberFieldLabel

export { NumberField, NumberFieldInput, NumberFieldLabel }
