"use client";
import Button from "@/components/ui/button";
import { useClassifiedEmails } from './ClassifiedEmailsContext';
import { useState } from "react";

type ClassifyButtonProps = {
  mails: any[];
};

const ClassifyButton: React.FC<ClassifyButtonProps> = ({ mails }) => {
  const {setClassifiedEmails}= useClassifiedEmails();
  const [loading, setLoading] = useState(false);
  const handleClassifyClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mails),
      });

      if (response.ok) {
        const data = await response.json();
        setClassifiedEmails(data);
        console.log("Response from server:", data);
      } else {
        const errorData = await response.json();
        console.error("Error message:", errorData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="custom"
      size="default"
      className="transition-transform transform hover:scale-105 select-none"
      onClick={handleClassifyClick} 
    >
      {loading ? 'Classifying...' : 'Classify'}
    </Button>
  );
};

export default ClassifyButton;
