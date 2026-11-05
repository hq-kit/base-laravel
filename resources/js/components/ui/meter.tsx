import { Meter as MeterPrimitive } from '@base-ui/react/meter'
import { cn } from 'cn'

const Meter = ({
  className,
  children,
  value,
  ...props
}: MeterPrimitive.Root.Props) => {
  const percentage = Math.min(
    100,
    Math.max(
      0,
      ((value - Number(props.min ?? 0)) /
        (Number(props.max ?? 100) - Number(props.min ?? 0))) *
        100,
    ),
  )

  const level = percentage > 80 ? 'high' : percentage > 50 ? 'medium' : 'low'

  return (
    <MeterPrimitive.Root
      className={cn('group/meter flex flex-wrap gap-3', className)}
      data-level={level}
      data-slot="meter"
      value={value}
      {...props}
    >
      {children}
      <Meter.Track>
        <Meter.Indicator />
      </Meter.Track>
    </MeterPrimitive.Root>
  )
}
function MeterLabel({
  className,
  ...props
}: MeterPrimitive.Label.Props): React.ReactElement {
  return (
    <MeterPrimitive.Label
      className={cn('text-sm font-medium', className)}
      data-slot="meter-label"
      {...props}
    />
  )
}
function MeterTrack({
  className,
  ...props
}: MeterPrimitive.Track.Props): React.ReactElement {
  return (
    <MeterPrimitive.Track
      className={cn(
        'block h-2 w-full overflow-hidden rounded-full bg-input',
        className,
      )}
      data-slot="meter-track"
      {...props}
    />
  )
}

function MeterIndicator({
  className,
  ...props
}: MeterPrimitive.Indicator.Props) {
  return (
    <MeterPrimitive.Indicator
      {...props}
      className={cn(
        'bg-[oklch(from_var(--primary)_l_0.5_145)]',
        'group-data-[level=medium]/meter:bg-[oklch(from_var(--primary)_l_1_100)] dark:group-data-[level=medium]/meter:bg-[oklch(from_var(--primary)_l_1_100)]/70',
        'group-data-[level=high]/meter:bg-destructive',
        'transition-[width,color]',
        className,
      )}
      data-slot="meter-indicator"
    />
  )
}

function MeterValue({
  className,
  ...props
}: MeterPrimitive.Value.Props): React.ReactElement {
  return (
    <MeterPrimitive.Value
      className={cn('ml-auto text-sm tabular-nums', className)}
      data-slot="meter-value"
      {...props}
    />
  )
}

Meter.Track = MeterTrack
Meter.Value = MeterValue
Meter.Label = MeterLabel
Meter.Indicator = MeterIndicator

export { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue }
