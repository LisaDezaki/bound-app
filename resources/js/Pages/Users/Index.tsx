import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UserCard from '@/Components/UserCard';
import { PageProps, User } from '@/types';
import { Head } from '@inertiajs/react';

export default function ListUsers ({
	users,
	status
}: PageProps<{
	users?: User[]
	status?: string
}>) {
    return (
        <AuthenticatedLayout
            header={`Users`}
        >
            <Head title="Users" />

			{ users && (
				<ul
					className={[
						"flex flex-col gap-2",
						"w-96 mx-auto py-8",
						"text-gray-900"
					].join(" ")}
				>
					{ users.sort((a,b) => {
						let aTotal = a.matchInfo?.reduce((acc,curr) => acc + curr.score,0) || 0;
						let bTotal = b.matchInfo?.reduce((acc,curr) => acc + curr.score,0) || 0;
						return bTotal - aTotal;
					}).map((user: User) => (
						<li key={user.id}>
							<UserCard user={user} />
						</li>
					))}
				</ul>
			)}
        </AuthenticatedLayout>
    );
}
