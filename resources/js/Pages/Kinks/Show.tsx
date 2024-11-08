import { ChangeEvent, ChangeEventHandler, FormEventHandler } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Article from '@/Components/Article';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import KinkIcon from '@/Components/KinkIcon';
import UserCard from '@/Components/UserCard';
import { KinkDB, KinkRating, PageProps, UserKinkDB } from '@/types';

import KinkInfo from './Partials/KinkInfo';
import KinkUpdateForm from './Partials/KinkUpdateForm';

export default function ShowKink({
	kink,
	userKink,
	status
}: PageProps<{
	kink: KinkDB;
	userKink: UserKinkDB;
	status?: string;
}>) {

	const { props } = usePage();

	const form = useForm({
		...kink,
		pivot: userKink ? userKink.pivot : {
			user_id: props.auth.user.id,
			kink_id: kink.id,
			rating_top: 0,
			rating_bottom: 0,
		},
	});

	const handleToppingChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		form.setData( 'pivot', {
			...form.data.pivot,
			rating_top: value as KinkRating
		});
	}

	const handleBottomingChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		form.setData( 'pivot', {
			...form.data.pivot,
			rating_bottom: value as KinkRating
		});
	}

	const addKink: FormEventHandler = (e) => {
		e.preventDefault();
		form.post(route('userkink.store', form.data));
	}

	const updateKink: FormEventHandler = (e) => {
		e.preventDefault();
		form.patch(route('userkink.update', form.data));
	}

    return (
        <AuthenticatedLayout
            header={`Kink / ${kink.name}`}
        >
            <Head title={`Kink / ${kink.name}`} />

			<Article className="grid grid-cols-2 gap-16 items-start p-24 max-w-7xl">

				<KinkInfo kink={kink} />

				<KinkUpdateForm kink={kink} userKink={userKink} />

			</Article>

			{/* <aside
				className={[
					"max-w-7xl mx-auto my-8"
				].join(" ")}
			>
				{ users && (
					<ul className="grid grid-cols-4 gap-2" >
						{ users.map((user: any) => (
							<li key={user.id}>
								<UserCard user={user} />
							</li>
						))}
					</ul>
					)}
			</aside> */}

			{/* <div className="mx-auto my-8 max-w-7xl sm:px-6 lg:px-8">
				<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
				</div>
			</div> */}
        </AuthenticatedLayout>
    );
}