import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { notFound } from 'next/navigation';
//import { useState } from 'react';
import SignOutButton from '@/components/SignOutButton';

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getServerSession(authOptions);
    if (!session) notFound();

    //const [emailCount, setEmailCount] = useState(15);

    return (<div className="flex h-screen w-full items-center justify-center bg-gray-900">
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
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-4">
                    {/* Email list will go here */}
                    <li className="bg-gray-700 p-4 rounded-lg text-white">Emily Davis: Hi Emily, Thanks for your order. We are pleased to inform you that your order has been shipped. You can...</li>
                    <li className="bg-gray-700 p-4 rounded-lg text-white">Marketing Team: Dear valued customer, we are excited to introduce our latest product! Check it out on our website now.</li>
                    <li className="bg-gray-700 p-4 rounded-lg text-white">Support Team: Hello, we have important updates regarding your account security. Please review the changes in your dashboard.</li>
                </ul>
            </nav>
        </div>
    </div>
    
    );
};

export default Layout;
