"use client"

import { FC, ReactNode, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { createContext, useContext } from 'react';

// Create EmailLimitContext
export const EmailLimitContext = createContext({
  limit: 5, // Default limit
  setLimit: (limit: number) => {} // Default setter
});

// Custom hook to use the EmailLimitContext
export const useEmailLimit = () => useContext(EmailLimitContext);

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  const [limit, setLimit] = useState(5); // Default limit

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <EmailLimitContext.Provider value={{ limit, setLimit }}>
        {children}
      </EmailLimitContext.Provider>
    </>
  );
};

export default Providers;
