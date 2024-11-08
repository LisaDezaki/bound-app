import { PropsWithChildren } from 'react';
import Avatar from '@/Components/Avatar';
import { Characteristic, User } from '@/types';

export default function ProfileHeader ({
	className = '',
	children,
	user
}: PropsWithChildren<{
	className?: string,
	user: User
}>) {
    return (
		<>
			<Avatar
				className="bg-white h-40 w-40"
				src={typeof user.avatar == 'string' ? user.avatar : undefined}
				alt={user.username}
			/>

			<div className="font-light text-4xl mt-4">
				@{user.username}
			</div>

			<div className="text-md font-semibold mb-4 text-gray-400">
				{user.pronounSet.short}
			</div>

			<div className="flex flex-wrap justify-center gap-1.5 max-w-64 mb-12">
				{ user.characteristics && user.characteristics.sort((a:Characteristic, b:Characteristic) => {
						return a.userPrefersCharacteristic ? -1 : 1
					}).map((characteristic: Characteristic) => (
					<span
						key={characteristic.id}
						className={[
							"px-2.5 py-1 rounded-full",
							(characteristic.userPrefersCharacteristic ? "bg-indigo-500" : "bg-indigo-100"),
							(characteristic.userPrefersCharacteristic ? "text-indigo-100" : "text-indigo-400"),
							"font-thin whitespace-nowrap"
						].join(" ")}
					>
						{characteristic.name}
					</span>
				))}
			</div>
		</>
	);
}