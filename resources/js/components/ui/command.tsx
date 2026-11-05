import type { ComponentProps, ReactElement } from 'react'

import { Autocomplete } from '@base-ui/react/autocomplete'
import { IconSearch } from '@tabler/icons-react'
import { cn } from 'cn'

import { Dialog } from './dialog'

const CommandDialog = ({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  className,
  dialogProps,
  open,
  onOpenChange,
  handle,
  ...props
}: ComponentProps<typeof Command> & {
  title?: string
  description?: string
  className?: string
  handle?: ComponentProps<typeof Dialog>['handle']
} & { dialogProps?: Partial<ComponentProps<typeof Dialog>> }) => (
  <Dialog
    {...dialogProps}
    handle={handle}
    onOpenChange={onOpenChange}
    open={open}
  >
    <Dialog.Content
      className={cn(
        'top-1/6 translate-y-0 overflow-hidden rounded-xl! p-0!',
        className,
      )}
      showCloseButton={false}
    >
      <Command {...props} />
    </Dialog.Content>
  </Dialog>
)

function Command({
  autoHighlight = 'always',
  keepHighlight = true,
  className,
  ...props
}: ComponentProps<typeof Autocomplete.Root> & {
  className?: string
}): ReactElement {
  return (
    <div
      className={cn(
        'flex size-full flex-col overflow-hidden rounded-xl! bg-popover text-popover-foreground',
        className,
      )}
    >
      <Autocomplete.Root
        autoHighlight={autoHighlight}
        data-slot="command"
        inline
        keepHighlight={keepHighlight}
        open
        {...props}
      />
    </div>
  )
}

function CommandInput({
  className,
  ...props
}: ComponentProps<typeof Autocomplete.Input>): ReactElement {
  return (
    <Autocomplete.InputGroup
      className="mx-2 mt-2 flex items-center gap-1.5 rounded-lg! border-input/30 bg-input/30 px-2.5 py-1 shadow-none!"
      data-slot="command-input-wrapper"
    >
      <IconSearch className="size-4 shrink-0 text-muted-foreground" />

      <Autocomplete.Input
        autoFocus
        className={cn(
          'text-sm outline-hidden placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed',
          className,
        )}
        data-slot="autocomplete-input"
        {...props}
      />
    </Autocomplete.InputGroup>
  )
}

function CommandList({
  className,
  ...props
}: ComponentProps<typeof Autocomplete.List>): ReactElement {
  return (
    <Autocomplete.List
      className={cn(
        'no-scrollbar max-h-72 flex-1 scroll-fade-y scroll-py-1 overflow-x-hidden overflow-y-auto p-2 outline-none has-data-[slot=command-group]:p-1',
        className,
      )}
      data-slot="command-list"
      {...props}
    />
  )
}

function CommandEmpty({
  className,
  ...props
}: ComponentProps<typeof Autocomplete.Empty>): ReactElement {
  return (
    <Autocomplete.Empty
      className={cn('mx-auto not-empty:py-6', className)}
      data-slot="command-empty"
      {...props}
    />
  )
}

function CommandGroup({
  className,
  title,
  ...props
}: Omit<Autocomplete.Group.Props, 'title' | 'children'> & {
  children: Autocomplete.Collection.Props['children']
  title: Autocomplete.GroupLabel.Props['children']
}): ReactElement {
  return (
    <Autocomplete.Group
      className={cn(
        'overflow-hidden p-1 text-foreground **:data-[slot=group-label]:px-2 **:data-[slot=group-label]:py-1.5 **:data-[slot=group-label]:text-xs **:data-[slot=group-label]:font-medium **:data-[slot=group-label]:text-muted-foreground',
        className,
      )}
      data-slot="command-group"
      {...props}
    >
      {title && (
        <Autocomplete.GroupLabel
          className="pointer-events-none"
          data-slot="group-label"
        >
          {title ?? ''}
        </Autocomplete.GroupLabel>
      )}
      <Autocomplete.Collection>{props.children}</Autocomplete.Collection>
    </Autocomplete.Group>
  )
}

function CommandItem({ className, ...props }: Autocomplete.Item.Props) {
  return (
    <Autocomplete.Item
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md px-2 py-1.5 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      data-slot="command-item"
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: ComponentProps<typeof Autocomplete.Separator>): ReactElement {
  return (
    <Autocomplete.Separator
      className={cn('-mx-1 h-px bg-border', className)}
      data-slot="command-separator"
      {...props}
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: ComponentProps<'kbd'>): ReactElement {
  return (
    <kbd
      className={cn(
        'ml-auto text-xs tracking-widest text-muted-foreground group-data-highlighted/command-item:text-foreground',
        className,
      )}
      data-slot="command-shortcut"
      {...props}
    />
  )
}

function CommandFooter({
  className,
  ...props
}: ComponentProps<'div'>): ReactElement {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-2 border-t px-5 py-3 text-xs text-muted-foreground',
        className,
      )}
      data-slot="command-footer"
      {...props}
    />
  )
}

const fuzzy = (item: unknown, query: string): boolean => {
  if (typeof item !== 'string') return false
  if (typeof query !== 'string') return false
  if (query.length > item.length) return false
  if (query.length === 0) return true
  if (item.length === 0) return false
  let textIndex = 0
  let inputIndex = 0
  while (textIndex < item.length && inputIndex < query.length) {
    if (item.toLowerCase()[textIndex] === query.toLowerCase()[inputIndex]) {
      inputIndex++
    }
    textIndex++
  }
  return inputIndex === query.length
}

Command.Dialog = CommandDialog
Command.Input = CommandInput
Command.List = CommandList
Command.Empty = CommandEmpty
Command.Group = CommandGroup
Command.Item = CommandItem
Command.Separator = CommandSeparator
Command.Shortcut = CommandShortcut
Command.Footer = CommandFooter

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  fuzzy,
}
