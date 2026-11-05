import { Form, Head } from '@inertiajs/react'
import { IconUserPlus } from '@tabler/icons-react'

import PasswordInput from '@/components/password-input'
import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { login } from '@/wayfinder/routes'
import { store } from '@/wayfinder/routes/register'

type Props = {
    passwordRules: string
}

export default function Register({ passwordRules }: Props) {
    return (
        <>
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors, invalid }) => (
                    <>
                        <div className="grid gap-6">
                            <Field invalid={invalid('name')}>
                                <Field.Label>Name</Field.Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Full name"
                                />
                                <Field.Error>{errors.name}</Field.Error>
                            </Field>

                            <Field invalid={invalid('email')}>
                                <Field.Label>Email address</Field.Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                />
                                <Field.Error>{errors.email}</Field.Error>
                            </Field>

                            <Field invalid={invalid('password')}>
                                <Field.Label>Password</Field.Label>
                                <PasswordInput
                                    id="password"
                                    required
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Password"
                                    passwordrules={passwordRules}
                                />
                                <Field.Error>{errors.password}</Field.Error>
                            </Field>

                            <Field invalid={invalid('password_confirmation')}>
                                <Field.Label>Confirm password</Field.Label>
                                <PasswordInput
                                    required
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirm password"
                                    passwordrules={passwordRules}
                                />
                                <Field.Error>{errors.password_confirmation}</Field.Error>
                            </Field>

                            <Button
                                type="submit"
                                loading={processing}
                                className="mt-2 w-full"
                                data-test="register-user-button"
                            >
                                <IconUserPlus />
                                Create account
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account? <TextLink href={login()}>Log in</TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    )
}

Register.layout = {
    title: 'Create an account',
    description: 'Enter your details below to create your account',
}
