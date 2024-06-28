"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { useEmails } from '@/components/Providers';
import EmailDetail from './EmailDetail';

const EmailPage = () => {
  const params = useParams();
  const emailId = params?.emailId as string;
  const { emails } = useEmails();

  if (!params || !emailId || !emails || emails.length === 0) {
    return (
      <div className="p-4 bg-gray-800 rounded-lg shadow-lg text-white">
        <p className="text-lg font-semibold">No email selected or email list is empty.</p>
      </div>
    );
  }

  const email = emails.find((mail: any) => mail.id === emailId);

  if (!email) {
    return (
      <div className="p-4 bg-gray-800 rounded-lg shadow-lg text-white overflow-auto">
        <p className="text-lg font-semibold">Email not found.</p>
      </div>
    );
  }

  return (
    <div className="p-2 bg-gray-900 rounded-lg shadow-lg text-white max-h-full overflow-auto">
      <EmailDetail email={email} />
    </div>
  );
};

export default EmailPage;
