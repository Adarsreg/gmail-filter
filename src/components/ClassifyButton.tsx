// components/ClassifyButton.tsx
"use client";
import React from 'react';
import Button from "@/components/ui/button";

type ClassifyButtonProps = {
  mails: any[];
};

const ClassifyButton: React.FC<ClassifyButtonProps> = ({ mails }) => {
  const handleClassifyClick = async () => {
    try {
      
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mails), 
      });

      if (response.ok) {
        console.log("Emails sent for classification successfully.");
        const data = await response.json();
        console.log("Response from server:", data);
      } else {
        console.error("Error sending emails. Status code:", response.status);
        const errorData = await response.json();
        console.error("Error message:", errorData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Button
      variant="custom"
      size="default"
      className="transition-transform transform hover:scale-105 select-none"
      onClick={handleClassifyClick} 
    >
      Classify
    </Button>
  );
};

export default ClassifyButton;
