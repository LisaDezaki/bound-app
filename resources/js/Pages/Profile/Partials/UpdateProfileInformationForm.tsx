import { FormEventHandler } from 'react';
// import { Transition } from '@headlessui/react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { Link, useForm, usePage } from '@inertiajs/react';

import FileInput from '@/Components/FileInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { AuthUser, PronounSet } from '@/types';

export default function UpdateProfileInformation({
    mustVerifyEmail,
	user,
    status,
	pronounOptions,
    className = '',
}: {
    mustVerifyEmail: boolean
	user: AuthUser
    status?: string
	pronounOptions: PronounSet[]
    className?: string
}) {

    const form = useForm({
		avatar: user.avatar,
		username: user.username,
		pronounSet: user.pronounSet,
		email: user.email,
		_method: 'patch'
	});

	const handlePronounSelection = (id: number) => {
		const newPronouns = pronounOptions.find((pronounSet: any) => pronounSet.id === id);
		if (newPronouns) { form.setData('pronounSet', newPronouns); }
	}

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        form.post(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} encType="multipart/form-data" className="mt-6 space-y-6">

				<div>
                    <InputLabel htmlFor="avatar" value="Avatar" />

                    <FileInput
                        id="avatar"
                        className="mt-1 block"
						placeholder={typeof user.avatar == 'string' ? user.avatar : undefined}
                        onChange={(e) => {
							form.setData('avatar', e.target.files?.[0]);
						 } }
                    />

                    <InputError className="mt-2" message={form.errors.avatar} />
                </div>

				<div>
                    <InputLabel htmlFor="pronouns" value="Pronouns" />

					<SelectInput
						className="w-40"
						onChange={handlePronounSelection}
						options={ pronounOptions.map((pronounSet) => {
							return { value: pronounSet.id, label: pronounSet.short }
						}) }
						value={ form.data.pronounSet.id }
					/>

                    <InputError className="mt-2" message={form.errors.pronounSet} />
                </div>

                <div>
                    <InputLabel htmlFor="username" value="Username" />

                    <TextInput
                        id="username"
                        className="mt-1 block w-full"
                        value={form.data.username}
                        onChange={(e) => form.setData('username', e.target.value)}
                        required
                        isFocused
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={form.errors.username} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={form.data.email}
                        onChange={(e) => form.setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={form.errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={form.processing}>Save</PrimaryButton>

                    <Transition
                        show={form.recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
