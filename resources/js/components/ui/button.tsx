import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { IconLoader2 } from '@tabler/icons-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          'border-primary bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-secondary bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]',
        destructive:
          'border-destructive/10 bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:border-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        success:
          'border-[oklch(from_var(--primary)_l_0.5_145)] bg-[oklch(from_var(--primary)_l_0.5_145)] text-primary-foreground hover:bg-[oklch(from_var(--primary)_l_0.5_145)]/80',
        warning:
          'border-[oklch(from_var(--primary)_l_1_100)]/80 bg-[oklch(from_var(--primary)_l_1_100)] text-primary-foreground hover:bg-[oklch(from_var(--primary)_l_1_100)]/80 dark:border-[oklch(from_var(--primary)_l_1_100)]/70 dark:bg-[oklch(from_var(--primary)_l_1_100)]/70 dark:hover:bg-[oklch(from_var(--primary)_l_1_100)]/80',
        info: 'border-[oklch(from_var(--primary)_l_0.4_304)] bg-[oklch(from_var(--primary)_l_0.4_304)] text-primary-foreground hover:bg-[oklch(from_var(--primary)_l_0.4_304)]/80',
        outline:
          'border-border bg-background hover:bg-muted hover:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        ghost:
          'border-transparent hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        link: 'border-transparent text-primary underline-offset-4 hover:underline',
      },
      size: {
        md: 'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        icon: 'size-8',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'size-9',
      },
      loading: {
        true: "pointer-events-none opacity-50 [&_svg:not([data-slot='loader'])]:hidden",
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

function Button({
  className,
  variant = 'primary',
  size = 'md',
  loading,
  children,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      className={cn(buttonVariants({ variant, size, loading }), className)}
      data-slot="button"
      {...props}
    >
      {loading && <IconLoader2 className="animate-spin" data-slot="loader" />}
      {children}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
