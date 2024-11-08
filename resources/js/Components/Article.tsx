import { PropsWithChildren } from 'react';

export default function Article ({
	className = '',
	children
}: PropsWithChildren<{
	className?: string
}>) {
    return (
		<article
				className={[
					"mx-auto my-8 w-full",
					"bg-indigo-50 rounded-lg shadow-md",
					className
				].join(" ")}
			>
			{children}
		</article>
	);
}