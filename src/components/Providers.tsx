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

type SelectedEmailContextType = {
  selectedEmailId: string | null;
  setSelectedEmailId: Dispatch<SetStateAction<string | null>>;
};

// Create contexts
export const EmailLimitContext = createContext<EmailLimitContextType>({
  limit: 5,
  setLimit: () => {}
});

export const EmailsContext = createContext<EmailsContextType>({
  emails: [],
  setEmails: () => {}
});

export const SelectedEmailContext = createContext<SelectedEmailContextType>({
  selectedEmailId: null,
  setSelectedEmailId: () => {}
});

// Custom hooks to use the contexts
export const useEmailLimit = () => useContext(EmailLimitContext);
export const useEmails = () => useContext(EmailsContext);
export const useSelectedEmail = () => useContext(SelectedEmailContext);

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  const [limit, setLimit] = useState<number>(5); // Default limit
  const [emails, setEmails] = useState<any[]>([]); // Default emails array
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null); // Track the selected email

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <EmailLimitContext.Provider value={{ limit, setLimit }}>
        <EmailsContext.Provider value={{ emails, setEmails }}>
          <SelectedEmailContext.Provider value={{ selectedEmailId, setSelectedEmailId }}>
            {children}
          </SelectedEmailContext.Provider>
        </EmailsContext.Provider>
      </EmailLimitContext.Provider>
    </>
  );
};

export default Providers;
