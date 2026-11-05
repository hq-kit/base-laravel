import { Form } from '@inertiajs/react'
import { useRef } from 'react'

import Heading from '@/components/heading'
import PasswordInput from '@/components/password-input'
import { Button } from '@/components/ui/button'
import ProfileController from '@/wayfinder/App/Http/Controllers/Settings/ProfileController'

import { AlertDialog } from './ui/alert-dialog'
import { Field } from './ui/field'

export default function DeleteUser() {
    const passwordInput = useRef<HTMLInputElement>(null)

    return (
        <div className="space-y-6">
            <Heading
                variant="small"
                title="Delete account"
                description="Delete your account and all of its resources"
            />
            <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
                <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
                    <p className="font-medium">Warning</p>
                    <p className="text-sm">Please proceed with caution, this cannot be undone.</p>
                </div>

                <AlertDialog>
                    <AlertDialog.Trigger
                        render={
                            <Button variant="destructive" data-test="delete-user-button">
                                Delete account
                            </Button>
                        }
                    />
                    <AlertDialog.Content>
                        <AlertDialog.Title>Are you sure you want to delete your account?</AlertDialog.Title>
                        <AlertDialog.Description>
                            Once your account is deleted, all of its resources and data will also be permanently
                            deleted. Please enter your password to confirm you would like to permanently delete your
                            account.
                        </AlertDialog.Description>

                        <Form
                            {...ProfileController.destroy.form()}
                            options={{
                                preserveScroll: true,
                            }}
                            onError={() => passwordInput.current?.focus()}
                            resetOnSuccess
                            className="space-y-6"
                        >
                            {({ resetAndClearErrors, processing, errors, invalid }) => (
                                <>
                                    <Field invalid={invalid('password')}>
                                        <Field.Label className="sr-only">Password</Field.Label>

                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            ref={passwordInput}
                                            placeholder="Password"
                                            autoComplete="current-password"
                                        />

                                        <Field.Error>{errors.password}</Field.Error>
                                    </Field>

                                    <AlertDialog.Footer className="gap-2">
                                        <AlertDialog.Cancel onClick={() => resetAndClearErrors()}>
                                            Cancel
                                        </AlertDialog.Cancel>

                                        <AlertDialog.Action
                                            variant="destructive"
                                            disabled={processing}
                                            type="submit"
                                            data-test="confirm-delete-user-button"
                                        >
                                            Delete account
                                        </AlertDialog.Action>
                                    </AlertDialog.Footer>
                                </>
                            )}
                        </Form>
                    </AlertDialog.Content>
                </AlertDialog>
            </div>
        </div>
    )
}
