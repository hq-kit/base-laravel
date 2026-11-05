import { Form, Head } from '@inertiajs/react'
import { IconLogin } from '@tabler/icons-react'

import PasskeyVerify from '@/components/passkey-verify'
import PasswordInput from '@/components/password-input'
import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { register } from '@/wayfinder/routes'
import { store } from '@/wayfinder/routes/login'
import { request } from '@/wayfinder/routes/password'

type Props = {
    status?: string
    canResetPassword: boolean
}

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Log in" />

            <PasskeyVerify />

            <Form {...store.form()} resetOnSuccess={['password']} className="flex flex-col gap-6">
                {({ processing, errors, invalid }) => (
                    <>
                        <Field.Group>
                            <Field invalid={invalid('email')}>
                                <Field.Label>Email address</Field.Label>
                                <Input
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus={true}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                />
                                <Field.Error>{errors.email}</Field.Error>
                            </Field>

                            <Field invalid={invalid('password')}>
                                <div className="flex w-full items-center">
                                    <Field.Label>Password</Field.Label>
                                    {canResetPassword && (
                                        <TextLink href={request()} className="ml-auto text-sm">
                                            Forgot your password?
                                        </TextLink>
                                    )}
                                </div>
                                <PasswordInput
                                    name="password"
                                    required
                                    autoComplete="current-password"
                                    placeholder="Password"
                                />
                                <Field.Error>{errors.password}</Field.Error>
                            </Field>

                            <Field>
                                <Checkbox name="remember" />
                                <Field.Label>Remember me</Field.Label>
                            </Field>

                            <Button
                                type="submit"
                                loading={processing}
                                className="mt-4 w-full"
                                disabled={processing}
                                data-test="login-button"
                            >
                                <IconLogin />
                                Log in
                            </Button>
                        </Field.Group>

                        <div className="text-center text-sm text-muted-foreground">
                            Don't have an account? <TextLink href={register()}>Sign up</TextLink>
                        </div>
                    </>
                )}
            </Form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </>
    )
}

Login.layout = {
    title: 'Log in to your account',
    description: 'Enter your email and password below to log in',
}
