import { cn } from 'cn'

type ShortcutKeyResult = {
  symbol: string
  readable: string
}

const shortcutKeyMap: Record<string, ShortcutKeyResult> = {
  ctrl: { symbol: '⌃', readable: 'Ctrl' },
  win: { symbol: '⊞', readable: 'Win' },
  mod: { symbol: '⌘', readable: 'Command' },
  cmd: { symbol: '⌘', readable: 'Cmd' },
  meta: { symbol: '⌘', readable: 'Meta' },
  super: { symbol: '⌘', readable: 'Super' },
  alt: { symbol: '⎇', readable: 'Alt' },
  option: { symbol: '⌥', readable: 'Option' },
  shift: { symbol: '⇧', readable: 'Shift' },
  space: { symbol: '␣', readable: 'Space' },
  tab: { symbol: '⇥', readable: 'Tab' },
  delete: { symbol: '⌫', readable: 'Delete' },
  capslock: { symbol: '⇪', readable: 'Caps Lock' },
  up: { symbol: '↑', readable: 'Up' },
  right: { symbol: '→', readable: 'Right' },
  down: { symbol: '↓', readable: 'Down' },
  left: { symbol: '←', readable: 'Left' },
  pageup: { symbol: '⇞', readable: 'Page Up' },
  pagedown: { symbol: '⇟', readable: 'Page Down' },
  home: { symbol: '↖', readable: 'Home' },
  end: { symbol: '↘', readable: 'End' },
  enter: { symbol: '↵', readable: 'Enter' },
  esc: { symbol: '⎋', readable: 'Escape' },
  fn: { symbol: 'Fn', readable: 'Function' },
}

type Key = keyof typeof shortcutKeyMap

const getShortcutKey = (key: Key): ShortcutKeyResult =>
  shortcutKeyMap[key.toLowerCase()] || { symbol: key, readable: key }

function Kbd({
  className,
  symbol = true,
  children,
  ...props
}: React.ComponentProps<'kbd'> & { symbol?: boolean }) {
  const childrens = String(children as string)
    .split('+')
    .map((key) =>
      symbol
        ? getShortcutKey(key.trim()).symbol
        : getShortcutKey(key.trim()).readable,
    )
    .join(' + ')
  return (
    <kbd
      className={cn(
        "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm bg-muted px-1 font-sans text-xs font-medium text-muted-foreground select-none in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 [&_svg:not([class*='size-'])]:size-3",
        className,
      )}
      data-slot="kbd"
      {...props}
    >
      {childrens}
    </kbd>
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <kbd
      className={cn('inline-flex items-center gap-1', className)}
      data-slot="kbd-group"
      {...props}
    />
  )
}

Kbd.Group = KbdGroup

export { getShortcutKey, Kbd, KbdGroup }
