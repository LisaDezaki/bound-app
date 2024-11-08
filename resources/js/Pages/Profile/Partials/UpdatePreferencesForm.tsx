import { FormEventHandler, useState } from 'react';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';

import { Characteristic, KinkRating, UserSeeking } from '@/types';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import KinkIcon from '@/Components/KinkIcon';
import KinkIconSelect from '@/Components/KinkIconSelect';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function UpdatePreferenceForm({
	characteristics,
    className = '',
}: {
	characteristics: Characteristic[],
    className?: string;
}) {

    const form = useForm({
		characteristics: characteristics
	});

	type Value = string | number | boolean | null

	type Option = {
		rating: KinkRating
		value: string | number | boolean | null
		label: string
	}

	const selectOptions: Option[] = [
		{ rating: 2, label: "Prefer",	value: true	},
		{ rating: 0, label: "Accept",	value: null	},
		{ rating: -1,label: "Reject",	value: false }
	]

	const handleSelection = (characteristic: Characteristic, value: Value) => {

		form.setData('characteristics',
			form.data.characteristics.map((item) => 
				item.id === characteristic.id
					? { ...item, userPrefersCharacteristic: value as boolean | null }
					: item
			)
		);
	  };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
		form.patch(route('preferences.update', form.data));
    };

	//	TODO:	Fix above error (match data structure to route expectation)
	//			Make sure all controllers attach characteristics, preferences, and kinks to the user object
	//			Consistent logic across all pivot data form submission

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Seeking Characteristics
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ensure you're finding the right people.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div className="flex flex-wrap gap-2">

					{ form.data.characteristics && form.data.characteristics.map((characteristic) => (
						<label
							key={characteristic.id}
							className={[
								"inline-flex items-center gap-2 pl-4 px-2 py-1.5 shadow-sm",
								"bg-white rounded-full",
								"font-bold text-gray-800",
							].join(" ")}
						>

							<p>{characteristic.name}</p>

							<KinkIconSelect
								options={selectOptions}
								selected={characteristic.userPrefersCharacteristic}
								onSelect={(value) => handleSelection(characteristic, value)}
							/>

						</label>
					))}
                </div>

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
