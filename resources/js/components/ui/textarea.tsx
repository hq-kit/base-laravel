import type {
  ComponentProps,
  ComponentPropsWithoutRef,
  ReactElement,
  RefAttributes,
} from 'react'

import { Field as FieldPrimitive } from '@base-ui/react/field'
import { mergeProps } from '@base-ui/react/merge-props'
import { cn } from 'cn'

function Textarea({
  className,
  ref,
  ...props
}: ComponentPropsWithoutRef<'textarea'> &
  RefAttributes<HTMLTextAreaElement>): ReactElement {
  return (
    <span
      className={
        cn(
          'flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent text-base transition-all outline-none placeholder:text-muted-foreground hover:border-ring disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 has-focus-visible:border-ring has-focus-visible:ring-3 has-focus-visible:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40',
          className,
        ) || undefined
      }
      data-slot="textarea-control"
      slot="control"
    >
      <FieldPrimitive.Control
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        ref={ref}
        render={(defaultProps: ComponentProps<'textarea'>) => (
          <textarea
            className={cn(
              'field-sizing-content w-full rounded-[inherit] px-2.5 py-2 text-foreground outline-hidden placeholder:text-muted-foreground',
            )}
            data-slot="textarea"
            {...mergeProps(defaultProps, props)}
          />
        )}
        value={props.value}
      />
    </span>
  )
}

export { Textarea }
