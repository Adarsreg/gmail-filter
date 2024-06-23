// components/ClassifyButton.tsx
"use client";
import React from 'react';
import Button from "@/components/ui/button";

type ClassifyButtonProps = {
  mails: any[];
};

const ClassifyButton: React.FC<ClassifyButtonProps> = ({ mails }) => {

   const emails= mails.slice(0, 2);
  const handleClassify = async () => {
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: emails }),
      });

      if (!response.ok) {
        throw new Error('Failed to classify emails');
      }

      const classifiedEmails = await response.json();
      console.log('Classified Emails:', classifiedEmails);

      // Implement any UI update logic to reflect the classified emails
    } catch (error) {
      console.error('Error classifying emails:', error);
    }
  };

  return (
    <Button 
      onClick={handleClassify} // Hook up the classify button
      variant="custom" 
      size="lg" 
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95"
    >
      Classify
    </Button>
  );
};

export default ClassifyButton;
