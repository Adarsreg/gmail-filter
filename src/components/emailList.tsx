"use client"
import React, { useContext, useEffect, useState } from 'react';
import { EmailLimitContext, useEmails, useSelectedEmail } from './Providers';
import { useRouter } from 'next/navigation';
import { useClassifiedEmails } from './ClassifiedEmailsContext';

type EmailListProps = {
  mails: any[];
};

const EmailList: React.FC<EmailListProps> = ({ mails }) => {
  const { limit } = useContext(EmailLimitContext);
  const { emails, setEmails } = useEmails();
  const { setSelectedEmailId } = useSelectedEmail(); // Use the context
  const { classifiedEmails } = useClassifiedEmails();
  const [filteredEmails, setFilteredEmails] = useState(() => mails.slice(0, limit));
  const router = useRouter();

  useEffect(() => {
    const updatedEmails = mails.slice(0, limit);
    updatedEmails.sort((a, b) => {
      const aUnread = a.labelIds.includes('UNREAD');
      const bUnread = b.labelIds.includes('UNREAD');
      return aUnread === bUnread ? 0 : aUnread ? -1 : 1;
    });
    setFilteredEmails(updatedEmails);
  }, [mails, limit]);

  useEffect(() => {
    setEmails(mails);
  }, [mails, setEmails]);

  const handleEmailClick = (id: string) => {
    setSelectedEmailId(id); // Update the selected email ID
    router.push(`/emails/${id}`);
  };

  const getClassification = (emailId: string) => {
    const classifiedEmail = classifiedEmails.find(email => email.id === emailId);
    return classifiedEmail ? classifiedEmail.classification : 'Unclassified';
  };

  return (
    <nav className="flex flex-1 flex-col overflow-auto">
      <ul role="list" className="flex flex-1 flex-col gap-y-4">
        {filteredEmails.map((email: any) => {
          const isUnread = email.labelIds.includes('UNREAD');
          const isInInbox = email.labelIds.includes('INBOX');
          const filteredLabels = email.labelIds.filter((label: string) => label === 'INBOX');
          const classification = getClassification(email.id);

          return (
            <li key={email.id} onClick={() => handleEmailClick(email.id)} className={`p-4 rounded-lg shadow-md ${isUnread ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-gray-600 transition-colors text-white cursor-pointer`}>
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
              {classification !== 'Unclassified' && (
                <span className="mt-2 text-xs text-yellow-400 p-1 font-bold">
                Classification: {classification}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default EmailList;
