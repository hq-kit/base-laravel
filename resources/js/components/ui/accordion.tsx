import type { ReactElement } from 'react'

import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'
import { IconChevronDown } from '@tabler/icons-react'
import { cn } from 'cn'

function Accordion(props: AccordionPrimitive.Root.Props): ReactElement {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: AccordionPrimitive.Item.Props): ReactElement {
  return (
    <AccordionPrimitive.Item
      className={cn('border-b last:border-b-0', className)}
      data-slot="accordion-item"
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props): ReactElement {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          'flex flex-1 cursor-pointer items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-64 data-panel-open:*:data-[slot=accordion-indicator]:rotate-180',
          className,
        )}
        data-slot="accordion-trigger"
        {...props}
      >
        {children}
        <IconChevronDown
          className="pointer-events-none size-4 shrink-0 translate-y-0.5 opacity-80 transition-transform duration-200 ease-in-out"
          data-slot="accordion-indicator"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props): ReactElement {
  return (
    <AccordionPrimitive.Panel
      className="h-(--accordion-panel-height) overflow-hidden text-sm text-muted-foreground transition-[height] duration-200 ease-in-out data-ending-style:h-0 data-starting-style:h-0"
      data-slot="accordion-panel"
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </AccordionPrimitive.Panel>
  )
}

Accordion.Item = AccordionItem
Accordion.Trigger = AccordionTrigger
Accordion.Content = AccordionContent

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
