import { ButtonHTMLAttributes } from 'react';

import { CustomButtonAttributes } from "@/types";

export default function PrimaryButton({
    className = '',
    disabled,
    children,
	label,
    ...props
}: CustomButtonAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={[
				"inline-flex items-center px-6 py-2",
				"rounded-md border-2",
				"text-xs font-semibold uppercase tracking-widest",
				"bg-pink-500 border-pink-500 text-white",
				"hover:bg-pink-400 hover:border-pink-400",
				"focus:bg-pink-400 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2",
				"transition duration-150 ease-in-out",
				className
			].join(" ")	}
            disabled={disabled}
        >
            {children || label}
        </button>
    );
}
