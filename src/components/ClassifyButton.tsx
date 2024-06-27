// components/ClassifyButton.tsx
"use client";
import React from 'react';
import Button from "@/components/ui/button";

type ClassifyButtonProps = {
  mails: any[];
};

const ClassifyButton: React.FC<ClassifyButtonProps> = ({ mails }) => {

   
 
  return (
    <Button 
       // Hook up the classify button
      variant="custom" 
      size="lg" 
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95"
    >
      Classify
    </Button>
  );
};

export default ClassifyButton;
