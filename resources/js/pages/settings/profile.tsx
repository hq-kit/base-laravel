import { Form, Head, setLayoutProps, usePage } from '@inertiajs/react'
import { Link } from '@inertiajs/react'
import { IconDeviceFloppy } from '@tabler/icons-react'

import type { Auth } from '@/types'

import DeleteUser from '@/components/delete-user'
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import ProfileController from '@/wayfinder/App/Http/Controllers/Settings/ProfileController'
import { edit } from '@/wayfinder/routes/profile'
import { send } from '@/wayfinder/routes/verification'

type PageProps = {
    auth: Auth
}

export default ({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) => {
    const { auth } = usePage<PageProps>().props
    setLayoutProps({
        breadcrumbs: [
            {
                title: 'Profile settings',
                href: edit(),
            },
        ],
    })

    return (
        <>
            <Head title="Profile settings" />

            <h1 className="sr-only">Profile settings</h1>

            <div className="space-y-6">
                <Heading variant="small" title="Profile" description="Update your name and email address" />

                <Form
                    {...ProfileController.update.form()}
                    options={{
                        preserveScroll: true,
                    }}
                    className="space-y-6"
                >
                    {({ processing, errors, invalid }) => (
                        <>
                            <Field invalid={invalid('name')}>
                                <Field.Label>Name</Field.Label>
                                <Input
                                    className="mt-1 block w-full"
                                    defaultValue={auth.user.name}
                                    name="name"
                                    required
                                    autoComplete="name"
                                    placeholder="Full name"
                                />
                                <Field.Error>{errors.name}</Field.Error>
                            </Field>

                            <Field invalid={invalid('email')}>
                                <Field.Label>Email address</Field.Label>
                                <Input
                                    type="email"
                                    className="mt-1 block w-full"
                                    defaultValue={auth.user.email}
                                    name="email"
                                    required
                                    autoComplete="username"
                                    placeholder="Email address"
                                />
                                <Field.Error>{errors.email}</Field.Error>
                            </Field>

                            {mustVerifyEmail && auth.user.email_verified_at === null && (
                                <div>
                                    <p className="-mt-4 text-sm text-muted-foreground">
                                        Your email address is unverified.{' '}
                                        <Link
                                            href={send()}
                                            as="button"
                                            className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                        >
                                            Click here to re-send the verification email.
                                        </Link>
                                    </p>

                                    {status === 'verification-link-sent' && (
                                        <div className="mt-2 text-sm font-medium text-green-600">
                                            A new verification link has been sent to your email address.
                                        </div>
                                    )}
                                </div>
                            )}

                            <Button loading={processing} data-test="update-profile-button">
                                <IconDeviceFloppy />
                                Save
                            </Button>
                        </>
                    )}
                </Form>
            </div>

            <DeleteUser />
        </>
    )
}
