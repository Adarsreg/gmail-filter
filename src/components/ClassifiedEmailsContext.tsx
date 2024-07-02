"use client";
import React, { createContext, useContext, useState } from 'react';

type ClassifiedEmail = {
  id: string;
  classification: string;
};

type ClassifiedEmailsContextType = {
  classifiedEmails: ClassifiedEmail[];
  setClassifiedEmails: React.Dispatch<React.SetStateAction<ClassifiedEmail[]>>;
};

const ClassifiedEmailsContext = createContext<ClassifiedEmailsContextType | undefined>(undefined);

export const ClassifiedEmailsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [classifiedEmails, setClassifiedEmails] = useState<ClassifiedEmail[]>([]);

  return (
    <ClassifiedEmailsContext.Provider value={{ classifiedEmails, setClassifiedEmails }}>
      {children}
    </ClassifiedEmailsContext.Provider>
  );
};

export const useClassifiedEmails = () => {
  const context = useContext(ClassifiedEmailsContext);
  if (!context) {
    throw new Error('useClassifiedEmails must be used within a ClassifiedEmailsProvider');
  }
  return context;
};

