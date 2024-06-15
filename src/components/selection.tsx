// // components/Selection.tsx
// "use client";
// // components/Selection.tsx
// import React, { useState, useEffect } from 'react';

// const Selection = () => {
//   const [emailCount, setEmailCount] = useState(10);

//   useEffect(() => {
//     const updateEmailCount = async () => {
//       await fetch(`/api/emails?count=${emailCount}`);
//     };

//     updateEmailCount();
//   }, [emailCount]);

//   return (
//     <select 
//       className="bg-gray-700 text-gray-300 rounded-lg px-3 py-2 hover:bg-gray-600 transition-colors"
//       value={emailCount}
//       onChange={(e) => setEmailCount(Number(e.target.value))}
//     >
//       <option value="5">5</option>
//       <option value="10">10</option>
//       <option value="15">15</option>
//       <option value="20">20</option>
//     </select>
//   );
// };

// export default Selection;
