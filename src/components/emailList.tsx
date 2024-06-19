// EmailList.tsx
"use client"
import React from 'react';

type EmailListProps = {
  emails : any[]
}
const EmailList: React.FC<EmailListProps> = async ({ emails }) => {
  
  return (
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
  );
};

export default EmailList;
