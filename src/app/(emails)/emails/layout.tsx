import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { notFound } from 'next/navigation';
//import { useState } from 'react';
import SignOutButton from '@/components/SignOutButton';
import fetchEmails from '@/components/fetchEmails';


const Layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getServerSession(authOptions);

    if (!session) notFound();
    const access_token = session.user.sessToken;
    const emails = await fetchEmails(access_token);

    // Sort emails to make unread emails come first
    emails.sort((a, b) => {
        const aUnread = a.labelIds.includes('UNREAD');
        const bUnread = b.labelIds.includes('UNREAD');
        if (aUnread && !bUnread) return -1;
        if (!aUnread && bUnread) return 1;
        return 0;
    });

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-900">
            <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="relative h-10 w-10 bg-gray-700 rounded-full">
                            <Image
                                fill
                                referrerPolicy="no-referrer"
                                className="rounded-full"
                                src={session.user.image || ''}
                                alt="Your profile picture"
                            />
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-gray-300">
                                {session.user.name}
                            </div>
                            <div className="text-xs text-gray-400">
                                {session.user.email}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <select className="bg-gray-700 text-gray-300 rounded px-2 py-1">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                        <button className="bg-indigo-600 text-white rounded px-4 py-2">
                            Classify
                        </button>
                        <SignOutButton className="h-full aspect-square" />
                    </div>
                </div>
                <nav className="flex flex-1 flex-col overflow-auto max-h-[70vh]">
                    <ul role="list" className="flex flex-1 flex-col gap-y-4">
                        {emails.map((email: any) => {
                            const isUnread = email.labelIds.includes('UNREAD');
                            const isInInbox = email.labelIds.includes('INBOX');
                            const filteredLabels = email.labelIds.filter((label: string) => label === 'INBOX');

                            return (
                                <li key={email.id} className={`p-4 rounded-lg ${isUnread ? 'bg-blue-700' : 'bg-gray-700'} text-white`}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className={`font-semibold ${isUnread ? 'text-yellow-300' : 'text-gray-300'}`}>
                                            {isUnread ? 'Unread' : 'Read'}
                                        </span>
                                        {isInInbox && (
                                            <span className="bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">
                                                {filteredLabels.join(', ')}
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-2 text-sm">
                                        {email.snippet}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Layout;

