import { ChangeEvent, ChangeEventHandler, FormEventHandler, PropsWithChildren } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import KinkIcon from '@/Components/KinkIcon';
import { KinkDB, KinkRating, PageProps, UserKinkDB } from '@/types';

export default function KinkUpdateForm ({
	kink,
	userKink
}: PropsWithChildren<{
	className?: string,
	kink: KinkDB,
	userKink: UserKinkDB;
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
		<form
			className="flex flex-col gap-4 items-stretch justify-center my-16"
			onSubmit={ userKink ? updateKink : addKink }
		>
			<div className="bg-white flex rounded-lg shadow p-4 gap-4">
				<KinkIcon rating={form.data.pivot.rating_top as KinkRating} size={40} />

				<div className="flex flex-col flex-grow gap-2">
					<InputLabel
						htmlFor="top"
						value={kink.top}
						className="sr-only"
					/>

					<label>{kink.text.top[form.data.pivot.rating_top+1]}</label>
					<input name="top" type="range" min="-1" max="3" placeholder="0" value={form.data.pivot.rating_top} onChange={handleToppingChange} />
				</div>
			</div>

			<div className="bg-white flex rounded-lg shadow p-4 gap-4">
				<KinkIcon rating={form.data.pivot.rating_bottom as KinkRating} size={40} />

				<div className="flex flex-col flex-grow gap-2">
					<InputLabel
						htmlFor="bottom"
						value={kink.bottom}
						className="sr-only"
					/>

					<label>{kink.text.bottom[form.data.pivot.rating_bottom+1]}</label>
					<input name="bottom" type="range" min="-1" max="3" placeholder="0" value={form.data.pivot.rating_bottom} onChange={handleBottomingChange} />
				</div>
			</div>

			<PrimaryButton className="mt-2 self-center" disabled={form.processing}>{ userKink ? "Update Kink" : "Add Kink" }</PrimaryButton>

		</form>
	);
}