import { Progress as ProgressPrimitive } from '@base-ui/react/progress'
import { cn } from 'cn'

function Progress({
  className,
  children,
  value,
  ...props
}: ProgressPrimitive.Root.Props) {
  return (
    <ProgressPrimitive.Root
      className={cn('group/progress flex flex-wrap gap-3', className)}
      data-slot="progress"
      value={value}
      {...props}
    >
      {children}
      <Progress.Track>
        <Progress.Indicator />
      </Progress.Track>
    </ProgressPrimitive.Root>
  )
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  return (
    <ProgressPrimitive.Track
      className={cn(
        'block h-2 w-full overflow-hidden rounded-full bg-input',
        className,
      )}
      data-slot="progress-track"
      {...props}
    />
  )
}

function ProgressIndicator({
  className,
  ...props
}: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      className={cn('h-full bg-primary transition-[width]', className)}
      data-slot="progress-indicator"
      {...props}
    />
  )
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      className={cn('text-sm font-medium', className)}
      data-slot="progress-label"
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      className={cn('ml-auto text-sm tabular-nums', className)}
      data-slot="progress-value"
      {...props}
    />
  )
}

Progress.Indicator = ProgressIndicator
Progress.Label = ProgressLabel
Progress.Track = ProgressTrack
Progress.Value = ProgressValue

export {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
}
