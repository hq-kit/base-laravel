// Components
import { Form, Head } from '@inertiajs/react'
import { IconMail } from '@tabler/icons-react'

import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { login } from '@/wayfinder/routes'
import { email } from '@/wayfinder/routes/password'

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Forgot password" />

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

            <div className="space-y-6">
                <Form {...email.form()}>
                    {({ processing, errors }) => (
                        <>
                            <Field>
                                <Field.Label>Email address</Field.Label>
                                <Input
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="email@example.com"
                                />
                                <Field.Error>{errors.email}</Field.Error>
                            </Field>

                            <div className="my-6 flex items-center justify-start">
                                <Button
                                    className="w-full"
                                    loading={processing}
                                    data-test="email-password-reset-link-button"
                                >
                                    <IconMail />
                                    Email password reset link
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                <div className="space-x-1 text-center text-sm text-muted-foreground">
                    <span>Or, return to</span>
                    <TextLink href={login()}>log in</TextLink>
                </div>
            </div>
        </>
    )
}

ForgotPassword.layout = {
    title: 'Forgot password',
    description: 'Enter your email to receive a password reset link',
}
