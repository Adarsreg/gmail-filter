"use client";

import React from 'react';
import { useSelectedEmail } from '@/components/Providers';
import EmailList from './emailList';

type ClientLayoutProps = {
  emails: any[];
  children: React.ReactNode;
};

const ClientLayout: React.FC<ClientLayoutProps> = ({ emails, children }) => {
  const { selectedEmailId } = useSelectedEmail();

  return (
    <div className={`flex flex-grow overflow-hidden ${selectedEmailId ? '' : 'justify-center items-center'}`}>
      <div className={`${selectedEmailId ? 'w-1/3' : 'w-full'} overflow-auto h-full`}>
        <EmailList mails={emails} />
      </div>
      {selectedEmailId && (
        <div className="w-2/3 p-4 overflow-auto max-h-full">
          {children}
        </div>
      )}
    </div>
  );
};

export default ClientLayout;
