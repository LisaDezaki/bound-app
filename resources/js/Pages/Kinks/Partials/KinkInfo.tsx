import { PropsWithChildren } from 'react';
import { KinkDB } from '@/types';

export default function KinkInfo ({
	kink,
}: PropsWithChildren<{
	className?: string,
	kink: KinkDB,
}>) {
    return (
		<div className="text-gray-800 text-lg whitespace-pre-line">
			<h1 className="font-light text-5xl mb-6">{kink.name}</h1>
			{ kink.aka && <>
				<p className="font-thin text-gray-400">Also known as:</p>
				<p className="inline-flex flex-wrap gap-1 mb-6">
					{kink.aka.split(', ').map((aka) => (
						<span key={aka} className="bg-orange-400 inline-flex items-center text-sm text-orange-900 font-semibold rounded-full px-2 py-0.5">{aka}</span>
					))}
				</p>
			</>}
			<p>{kink.description}</p>
			{ kink.safety && <>
				<h2 className="text-2xl">Important Safety Information</h2>
				<p>{kink.safety}</p>
			</>}
		</div>
	);
}