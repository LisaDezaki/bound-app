import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import KinkIconSelect from '@/Components/KinkIconSelect';
import { Kink, KinkRole, KinkRating, PageProps } from '@/types';

export default function ListKinks({
	kinks,
	status
}: PageProps<{
	kinks: Kink[]
	status?: string
}>) {

	const form = useForm({
		kinks: kinks
	});

	const handleKinkSelect = (kink: Kink, role: KinkRole, rating: KinkRating) => {
		form.setData('kinks',
			form.data.kinks.map((k) =>
				k.id === kink.id
					? { ...k,
						rating_top: (role === 'top' ? rating : k.rating_top),
						rating_bottom: (role === 'bottom' ? rating : k.rating_bottom)
						}
					: k
			)
		);
		form.patch(route('userkink.updateAll', {
			data: form.data,
			preserveScroll: true
		}));
	}

    return (
        <AuthenticatedLayout
            header={`Kinks`}
        >
            <Head title="Kinks" />

			<div className={[
				"flex justify-center",
				"max-w-7xl mx-auto"
			].join(" ")}>
				<input
					className={[
						"mt-8 px-6 p-3 w-96 shadow-md",
						"rounded-full border-none",
						"hover:shadow-2xl transition-shadow",
						"focus:shadow-2xl focus:border-indigo-700 focus:outline-indigo-700"
					].join(" ")}
					placeholder="Search kinks"
					type="search"
				/>
			</div>

			{ kinks && (
				<ul className={[
					"flex flex-col gap-2",
					"w-96 mx-auto py-8",
					"text-gray-900"
				].join(" ")}>

					{ form.data.kinks.map((kink: Kink) => (
						<li key={kink.id}>

							<div
								className={[
								"flex items-center justify-start gap-2 px-4 py-3",
								"rounded bg-indigo-50 font-semibold shadow-sm",
								"hover:bg-white hover:shadow-md transition-all",
								"focus:outline-orange-400"
							].join(" ")}>

								<Link
									href={ route( 'kinks.show', { kink } ) }
									className={[
										"text-pink-400 mr-auto"
									].join(" ")}>
									<h2 className="">{ kink.name }</h2>
								</Link>

								<KinkIconSelect
									size={24}
									selected={kink.rating_top}
									onSelect={(rating) => handleKinkSelect(kink, 'top', rating as KinkRating)}
									options={[
										{ rating:  3, value:  3, label: "Love it!" },
										{ rating:  2, value:  2, label: "Like it" },
										{ rating:  1, value:  1, label: "Curious" },
										{ rating:  0, value:  0, label: "No interest" },
										{ rating: -1, value: -1, label: "Hard limit" }
									]}
								/>

								<KinkIconSelect
									size={24}
									selected={kink.rating_bottom}
									onSelect={(rating) => handleKinkSelect(kink, 'bottom', rating as KinkRating)}
									options={[
										{ rating:  3, value:  3, label: "Love it!" },
										{ rating:  2, value:  2, label: "Like it" },
										{ rating:  1, value:  1, label: "Curious" },
										{ rating:  0, value:  0, label: "No interest" },
										{ rating: -1, value: -1, label: "Hard limit" }
									]}
								/>

							</div>

						</li>
					))}
				</ul>
			)}
        </AuthenticatedLayout>
    );
}
