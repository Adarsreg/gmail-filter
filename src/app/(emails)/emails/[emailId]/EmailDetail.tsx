import React, { useEffect, useRef } from 'react';

type EmailDetailProps = {
  email: any;
};

const findEmailBody = (parts: any[]): string => {
  for (const part of parts) {
    if ((part.mimeType === 'text/plain' || part.mimeType === 'text/html') && part.body?.data) {
      return atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'));
    }
    if (part.parts?.length) {
      const nestedBody = findEmailBody(part.parts);
      if (nestedBody) {
        return nestedBody;
      }
    }
  }
  return 'No content available.';
};

const EmailDetail: React.FC<EmailDetailProps> = ({ email }) => {
  const isHTML = email.payload.mimeType === 'text/html';
  const body = email.payload.body?.data 
    ? atob(email.payload.body.data.replace(/-/g, '+').replace(/_/g, '/')) 
    : findEmailBody(email.payload.parts);
  
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && isHTML) {
      const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(body);
        doc.close();
      }
    }
  }, [body, isHTML]);

  return (
    <div className="p-2 bg-gray-800 rounded-lg shadow-lg text-white max-h-full overflow-auto">
      <h2 className="text-lg font-bold mb-2">Email Details</h2>
      <div className="mb-2">
        <strong>From:</strong> {email.payload.headers.find((header: any) => header.name === 'From')?.value || 'Unknown'}
      </div>
      <div className="mb-2">
        <strong>Subject:</strong> {email.payload.headers.find((header: any) => header.name === 'Subject')?.value || 'No Subject'}
      </div>
      <div className="mb-2">
        <strong>Date:</strong> {email.internalDate ? new Date(parseInt(email.internalDate)).toLocaleString() : 'Unknown Date'}
      </div>
      <div className="whitespace-pre-wrap overflow-auto max-h-[70vh]">
        {isHTML ? (
          <iframe
            ref={iframeRef}
            sandbox="allow-same-origin"
            className="w-full h-full border-none"
            style={{ height: '70vh' }}
          />
        ) : (
          <pre className="whitespace-pre-wrap">{body}</pre>
        )}
      </div>
    </div>
  );
};

export default EmailDetail;
