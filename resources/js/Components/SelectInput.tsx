import { PropsWithChildren } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'

import { SelectOption } from '@/types';

export default function SelectInput ({
	className = '',
	onChange,
	options,
	value,
}: PropsWithChildren<{
	className: string
	onChange: any
	options: SelectOption[]
	value: any
}>) {

    return (
		<Listbox
			onChange={onChange}
			value={value}
		>
			<ListboxButton
				className={[
					"flex items-center gap-2 px-3 py-2",
					"rounded-md border border-gray-300 shadow-sm ",
					"capitalize bg-white text-gray-500",
					"focus:border-indigo-700 focus:ring-indigo-700",
					className
				].join(" ")}
			>
				{options.find((option: SelectOption) => option.value === value)?.label}

				<svg className="ml-auto" width="12" height="12" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill="currentColor" d="M9.38125 22.3812C12.5562 19.2063 17.7039 19.2063 20.8789 22.3812L39.5203 41.0227L58.1617 22.3812C61.3367 19.2063 66.4844 19.2063 69.6594 22.3812C72.8344 25.5562 72.8344 30.7039 69.6594 33.8789L45.2692 58.2692C42.0942 61.4442 36.9465 61.4442 33.7715 58.2692L9.38125 33.8789C6.20625 30.7039 6.20625 25.5562 9.38125 22.3812Z" />
				</svg>

			</ListboxButton>

			<ListboxOptions
				anchor="bottom start"
				className={[
					"[--anchor-gap:2px]",
					"w-[var(--button-width)]",
					"flex flex-col gap-1 py-1",
					"rounded-md border border-gray-300 shadow",
					"bg-white text-gray-500"
				].join(" ")}
			>
				{ options.map((option:any) => (
					<ListboxOption
						className={[
							"px-4 py-1.5",
							"hover:bg-indigo-50",
							"capitalize",
							"cursor-pointer",
							"data-[focus]:bg-indigo-50"
						].join(" ")}
						key={option.value}
						value={option.value}
					>
						{option.label}
					</ListboxOption>
				)) }
			</ListboxOptions>
		</Listbox>
	);
}