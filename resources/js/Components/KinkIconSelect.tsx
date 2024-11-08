// import React, { useState, useRef, useEffect } from 'react';

// // Define the type for each option and props for the component
// type Option = {
//   value: string | number;
//   label: string;
// };

// interface KinkIconOptions {
//   options: Option[];
//   selected: Option | null;
//   onSelect: (option: Option) => void;
// }

// const KinkIconSelect: React.FC<KinkIconOptions> = ({ options, selected, onSelect }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Toggle dropdown visibility
//   const toggleDropdown = () => setIsOpen((prev) => !prev);

//   // Handle click outside to close dropdown
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="relative inline-block w-64" ref={dropdownRef}>
//       {/* Trigger button */}
//       <div
//         className="p-2 border rounded bg-white cursor-pointer hover:bg-gray-100"
//         onClick={toggleDropdown}
//       >
//         {selected ? selected.label : 'Select an option'}
//       </div>

//       {/* Dropdown menu */}
//       {isOpen && (
//         <div className="absolute left-0 mt-2 w-full border rounded bg-white shadow-lg">
//           {options.map((option) => (
//             <div
//               key={option.value}
//               className={`p-2 cursor-pointer hover:bg-blue-500 hover:text-white ${
//                 selected?.value === option.value ? 'bg-blue-100' : ''
//               }`}
//               onClick={() => {
//                 onSelect(option);
//                 setIsOpen(false); // Close dropdown after selection
//               }}
//             >
//               {option.label}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default KinkIconSelect;































// import React, { useState, useRef, useEffect } from 'react';

// // Define the type for each option and props for the component
// type Option = {
//   value: string | number;
//   label: string;
// };

// interface KinkIconOptions {
//   options: Option[];
//   selected: Option | null;
//   onSelect: (option: Option) => void;
// }





import { MouseEventHandler, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { KinkRating } from '@/types';
import KinkIcon from './KinkIcon';

type Value = string | number | boolean | null

type Option = {
	rating: KinkRating
	value: Value
	label: string
}

type KinkIconProps = {
	className?: string
	options: Option[]
	selected: Value
	size?: number
	onSelect: (value: Value) => void
}

export default function KinkIconSelect ({
	className = '',
	onSelect,
	options,
	selected,
	size = 20
}: KinkIconProps) {

	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Toggle dropdown visibility
	const toggleDropdown = () => setIsOpen((prev) => !prev);

	// Handle click outside to close dropdown
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

    return (

		<div className="inline-block relative" ref={dropdownRef}>

			<div onClick={toggleDropdown} className={className}>
				<KinkIcon
					className="cursor-pointer"
					rating={options.find((option) => option.value == selected)?.rating as KinkRating}
					size={size}
				/>
			</div>

			{ isOpen && (

				<ul className="bg-white inline-flex flex-col py-2 rounded-xl shadow-lg w-content absolute -translate-y-1/2 -mt-2.5 -ml-3 z-50">
					{ options.map((option) => (
						<li
							key={option.label}
							className="flex items-center gap-2 px-3 py-1.5 pr-6 cursor-pointer whitespace-nowrap hover:bg-indigo-50"
							onClick={(e: React.MouseEvent<HTMLLIElement>) => {
								onSelect(option.value);
								setIsOpen(false);
							}}
						>
							<KinkIcon
								rating={option.rating as KinkRating}
								size={size}
							/>
							{option.label}
						</li>
					)) }
				</ul>
			) }


		</div>
	);
}