'use client'

import type React from 'react'

import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible'
import { cn } from 'cn'

function Collapsible({
  ...props
}: CollapsiblePrimitive.Root.Props): React.ReactElement {
  return (
    <CollapsiblePrimitive.Root
      className={cn('group/collapsible', props.className)}
      data-slot="collapsible"
      {...props}
    />
  )
}

function CollapsibleTrigger({
  className,
  ...props
}: CollapsiblePrimitive.Trigger.Props): React.ReactElement {
  return (
    <CollapsiblePrimitive.Trigger
      className={className}
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

function CollapsibleContent({
  className,
  ...props
}: CollapsiblePrimitive.Panel.Props): React.ReactElement {
  return (
    <CollapsiblePrimitive.Panel
      className={cn(
        'h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 data-ending-style:h-0 data-starting-style:h-0',
        className,
      )}
      data-slot="collapsible-panel"
      {...props}
    />
  )
}

Collapsible.Trigger = CollapsibleTrigger
Collapsible.Content = CollapsibleContent

export { Collapsible, CollapsibleContent, CollapsibleTrigger }
