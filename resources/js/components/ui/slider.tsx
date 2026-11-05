import type { ComponentProps } from 'react'

import { Slider as SliderPrimitive } from '@base-ui/react/slider'
import { cn } from 'cn'

function Slider({
  className,
  children,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderPrimitive.Root.Props) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max]

  return (
    <SliderPrimitive.Root
      className={cn(
        'group/slider relative flex touch-none flex-wrap gap-3 select-none data-[orientation=vertical]:min-h-40 data-disabled:opacity-50',
        'data-[orientation=horizontal]:w-full',
        'data-[orientation=vertical]:h-full data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-center',
        className,
      )}
      data-slot="slider"
      defaultValue={defaultValue}
      max={max}
      min={min}
      thumbAlignment="edge"
      value={value}
      {...props}
    >
      {children}
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-40 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-disabled:opacity-50">
        <SliderPrimitive.Track
          className="relative block grow rounded-full bg-muted select-none data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1"
          data-slot="slider-track"
          slot="control"
        >
          <SliderPrimitive.Indicator
            className="bg-primary select-none data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
            data-slot="slider-range"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            className="relative size-3 rounded-full border border-ring bg-white ring-ring/50 transition-[color,box-shadow] select-none group-data-[orientation=horizontal]/slider:top-1/2 group-data-[orientation=vertical]/slider:left-1/2 after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 disabled:pointer-events-none disabled:opacity-50"
            data-slot="slider-thumb"
            key={index}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

const SliderLabel = (props: ComponentProps<typeof SliderPrimitive.Label>) => (
  <SliderPrimitive.Label
    className={cn(
      'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      props.className,
    )}
    {...props}
  />
)
const SliderValue = (props: ComponentProps<typeof SliderPrimitive.Value>) => (
  <SliderPrimitive.Value
    className={cn(
      'ml-auto text-sm text-muted-foreground tabular-nums group-data-[orientation=vertical]/slider:mx-auto',
      props.className,
    )}
    {...props}
  />
)

Slider.Label = SliderLabel
Slider.Value = SliderValue

export { Slider, SliderLabel, SliderValue }
