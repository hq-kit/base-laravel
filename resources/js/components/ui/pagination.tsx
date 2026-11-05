import type { ComponentProps, CSSProperties, ReactNode } from 'react'

import { Button } from '@base-ui/react'
import {
  IconChevronLeft,
  IconChevronLeftPipe,
  IconChevronRight,
  IconChevronRightPipe,
  IconDots,
} from '@tabler/icons-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'

const paginationVariants = cva(
  'group/pagination mx-auto flex inline-flex w-full items-center justify-center gap-[--spacing(var(--gap))] **:whitespace-nowrap [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:self-center **:[[slot=link]]:inline-flex **:[[slot=link]]:items-center **:[[slot=link]]:justify-center **:[[slot=link]]:border **:[[slot=link]]:bg-transparent **:[[slot=link]]:hover:bg-muted **:[[slot=link]]:active:translate-y-px **:[[slot=link]]:data-active:border-ring **:[[slot=link]]:data-active:bg-accent **:[[slot=link]]:data-active:text-accent-foreground',
  {
    variants: {
      variant: {
        outline: '**:[[slot=link]]:border-input',
        ghost: '**:[[slot=link]]:border-transparent',
      },
      size: {
        md: "[&_svg:not([class*='size-'])]:size-4 **:[[slot=link]]:h-8 **:[[slot=link]]:min-w-8 **:[[slot=link]]:gap-1.5",
        xs: "**:text-xs [&_svg:not([class*='size-'])]:size-3 **:[[slot=link]]:h-6 **:[[slot=link]]:min-w-6 **:[[slot=link]]:gap-1",
        sm: "**:text-[0.8rem] [&_svg:not([class*='size-'])]:size-3.5 **:[[slot=link]]:h-7 **:[[slot=link]]:min-w-7 **:[[slot=link]]:gap-1",
        lg: "[&_svg:not([class*='size-'])]:size-4.5 **:[[slot=link]]:h-9 **:[[slot=link]]:min-w-9 **:[[slot=link]]:gap-1.5",
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'md',
    },
  },
)

const Pagination = ({
  className,
  spacing = 0,
  variant = 'outline',
  size = 'md',
  ...props
}: ComponentProps<'ul'> &
  VariantProps<typeof paginationVariants> & { spacing?: number }) => (
  <nav aria-label="pagination" data-slot="pagination">
    <ul
      className={cn(paginationVariants({ variant, size }), className)}
      data-size={size}
      data-slot="pagination-content"
      data-spacing={spacing}
      data-variant={variant}
      style={{ '--gap': spacing } as CSSProperties}
      {...props}
    />
  </nav>
)

const PaginationItem = ({
  isActive,
  ...props
}: Omit<ComponentProps<typeof Button>, 'variant' | 'size'> & {
  isActive?: boolean
} & Omit<ComponentProps<'a'>, 'variant' | 'size'>) => {
  return (
    <li
      className="group/pagination-item *:rounded-lg *:px-2 group-data-[spacing=0]/pagination:*:rounded-none group-data-[spacing=0]/pagination:first:*:rounded-s-lg group-data-[spacing=0]/pagination:last:*:rounded-e-lg"
      data-slot="pagination-item"
    >
      {'href' in props ? (
        <a
          aria-current={isActive ? 'page' : undefined}
          className={cn(props.disabled ? 'disabled' : '', props.className)}
          data-active={isActive}
          slot="link"
          {...props}
        />
      ) : (
        <Button
          aria-current={isActive ? 'page' : undefined}
          className={cn(props.className)}
          data-active={isActive}
          disabled={props.disabled}
          slot="link"
          {...props}
        />
      )}
    </li>
  )
}

const PaginationFirst = ({
  children,
  ...props
}: ComponentProps<typeof PaginationItem>) => {
  return (
    <PaginationItem aria-label="Go to previous page" {...props}>
      <IconChevronLeftPipe />
      {children as ReactNode}
    </PaginationItem>
  )
}
const PaginationPrevious = ({
  children,
  ...props
}: ComponentProps<typeof PaginationItem>) => {
  return (
    <PaginationItem aria-label="Go to previous page" {...props}>
      <IconChevronLeft />
      {children as ReactNode}
    </PaginationItem>
  )
}

const PaginationNext = ({
  children,
  ...props
}: ComponentProps<typeof PaginationItem>) => (
  <PaginationItem aria-label="Go to next page" {...props}>
    {children as ReactNode}
    <IconChevronRight />
  </PaginationItem>
)

const PaginationLast = ({
  children,
  ...props
}: ComponentProps<typeof PaginationItem>) => (
  <PaginationItem aria-label="Go to last page" {...props}>
    {children as ReactNode}
    <IconChevronRightPipe />
  </PaginationItem>
)

const PaginationEllipsis = (
  props: Omit<ComponentProps<typeof Button>, 'children'>,
) => (
  <Button
    className="flex items-center justify-center rounded-lg group-data-[spacing=0]/pagination:rounded-none"
    data-slot="link"
    slot="link"
    {...props}
  >
    <IconDots />
    <span className="sr-only">More pages</span>
  </Button>
)

Pagination.Item = PaginationItem
Pagination.First = PaginationFirst
Pagination.Previous = PaginationPrevious
Pagination.Next = PaginationNext
Pagination.Last = PaginationLast
Pagination.Ellipsis = PaginationEllipsis

export {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
}
