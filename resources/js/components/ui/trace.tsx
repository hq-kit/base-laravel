import type { ComponentProps } from 'react'

import { IconChevronRight } from '@tabler/icons-react'
import { cn } from 'cn'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './collapsible'

function Trace({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex w-full min-w-0 flex-col gap-2 *:has-[>[data-slot=trace-line]]:flex *:has-[>[data-slot=trace-line]]:w-fit *:has-[>[data-slot=trace-line]]:max-w-full *:has-[>[data-slot=trace-line]]:min-w-0 *:has-[>[data-slot=trace-line]]:rounded-md *:has-[>[data-slot=trace-line]]:text-left *:has-[>[data-slot=trace-line]]:outline-none *:has-[>[data-slot=trace-line]]:focus-visible:ring-3 *:has-[>[data-slot=trace-line]]:focus-visible:ring-ring/50',
        className,
      )}
      data-slot="trace"
      {...props}
    />
  )
}

function TraceLine({
  className,
  status,
  ...props
}: ComponentProps<'span'> & {
  status?: 'running' | 'error' | 'pending'
}) {
  return (
    <span
      className={cn(
        'flex w-fit max-w-full min-w-0 items-center gap-2 text-sm text-muted-foreground transition-colors in-[a,button]:cursor-pointer in-[a:hover,button:hover]:text-foreground data-[status=error]:text-destructive data-[status=error]:in-[a:hover,button:hover]:text-destructive data-[status=pending]:opacity-60 data-[status=running]:*:data-[slot=trace-title]:shimmer',
        className,
      )}
      data-slot="trace-line"
      data-status={status}
      {...props}
    />
  )
}

function TraceIcon({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-4 shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [[data-slot=trace-title]~&]:-ml-1",
        className,
      )}
      data-slot="trace-icon"
      {...props}
    />
  )
}

function TraceTitle({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={cn('min-w-0 truncate motion-reduce:shimmer-none', className)}
      data-slot="trace-title"
      {...props}
    />
  )
}

function TraceDescription({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'shrink-0 text-muted-foreground/70 tabular-nums',
        className,
      )}
      data-slot="trace-description"
      {...props}
    />
  )
}

function TraceCollapsible({
  className,
  ...props
}: Omit<ComponentProps<typeof Collapsible>, 'open'> &
  (
    | { open?: undefined }
    | {
        open: boolean
        onOpenChange: NonNullable<
          ComponentProps<typeof Collapsible>['onOpenChange']
        >
      }
  )) {
  return (
    <Collapsible
      className={cn('flex w-full min-w-0 flex-col', className)}
      data-slot="trace-collapsible"
      {...props}
    />
  )
}

function TraceCollapsibleTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof CollapsibleTrigger>) {
  return (
    <CollapsibleTrigger
      className={cn(
        'group/trace-collapsible-trigger flex w-fit max-w-full min-w-0 cursor-pointer items-center gap-1 rounded-md text-left text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 has-data-[status=error]:text-destructive',
        className,
      )}
      data-slot="trace-collapsible-trigger"
      {...props}
    >
      {children}
      <TraceIcon className="transition-transform group-aria-expanded/trace-collapsible-trigger:rotate-90">
        <IconChevronRight />
      </TraceIcon>
    </CollapsibleTrigger>
  )
}

function TraceCollapsibleContent({
  className,
  children,
  ...props
}: ComponentProps<typeof CollapsibleContent>) {
  return (
    <CollapsibleContent
      className="h-(--collapsible-panel-height) min-w-0 overflow-hidden transition-[height] duration-200 data-ending-style:h-0 data-starting-style:h-0"
      data-slot="trace-collapsible-content"
      {...props}
    >
      <div
        className={cn(
          'mt-2 mb-1 ml-[calc(--spacing(2)-1px)] min-w-0 border-l pr-1 pl-4 leading-relaxed wrap-break-word text-muted-foreground',
          className,
        )}
        data-slot="trace-collapsible-content-inner"
      >
        {children}
      </div>
    </CollapsibleContent>
  )
}

Trace.Collapsible = TraceCollapsible
Trace.CollapsibleContent = TraceCollapsibleContent
Trace.CollapsibleTrigger = TraceCollapsibleTrigger
Trace.Description = TraceDescription
Trace.Icon = TraceIcon
Trace.Line = TraceLine
Trace.Title = TraceTitle

export {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
}
