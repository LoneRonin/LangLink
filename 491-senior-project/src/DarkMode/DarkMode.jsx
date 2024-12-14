import React, { useState, useEffect } from 'react';
import './darkmode.css';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    // Select all containers to toggle their classes accordingly
    const containers = [
      document.querySelector('.login-container'),
      document.querySelector('.signup-container'),
      document.querySelector('.signup-content'),
      document.querySelector('.homepage-container'),
      document.querySelector('.homepage-content'),
      document.querySelector('.sentence-container'),
      document.querySelector('.color-match-container'),
    ];

    containers.forEach(container => {
      if (container) {
        container.classList.toggle('dark-mode', isDarkMode);
      }
    });
  }, [isDarkMode]);

  return (
    <button onClick={toggleDarkMode} className="toggle-dark-mode">
      {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;
