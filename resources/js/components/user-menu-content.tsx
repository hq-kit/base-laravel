import { Link, router } from '@inertiajs/react'
import { IconLogout, IconSettings } from '@tabler/icons-react'

import type { User } from '@/types'

import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { UserInfo } from '@/components/user-info'
import { useMobileNavigation } from '@/hooks/use-mobile-navigation'
import { logout } from '@/wayfinder/routes'
import { edit } from '@/wayfinder/routes/profile'

type Props = {
    user: User
}

export function UserMenuContent({ user }: Props) {
    const cleanup = useMobileNavigation()

    const handleLogout = () => {
        router.post(logout())
        cleanup()
        router.flushAll()
    }

    return (
        <>
            <DropdownMenuGroup>
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <UserInfo user={user} showEmail={true} />
                    </div>
                </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem render={<Link href={edit()} prefetch onClick={cleanup} />}>
                    <IconSettings />
                    Settings
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} data-test="logout-button">
                <IconLogout />
                Log out
            </DropdownMenuItem>
        </>
    )
}
