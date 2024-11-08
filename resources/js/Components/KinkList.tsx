import { PropsWithChildren } from 'react';
import { Link } from '@inertiajs/react';
import Avatar from '@/Components/Avatar';
import KinkIcon from '@/Components/KinkIcon';
import { UserKinkUI, User } from '@/types';

export default function KinkMatches ({
	className = '',
	children,
	kinks,
	user
}: PropsWithChildren<{
	className?: string,
	kinks: UserKinkUI[],
	user: User
}>) {
    return (
		<ul className="">
			{ kinks.map((kink) => (
				<li key={`${kink.id}_${kink.role}`} className="bg-white rounded-lg mb-2 shadow">
					<Link
						className="flex gap-4 px-4 pr-6 py-3"
						href={route('kinks.show', kink)}
					>
						<KinkIcon className="mt-2" rating={kink.rating} size={24} />

						<div className="py-1">
							<h6 className="font-bold text-lg">{kink.name}</h6>
							{kink.text.charAt(0).toUpperCase() + kink.text.slice(1)}
						</div>

					</Link>
				</li>
			)) }
		</ul>
	);
}