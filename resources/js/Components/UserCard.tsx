import { PropsWithChildren } from "react";
import { Link } from "@inertiajs/react";

import Avatar from '@/Components/Avatar';
import { Characteristic, User } from "@/types";


export default function UserCard ({
	className = "",
	user
}: PropsWithChildren<{
	className?: string
	user: User
}>) {
    return (
		<Link
			href={ route( 'users.show', { user } ) }
			className={[
				"flex items-center overflow-hidden relative",
				"rounded-md bg-indigo-50 shadow-sm",
				"hover:bg-white hover:shadow-md transition-all",
				className
			].join(" ")}>

			<Avatar
				className="bg-white h-12 w-12 m-4"
				src={user.avatar}
				alt={user.username}
			/>

			<div className="overflow-hidden space-y-1">
				<div className="flex items-baseline gap-2">
					<span className="font-light text-lg">
						@{ user.username }
					</span>
					<span className="text-sm font-medium text-gray-400">
						{ user.pronounSet.short }
					</span>
				</div>
				<div className="flex gap-1">
					{ user.characteristics.sort((a:Characteristic, b:Characteristic) => {
						return a.userPrefersCharacteristic ? -1 : 1
					}).map((characteristic) => (
						<span
							key={characteristic.id}
							className={[
								"px-1.5 rounded-full font-thin text-sm whitespace-nowrap",
								(characteristic.userPrefersCharacteristic
									? "bg-indigo-500 text-indigo-100"
									: "bg-indigo-100 text-indigo-400"
								),
							].join(" ")}
						>{characteristic.name}</span>
					))}
				</div>
			</div>

			<div className={[
					"flex items-center justify-center self-stretch w-10 ml-auto flex-shrink-0",
					"bg-indigo-500 font-light text-xl text-white transition-all"
				].join(" ")}>
				{ user.matchInfo?.reduce((acc,curr) => acc + curr.score,0) || 0 }
			</div>

		</Link>
	);
}













