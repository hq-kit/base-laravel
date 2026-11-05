import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area'
import { cn } from 'cn'

function ScrollArea({
  className,
  children,
  ...props
}: ScrollAreaPrimitive.Root.Props) {
  return (
    <ScrollAreaPrimitive.Root
      className={cn('group/scroll-area relative', className)}
      data-slot="scroll-area"
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        className="size-full scroll-fade rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1"
        data-slot="scroll-area-viewport"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = 'vertical',
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      className={cn(
        'hidden touch-none p-px transition-colors select-none group-hover/scroll-area:flex data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-t-transparent data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:border-l data-[orientation=vertical]:border-l-transparent',
        className,
      )}
      data-orientation={orientation}
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        className="relative flex-1 rounded-full bg-border"
        data-slot="scroll-area-thumb"
      />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

ScrollArea.ScrollBar = ScrollBar

export { ScrollArea, ScrollBar }
