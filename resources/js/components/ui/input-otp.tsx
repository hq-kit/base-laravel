'use client'

import type { ComponentProps, CSSProperties, ReactElement } from 'react'

import { OTPField as OTPFieldPrimitive } from '@base-ui/react/otp-field'
import { cn } from 'cn'

import { Separator } from '@/components/ui/separator'

function OTPField({
  className,
  size = 'default',
  spacing = 0,
  ...props
}: ComponentProps<typeof OTPFieldPrimitive.Root> & {
  size?: 'default' | 'lg'
  spacing?: number
}): ReactElement {
  return (
    <OTPFieldPrimitive.Root
      className={cn(
        'group/otp-field flex items-center gap-[--spacing(var(--gap))] has-disabled:opacity-50',
        '[&>input]:rounded-lg [&>input]:border-x',
        'data-[spacing=0]:[&>input]:rounded-none',
        'data-[spacing=0]:[&>input:first-child]:rounded-l-lg data-[spacing=0]:[&>input:first-child]:border-l',
        'data-[spacing=0]:[&>div+input]:rounded-l-lg data-[spacing=0]:[&>div+input]:border-l',
        'data-[spacing=0]:divide-x data-[spacing=0]:[&>input:has(+div)]:rounded-r-lg',
        'data-[spacing=0]:[&>input:last-child]:rounded-r-lg data-[spacing=0]:[&>input:last-child]:border-r',
        className,
      )}
      data-size={size}
      data-slot="otp-field"
      data-spacing={spacing}
      style={{ '--gap': spacing } as CSSProperties}
      {...props}
    />
  )
}

function OTPFieldInput({
  className,
  ...props
}: ComponentProps<typeof OTPFieldPrimitive.Input>): ReactElement {
  return (
    <OTPFieldPrimitive.Input
      className={cn(
        'relative size-8 border-y border-input text-center text-sm transition-all outline-none focus:z-10 focus:border-ring focus:ring-3 focus:ring-ring/50 aria-invalid:border-destructive focus:aria-invalid:border-destructive focus:aria-invalid:ring-destructive/20 dark:bg-input/30 dark:focus:aria-invalid:ring-destructive/40',
        className,
      )}
      data-slot="otp-field-input"
      slot="control"
      spellCheck={false}
      {...props}
    />
  )
}

function OTPFieldSeparator({
  className,
  ...props
}: ComponentProps<typeof Separator>): ReactElement {
  return (
    <OTPFieldPrimitive.Separator
      render={
        <Separator
          className={cn(
            'rounded-full bg-input data-[orientation=horizontal]:h-0.5 data-[orientation=horizontal]:w-3',
            className,
          )}
          orientation="horizontal"
          {...props}
        />
      }
    />
  )
}

OTPField.Input = OTPFieldInput
OTPField.Separator = OTPFieldSeparator

export { OTPField, OTPFieldInput, OTPFieldSeparator }
