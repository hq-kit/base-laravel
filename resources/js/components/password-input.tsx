import type { ComponentProps, Ref } from 'react'

import { IconEye, IconEyeClosed } from '@tabler/icons-react'
import { cn } from 'cn'
import { useState } from 'react'

import { InputGroup } from './ui/input-group'

export default function PasswordInput({
    className,
    ref,
    ...props
}: Omit<ComponentProps<'input'>, 'type'> & { ref?: Ref<HTMLInputElement> }) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <InputGroup>
            <InputGroup.Input
                type={showPassword ? 'text' : 'password'}
                className={cn('pr-10', className)}
                ref={ref}
                {...props}
            />
            <InputGroup.Addon align="inline-end">
                <InputGroup.Button onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <IconEyeClosed className="size-4" /> : <IconEye className="size-4" />}
                </InputGroup.Button>
            </InputGroup.Addon>
        </InputGroup>
    )
}
