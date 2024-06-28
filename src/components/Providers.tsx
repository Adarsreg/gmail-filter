"use client"

import { FC, ReactNode, useState, createContext, useContext, Dispatch, SetStateAction } from 'react';
import { Toaster } from 'react-hot-toast';

// Type definitions
type EmailLimitContextType = {
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
};

type EmailsContextType = {
  emails: any[];
  setEmails: Dispatch<SetStateAction<any[]>>;
};

// Create EmailLimitContext
export const EmailLimitContext = createContext<EmailLimitContextType>({
  limit: 5,
  setLimit: () => {}
});

// Create EmailsContext
export const EmailsContext = createContext<EmailsContextType>({
  emails: [],
  setEmails: () => {}
});

// Custom hooks to use the contexts
export const useEmailLimit = () => useContext(EmailLimitContext);
export const useEmails = () => useContext(EmailsContext);

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  const [limit, setLimit] = useState<number>(5); // Default limit
  const [emails, setEmails] = useState<any[]>([]); // Default emails array

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <EmailLimitContext.Provider value={{ limit, setLimit }}>
        <EmailsContext.Provider value={{ emails, setEmails }}>
          {children}
        </EmailsContext.Provider>
      </EmailLimitContext.Provider>
    </>
  );
};

export default Providers;
