import { PropsWithChildren } from 'react';
import Avatar from '@/Components/Avatar';
import KinkIcon from '@/Components/KinkIcon';
import { KinkMatch, User } from '@/types';

export default function KinkMatches ({
	className = '',
	children,
	matches,
	user
}: PropsWithChildren<{
	className?: string,
	matches: KinkMatch[],
	user: User
}>) {
    return (
		<div className="bg-pink-400 border-4 border-pink-300 text-white p-8 rounded-3xl space-y-2">

			<h2 className="text-3xl font-light mb-2 text-center">Your Bound score with <br/> @{user.username} is:</h2>
			
			<p className="bg-indigo-600 text-white text-5xl aspect-square w-20 flex justify-self-center items-center justify-center rounded-full font-semibold  shadow-lg">
				{ matches.reduce((acc,curr) => acc + curr.score,0) }
			</p>

			<div className="flex justify-between w-full">
				<span className="font-semibold border-b px-4 py-1 text-center w-20">You</span>
				<span className="font-semibold border-b px-4 py-1 text-center w-20">
					{user.pronounSet.full.split('/')[1].charAt(0).toUpperCase() + user.pronounSet.full.split('/')[1].slice(1)}
				</span>
			</div>

			<ul className="flex flex-col items-stretch justify-start gap-2 w-full">
				{ matches && matches.sort((a,b) => b.score - a.score).map((match) => (
					<li key={`${match.id}_${match.user1.role}`} className="bg-pink-50 text-gray-600 rounded-lg p-4 shadow space-y-2">
						<div className="flex items-center justify-center">
							<div className="flex flex-col items-center pt-1 w-20">
								<KinkIcon rating={match.user1.rating} size={24} />
								<span className="text-gray-500 text-sm">{match.user1.role.charAt(0).toUpperCase() + match.user1.role.slice(1)}</span>
							</div>
							<div className="flex flex-col items-center w-full">
								<p className="font-bold text-lg">{match.name}</p>
								
							</div>
							<div className="flex flex-col items-center pt-1 w-20">
								<KinkIcon rating={match.user2.rating} size={24} />
								<span className="text-gray-500 text-sm">{match.user2.role.charAt(0).toUpperCase() + match.user2.role.slice(1)}</span>
							</div>
						</div>
						<p className="text-gray-600">{match.text}</p>
					</li>
				))}
			</ul>
		</div>
	);
}