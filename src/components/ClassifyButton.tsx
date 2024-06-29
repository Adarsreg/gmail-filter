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
      size="default" 
      className="  transition-transform transform hover:scale-105 "
    >
      Classify
    </Button>
  );
};

export default ClassifyButton;
