import SignOutButton from "@/components/SignOutButton";
import fetchEmails from "@/components/fetchEmails";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image"
import { notFound } from "next/navigation";
import Button from "@/components/ui/button";
import Selection from "@/components/selection";

async function fetchEmailLimit() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/limit`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch the email limit');
  }
  const data = await response.json();
  return data.limit;
}

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();
  const access_token = session.user.sessToken;
  const finals = await fetchEmails(access_token);

  const emails = finals.slice(0,await fetchEmailLimit());
  //Sort emails to make unread emails come first
  emails.sort((a, b) => {
      const aUnread = a.labelIds.includes('UNREAD');
      const bUnread = b.labelIds.includes('UNREAD');
      if (aUnread && !bUnread) return -1;
      if (!aUnread && bUnread) return 1;
      return 0;
  });

  return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900 text-gray-100">
        <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-xl shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 bg-gray-700 rounded-full overflow-hidden">
                <Image
                  fill
                  referrerPolicy="no-referrer"
                  className="rounded-full"
                  src={session.user.image || ''}
                  alt="Your profile picture"
                />
              </div>
              <div>
                <div className="text-lg font-semibold">
                  {session.user.name}
                </div>
                <div className="text-sm text-gray-400">
                  {session.user.email}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Selection />
              <Button variant="custom" size="lg">
  Classify
</Button>
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
                  <li key={email.id} className={`p-4 rounded-lg ${isUnread ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-gray-600 transition-colors text-white`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`font-semibold ${isUnread ? 'text-yellow-300' : 'text-gray-300'}`}>
                        {isUnread ? 'Unread' : 'Read'}
                      </span>
                      {isInInbox && (
                        <span className="bg-indigo-400 text-white text-xs px-2 py-1 rounded-full">
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

