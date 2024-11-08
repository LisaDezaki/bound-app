import Article from '@/Components/Article';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={`Dashboard`}
        >
            <Head title="Dashboard" />

			<div className="grid grid-cols-3 gap-8 max-w-7xl mx-auto">

				<Article className="col-span-2 p-8">
					Feed
				</Article>

				<aside className="col-span-1 mx-auto my-8 bg-indigo-50 rounded-lg shadow-md w-full p-8">
					Sidebar
				</aside>
				
			</div>
        </AuthenticatedLayout>
    );
}
