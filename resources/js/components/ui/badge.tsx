import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'

const badgeVariants = cva(
  'group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!',
  {
    variants: {
      variant: {
        primary:
          'border-primary bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-destructive/10 bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:border-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40',
        success:
          'border-[oklch(from_var(--primary)_l_0.5_145)] bg-[oklch(from_var(--primary)_l_0.5_145)] text-primary-foreground hover:bg-[oklch(from_var(--primary)_l_0.5_145)]/80',
        warning:
          'border-[oklch(from_var(--primary)_l_1_100)] bg-[oklch(from_var(--primary)_l_1_100)] text-primary-foreground hover:bg-[oklch(from_var(--primary)_l_1_100)]/80 dark:border-[oklch(from_var(--primary)_l_1_100)]/70 dark:bg-[oklch(from_var(--primary)_l_1_100)]/70 dark:hover:bg-[oklch(from_var(--primary)_l_1_100)]/80',
        info: 'border-[oklch(from_var(--primary)_l_0.4_304)] bg-[oklch(from_var(--primary)_l_0.4_304)] text-primary-foreground hover:bg-[oklch(from_var(--primary)_l_0.4_304)]/80',
        outline:
          'border-border text-foreground hover:bg-muted hover:text-muted-foreground',
        ghost:
          'border-transparent hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50',
        link: 'border-transparent text-primary underline-offset-4 hover:underline',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

function Badge({
  className,
  variant = 'primary',
  render,
  ...props
}: useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props,
    ),
    render,
    state: {
      slot: 'badge',
      variant,
    },
  })
}

export { Badge, badgeVariants }
