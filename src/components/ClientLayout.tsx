"use client";
import { useSelectedEmail } from '@/components/Providers';
import EmailList from './emailList';

type ClientLayoutProps = {
  emails: any[];
  children: React.ReactNode;
};

const ClientLayout: React.FC<ClientLayoutProps> = ({ emails, children }) => {
  const { selectedEmailId } = useSelectedEmail();

  return (
    <div className={`flex flex-col md:flex-row flex-grow overflow-hidden ${selectedEmailId ? '' : 'justify-center items-center'}`}>
      <div className={`${selectedEmailId ? 'w-full md:w-1/3' : 'w-full'} overflow-auto h-full p-4 bg-gray-900 rounded-lg`}>
        <EmailList mails={emails} />
      </div>
      {selectedEmailId && (
        <div className="w-full md:w-2/3 p-4 overflow-auto max-h-full bg-gray-800 rounded-t-xl md:rounded-xl shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
};

export default ClientLayout;
