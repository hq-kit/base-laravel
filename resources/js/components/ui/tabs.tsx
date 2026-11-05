import type { ComponentProps } from 'react'

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'

function Tabs({
  className,
  orientation = 'horizontal',
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      className={cn(
        'group/tabs flex gap-2 data-[orientation=horizontal]:flex-col',
        className,
      )}
      data-orientation={orientation}
      data-slot="tabs"
      {...props}
    />
  )
}

const tabsListVariants = cva(
  'group/tabs-list relative inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-8 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col group-data-[variant=line]:rounded-none',
  {
    variants: {
      variant: {
        fill: 'bg-muted',
        line: 'gap-1 bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'fill',
    },
  },
)

function TabsList({
  className,
  variant = 'fill',
  children,
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      className={cn(tabsListVariants({ variant }), className)}
      data-slot="tabs-list"
      data-variant={variant}
      {...props}
    >
      {children}
      <TabsPrimitive.Indicator
        className={cn(
          'absolute left-0 h-[calc(100%-6px)] w-(--active-tab-width) translate-x-(--active-tab-left) rounded-[inherit] border data-entering:opacity-100 data-exiting:opacity-0 motion-safe:transition-[translate,width,color,height,opacity]',
          'bg-background dark:border-input dark:bg-input/30',
          'group-data-[variant=line]/tabs-list:border-transparent group-data-[variant=line]/tabs-list:bg-transparent dark:group-data-[variant=line]/tabs-list:border-transparent dark:group-data-[variant=line]/tabs-list:bg-transparent',
          'group-data-[variant=fill]/tabs-list:shadow-sm group-data-[variant=line]/tabs-list:shadow-none',
          'after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:-bottom-1.25 group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:after:opacity-100',
        )}
      />
    </TabsPrimitive.List>
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      className={cn(
        "group/tab relative isolate z-1 inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 outline-hidden transition-[colors] group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground disabled:pointer-events-none disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        'group-data-[variant=line]/tabs-list:bg-transparent data-active:text-foreground dark:data-active:text-foreground',
        'focus-visible:ring-2',
        className,
      )}
      data-slot="tabs-trigger"
      {...props}
    />
  )
}

function TabsContents({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'relative grid size-full grid-cols-1 overflow-hidden',
        className,
      )}
      data-slot="tabs-contents"
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      className={cn(
        'col-span-full col-start-1 row-start-1 flex w-full flex-1 text-sm outline-none',
        'in-data-[slot=tabs-contents]:transition-all data-ending-style:opacity-0 data-starting-style:opacity-0',
        'motion-safe:data-starting-style:data-[activation-direction=left]:translate-x-[-50%]',
        'motion-safe:data-starting-style:data-[activation-direction=right]:translate-x-[50%]',
        'motion-safe:data-ending-style:data-[activation-direction=left]:translate-x-[50%]',
        'motion-safe:data-ending-style:data-[activation-direction=right]:translate-x-[-50%]',
        className,
      )}
      data-slot="tabs-content"
      {...props}
    />
  )
}

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent
Tabs.Contents = TabsContents

export {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
  tabsListVariants,
}
