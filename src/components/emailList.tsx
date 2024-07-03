"use client";
import React, { useContext, useEffect, useState } from 'react';
import { EmailLimitContext, useEmails, useSelectedEmail } from './Providers';
import { useRouter } from 'next/navigation';
import { useClassifiedEmails } from './ClassifiedEmailsContext';
import Button from './ui/button';

type EmailListProps = {
  mails: any[];
};

const EmailList: React.FC<EmailListProps> = ({ mails }) => {
  const { limit } = useContext(EmailLimitContext);
  const { emails, setEmails } = useEmails();
  const { selectedEmailId, setSelectedEmailId } = useSelectedEmail();
  const { classifiedEmails } = useClassifiedEmails();
  const [filteredEmails, setFilteredEmails] = useState(() => mails.slice(0, limit));
  const [selectedClassification, setSelectedClassification] = useState<string | null>(null);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    let updatedEmails = mails.slice(0, limit);
    if (selectedClassification) {
      updatedEmails = updatedEmails.filter(email => getClassification(email.id) === selectedClassification);
    }
    updatedEmails.sort((a, b) => {
      const aUnread = a.labelIds.includes('UNREAD');
      const bUnread = b.labelIds.includes('UNREAD');
      return aUnread === bUnread ? 0 : aUnread ? -1 : 1;
    });
    setFilteredEmails(updatedEmails);
  }, [mails, limit, selectedClassification]);

  useEffect(() => {
    setEmails(mails);
  }, [mails, setEmails]);

  const handleEmailClick = (id: string) => {
    if (selectedEmailId === id) {
      setSelectedEmailId(null);
    } else {
      setSelectedEmailId(id);
      router.push(`/emails/${id}`);
    }
  };

  const handleEmailSelect = (id: string) => {
    setSelectedEmails(prevSelectedEmails =>
      prevSelectedEmails.includes(id)
        ? prevSelectedEmails.filter(emailId => emailId !== id)
        : [...prevSelectedEmails, id]
    );
  };

  const getClassification = (emailId: string) => {
    const classifiedEmail = classifiedEmails.find(email => email.id === emailId);
    return classifiedEmail ? classifiedEmail.classification : 'Unclassified';
  };

  const handleClassificationClick = (classification: string) => {
    if (selectedClassification === classification) {
      setSelectedClassification(null);
      setSelectedEmails([]);
    } else {
      setSelectedClassification(classification);
      const emailsToSelect = filteredEmails
        .filter(email => getClassification(email.id) === classification)
        .map(email => email.id);
      setSelectedEmails(emailsToSelect);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedEmails.length === 0) return;

    try {
      const response = await fetch('/api/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedEmails }),
      });

      if (response.ok) {
        // Handle successful delete
        const remainingEmails = filteredEmails.filter(email => !selectedEmails.includes(email.id));
        setFilteredEmails(remainingEmails);
        setSelectedEmails([]);
      } else {
        // Handle error
        console.error('Failed to delete emails');
      }
    } catch (error) {
      console.error('Error deleting emails:', error);
    }
  };

  return (
    <div className="flex flex-col h-full ">
      {!selectedEmailId && (
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2 ">
          <div className="flex flex-wrap space-x-2 gap-2 ">
            {['Important', 'Promotions', 'Social', 'Spam', 'General', 'Marketing'].map(classification => (
              <Button
                variant="custom"
                size="default"
                key={classification}
                onClick={() => handleClassificationClick(classification)}
                className={`px-4 py-2 rounded-lg ${selectedClassification === classification ? 'bg-indigo-600 text-black' : 'text-white'} transition-all duration-300 focus:ring-0 focus:ring-offset-0`}
              >
                {classification}
              </Button>
            ))}
          </div>
          <Button
            variant="delete"
            size="default"
            onClick={handleDeleteSelected}
            className="px-4 py-2 rounded-lg bg-red-500 text-white transition-all duration-300 hover:bg-red-700 focus:ring-0 focus:ring-offset-0"
          >
            Delete 
          </Button>
        </div>
      )}
      <nav className="flex flex-1 flex-col overflow-auto">
        <ul role="list" className="flex flex-1 flex-col gap-y-4">
          {filteredEmails.map((email: any) => {
            const isUnread = email.labelIds.includes('UNREAD');
            const isInInbox = email.labelIds.includes('INBOX');
            const filteredLabels = email.labelIds.filter((label: string) => label === 'INBOX');
            const classification = getClassification(email.id);
            const isSelected = selectedEmails.includes(email.id);

            return (
              <li
                key={email.id}
                className={`relative p-4 rounded-lg shadow-md ${
                  isSelected ? 'bg-gray-700' : isUnread ? 'bg-blue-500' : 'bg-gray-600'
                } ${
                  selectedEmailId === email.id ? 'border-2 border-indigo-500' : ''
                } hover:bg-gray-700 transition-colors text-white cursor-pointer flex flex-col`}
              >
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
                <div className="mt-2 text-sm flex-1" onClick={() => handleEmailClick(email.id)}>
                  {email.snippet}
                </div>
                {classification !== 'Unclassified' && (
                  <span className="mt-2 text-xs text-yellow-400 p-1 font-bold">
                    Classification: {classification}
                  </span>
                )}
                <div className="mt-2 flex justify-end">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleEmailSelect(email.id)}
                    className="accent-indigo-500 absolute bottom-2 right-2"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default EmailList;
