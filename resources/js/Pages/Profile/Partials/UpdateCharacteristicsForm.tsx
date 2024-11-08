import { FormEventHandler, useRef } from 'react';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';

import { Characteristic, KinkDB, PageProps } from '@/types';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function UpdatePasswordForm({
	characteristics,
	// userCharacteristics,
    className = '',
}: {
	characteristics: Characteristic[],
	// userCharacteristics: Characteristic[],
    className?: string;
}) {
    const {
        data,
        setData,
        errors,
        patch,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        selectedCharacteristics: characteristics
			.filter((c: Characteristic) => c.userHasCharacteristic)
			.map((c: Characteristic) => c.id)
    });

	const handleToggle = (id: number) => {
		const newSelectedCharacteristics = data.selectedCharacteristics.includes(id)
		  ? data.selectedCharacteristics.filter((permId) => permId !== id)
		  : [...data.selectedCharacteristics, id];
	
		setData('selectedCharacteristics', newSelectedCharacteristics);
	  };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
		patch(route('characteristics.update', data));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Update Characteristics
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ensure you're found by the right people.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div className="flex flex-wrap gap-2">

					{ characteristics && characteristics.map((characteristic) => (
						<label
							key={characteristic.id}
							// for={characteristic.name}
							className={[
								"inline-flex items-center gap-2 px-2.5 pr-3.5 py-1.5 shadow-sm",
								"bg-white rounded-lg",
								"font-bold text-gray-800",
								"hover:bg-blue-50 hover:shadow-md",
								"cursor-pointer transition-all",
							].join(" ")}
						>
							<Checkbox
								className="peer"
								value={characteristic.id}
								checked={data.selectedCharacteristics.includes(characteristic.id)}
								onChange={() => handleToggle(characteristic.id)}
								id={characteristic.name.toLowerCase()}
								name={characteristic.name.toLowerCase()}
							/>

							<p className="peer-checked:text-pink-500">{characteristic.name}</p>

						</label>
					))}
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
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
