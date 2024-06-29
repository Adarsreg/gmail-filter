// Selection.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { useEmailLimit } from './Providers'; 

const Selection = () => {
  const { limit, setLimit } = useEmailLimit(); // Use the context hook to get and set the limit
  const [selectedValue, setSelectedValue] = useState(limit.toString()); // Initialize with the context's default value

  useEffect(() => {
    // Update the selected value when the context's limit changes
    setSelectedValue(limit.toString());
  }, [limit]);

  const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = e.target.value;
    console.log(newLimit); 
    setSelectedValue(newLimit); // Update selected value

    try {
      const response = await fetch('/api/limit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ limit: newLimit }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Server response:', data); // Log the server response

      // Update the context's limit
      setLimit(Number(newLimit));
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <select
      className="bg-purple-600 text-white rounded-lg px-3 py-2 hover:bg-purple-700  focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-transform transform hover:scale-105 select-none"
      value={selectedValue}
      onChange={handleSelectChange}
    >
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="20">20</option>
    </select>
  );
};

export default Selection;
