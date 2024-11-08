import { Head } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdateCharacteristicsForm from './Partials/UpdateCharacteristicsForm';
import UpdatePreferencesForm from './Partials/UpdatePreferencesForm';
import { AuthUser, Characteristic, PageProps, PronounSet } from '@/types';

export default function Edit({
    mustVerifyEmail,
	user,
	characteristics,
	pronounOptions,
    status,
}: PageProps<{
	mustVerifyEmail: boolean;
	user: AuthUser
	characteristics: Characteristic[]
	pronounOptions: PronounSet[]
	status?: string
}>) {
    return (
        <AuthenticatedLayout
            header={`Profile`}
        >
            <Head title="Profile" />

			<div className="mx-auto max-w-7xl space-y-12 my-12">

				<div className="p-12 rounded bg-indigo-50 shadow">
					<UpdateProfileInformationForm
						user={user}
						mustVerifyEmail={mustVerifyEmail}
						pronounOptions={pronounOptions}
						status={status}
					/>
				</div>

				<div className="p-12 rounded bg-indigo-50 shadow flex gap-12">
					<UpdateCharacteristicsForm
						characteristics={characteristics}
					/>
					<UpdatePreferencesForm
						characteristics={characteristics}
					/>
				</div>

				<div className="p-12 rounded bg-indigo-50 shadow">
					<UpdatePasswordForm />
				</div>

				<div className="p-12 rounded bg-indigo-50 shadow">
					<DeleteUserForm />
				</div>

			</div>
        </AuthenticatedLayout>
    );
}
