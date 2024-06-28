import SignOutButton from "@/components/SignOutButton";
import fetchEmails from "@/components/fetchEmails";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { notFound } from "next/navigation";
import Selection from "@/components/selection";
import EmailList from "@/components/emailList";
import ClassifyButton from "@/components/ClassifyButton";
import Providers from "@/components/Providers"; // Import Providers

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();
  const access_token = session.user.sessToken;
  const finals = await fetchEmails(access_token);

  return (
    <Providers> {/* Wrap with Providers */}
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-blue-600 to-purple-700 text-gray-100 font-sans">
        <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-xl shadow-2xl flex flex-col h-full">
          <div className="flex items-center justify-between mb-6 flex-shrink-0">
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
              <ClassifyButton mails={finals} />
              <SignOutButton className="h-full aspect-square" />
            </div>
          </div>
          <div className="flex flex-grow overflow-hidden">
            <div className="w-1/3 overflow-auto">
              <EmailList mails={finals} />
            </div>
            <div className="w-2/3 p-4 overflow-auto max-h-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </Providers>
  );
};

export default Layout;
