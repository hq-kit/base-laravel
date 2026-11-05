import { Form, Head } from '@inertiajs/react'
import { IconRefresh } from '@tabler/icons-react'

import PasswordInput from '@/components/password-input'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { update } from '@/wayfinder/routes/password'

type Props = {
    token: string
    email: string
    passwordRules: string
}

export default function ResetPassword({ token, email, passwordRules }: Props) {
    return (
        <>
            <Head title="Reset password" />

            <Form
                {...update.form()}
                transform={(data) => ({ ...data, token, email })}
                resetOnSuccess={['password', 'password_confirmation']}
            >
                {({ processing, errors, invalid }) => (
                    <Field.Group>
                        <Field invalid={invalid('email')}>
                            <Field.Label>Email</Field.Label>
                            <Input type="email" name="email" autoComplete="email" value={email} readOnly />
                            <Field.Error>{errors.email}</Field.Error>
                        </Field>

                        <Field invalid={invalid('password')}>
                            <Field.Label>Password</Field.Label>
                            <PasswordInput
                                name="password"
                                autoComplete="new-password"
                                autoFocus
                                placeholder="Password"
                                passwordrules={passwordRules}
                            />
                            <Field.Error>{errors.password}</Field.Error>
                        </Field>

                        <Field invalid={invalid('password_confirmation')}>
                            <Field.Label>Confirm password</Field.Label>
                            <PasswordInput
                                name="password_confirmation"
                                autoComplete="new-password"
                                placeholder="Confirm password"
                                passwordrules={passwordRules}
                            />
                            <Field.Error>{errors.password_confirmation}</Field.Error>
                        </Field>

                        <Button
                            type="submit"
                            className="mt-4 w-full"
                            loading={processing}
                            data-test="reset-password-button"
                        >
                            <IconRefresh />
                            Reset password
                        </Button>
                    </Field.Group>
                )}
            </Form>
        </>
    )
}

ResetPassword.layout = {
    title: 'Reset password',
    description: 'Please enter your new password below',
}
