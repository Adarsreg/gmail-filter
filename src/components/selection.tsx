"use client"
import React, { useState } from 'react';

const Selection = () => {
  const [selectedValue, setSelectedValue] = useState('5'); // Initialize with default value

  
  const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value); // Log selected value
    setSelectedValue(e.target.value); // Update selected value

    try {
      const response = await fetch('/api/limit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ limit: e.target.value }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Server response:', data); // Log the server response
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <select
      className="bg-gray-700 text-gray-300 rounded-lg px-3 py-2 hover:bg-gray-600 transition-colors"
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
