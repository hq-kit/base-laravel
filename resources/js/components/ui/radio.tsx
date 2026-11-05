import { Radio as RadioPrimitive } from '@base-ui/react/radio'
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group'
import { cn } from 'cn'

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      className={cn(
        'grid w-full gap-2 in-data-[slot=field-set]:-mt-3',
        className,
      )}
      data-slot="radio-group"
      {...props}
    />
  )
}

function Radio({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      className={cn(
        'group/radio peer relative flex aspect-square size-4 shrink-0 items-center justify-center rounded-[calc(var(--radius)*999)] border border-input transition outline-none group-has-focus-visible/field-label:ring-0 group-has-focus-visible/field-label:not-data-checked:border-input hover:border-ring focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-invalid:border-destructive data-invalid:ring-3 data-invalid:ring-destructive/20 data-invalid:aria-checked:border-primary dark:bg-input/30 dark:data-invalid:border-destructive/50 dark:data-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground group-has-focus-visible/field-label:data-checked:border-primary data-invalid:data-checked:border-destructive data-invalid:data-checked:bg-destructive dark:data-checked:bg-primary dark:data-invalid:data-checked:bg-destructive',
        className,
      )}
      data-slot="radio"
      slot="control"
      {...props}
    >
      <RadioPrimitive.Indicator
        className="size-2 rounded-[calc(var(--radius)*999)] bg-primary-foreground transition"
        data-slot="radio-group-indicator"
      />
    </RadioPrimitive.Root>
  )
}

Radio.Group = RadioGroup
RadioGroup.Item = Radio

export { Radio, Radio as RadioGroupItem, RadioGroup }
