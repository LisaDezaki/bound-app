import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Article from '@/Components/Article';
import KinkIcon from '@/Components/KinkIcon';
import KinkList from '@/Components/KinkList';
import KinkMatches from '@/Components/KinkMatches';
import ProfileHeader from '@/Components/ProfileHeader';
import { KinkMatch, KinkRating, PageProps, User } from '@/types';

export default function ShowUser ({
	user,
	matches,
	status
}: PageProps<{
	user: User,
	matches: KinkMatch[],
	status?: string
}>) {

	const getKinksByRating = (rating: KinkRating) => {
		return user.kinks?.filter((kink) => kink.rating === rating) || [];
	}

    return (
        <AuthenticatedLayout
            header={`User / @${user.username}`}
        >
            <Head title={`User / @${user.username}`} />

			<Article className="grid grid-cols-2 gap-16 p-24 max-w-7xl">

				<div className="flex flex-col items-center w-full">
					<ProfileHeader user={user} />

					<TabGroup className="w-full">
						<TabList className="grid grid-cols-3 mb-2 space-x-2">
							<Tab className="bg-white text-emerald-400 rounded-md px-4 py-4 font-bold uppercase shadow flex flex-col items-center data-[selected]:bg-emerald-400 data-[selected]:text-white">
								<KinkIcon rating={2} size={24} currentColor />Liked
							</Tab>
							<Tab className="bg-white text-sky-400 rounded-md px-4 py-4 font-bold uppercase shadow flex flex-col items-center data-[selected]:bg-sky-400 data-[selected]:text-white">
								<KinkIcon rating={1} size={24} currentColor />Curious
							</Tab>
							<Tab className="bg-white text-red-500 rounded-md px-4 py-4 font-bold uppercase shadow flex flex-col items-center data-[selected]:bg-red-500 data-[selected]:text-white">
								<KinkIcon rating={-1} size={24} currentColor />Limits
							</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<KinkList user={user} kinks={getKinksByRating(3)} />
								<KinkList user={user} kinks={getKinksByRating(2)} />
							</TabPanel>
							<TabPanel>
								<KinkList user={user} kinks={getKinksByRating(1)} />
							</TabPanel>
							<TabPanel>
								<KinkList user={user} kinks={getKinksByRating(-1)} />
								<KinkList user={user} kinks={getKinksByRating(0)} />
							</TabPanel>
						</TabPanels>
					</TabGroup>

				</div>

				<div className="flex flex-col items-center">
					<KinkMatches user={user} matches={matches} />
				</div>

			</Article>
        </AuthenticatedLayout>
    );
}