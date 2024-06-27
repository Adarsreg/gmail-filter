// EmailList.tsx
"use client"
import React, { useContext, useEffect, useState } from 'react';
import { EmailLimitContext } from './Providers'; // Import the context

type EmailListProps = {
  mails: any[]
};

const EmailList: React.FC<EmailListProps> = ({ mails }) => {
  const { limit } = useContext(EmailLimitContext); // Use the context to get the current limit
  const [emails, setEmails] = useState(() => mails.slice(0, limit)); // Initialize emails state with a function to avoid calling slice in render

  useEffect(() => {
    // Update emails state when limit changes
    const updatedEmails = mails.slice(0, limit);
    updatedEmails.sort((a, b) => {
      const aUnread = a.labelIds.includes('UNREAD');
      const bUnread = b.labelIds.includes('UNREAD');
      return aUnread === bUnread ? 0 : aUnread ? -1 : 1;
    });
    setEmails(updatedEmails);
  }, [mails, limit]);

  return (
    <nav className="flex flex-1 flex-col overflow-auto max-h-[70vh]">
      <ul role="list" className="flex flex-1 flex-col gap-y-4">
        {emails.map((email: any) => {
          const isUnread = email.labelIds.includes('UNREAD');
          const isInInbox = email.labelIds.includes('INBOX');
          const filteredLabels = email.labelIds.filter((label: string) => label === 'INBOX');

          return (
            <li key={email.id} className={`p-4 rounded-lg shadow-md ${isUnread ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-gray-600 transition-colors text-white`}>
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
  );
};

export default EmailList;