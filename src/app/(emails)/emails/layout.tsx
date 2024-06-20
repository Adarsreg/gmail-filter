import SignOutButton from "@/components/SignOutButton";
import fetchEmails from "@/components/fetchEmails";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image"
import { notFound } from "next/navigation";
import Button from "@/components/ui/button";
import Selection from "@/components/selection";
import EmailList from "@/components/emailList";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();
  const access_token = session.user.sessToken;
  const finals = await fetchEmails(access_token);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-blue-600 to-purple-700 text-gray-100 font-sans">
      <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-xl shadow-2xl">
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
            <Button variant="custom" size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95">
              Classify
            </Button>
            <SignOutButton className="h-full aspect-square" />
          </div>
        </div>
        <EmailList mails={finals} />
      </div>
    </div>
  );
};

export default Layout;

