 // DarkModeToggle.jsx
 import React, { useState, useEffect } from 'react';
 import './darkmode.css'; // Import dark mode styles
 
 const DarkModeToggle = () => {
   const [isDarkMode, setIsDarkMode] = useState(false);
 
   // Handle dark mode toggle
   const toggleDarkMode = () => {
     setIsDarkMode(!isDarkMode);
     if (!isDarkMode) {
       document.body.classList.add('dark-mode');
     } else {
       document.body.classList.remove('dark-mode');
     }
   };
 
   // Optionally, save user's preference for dark mode in local storage
   useEffect(() => {
     const savedTheme = localStorage.getItem('theme');
     if (savedTheme === 'dark') {
       setIsDarkMode(true);
       document.body.classList.add('dark-mode');
     }
   }, []);
 
   useEffect(() => {
     localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
   }, [isDarkMode]);
 
   return (
     <button onClick={toggleDarkMode} className="toggle-dark-mode">
       {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
     </button>
   );
 };
 
 export default DarkModeToggle;