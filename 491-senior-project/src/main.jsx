import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login.jsx';
import Alpha from './Alpha.jsx';
import Homepage from './Homepage.jsx';
import Signup from './Signup.jsx';
import './index.css';

// Import flag images (you can replace these with actual paths or URLs)
import esFlag from './flags/es.png'; // Spanish flag
import jpFlag from './flags/jp.png'; // Japanese flag

const App = () => {
  // State to store the current language
  const [language, setLanguage] = useState('es');

  // Function to toggle language (optional)
  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'es' ? 'jp' : 'es'));
  };

  // Get the flag based on the current language
  const getFlag = () => {
    switch (language) {
      case 'es':
        return esFlag;
      case 'jp':
        return jpFlag;
      default:
        return esFlag;
    }
  };

  return (
    <Router>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/">Login</Link></li>
          <li className="nav-item"><Link to="/homepage">Homepage</Link></li>
          <li className="nav-item"><Link to="/alpha">Alphabet</Link></li>
          <li className="nav-item"><Link to="/signup">Sign Up</Link></li>
        </ul>
        {/* Language button on the far right */}
        <button className="language-button" onClick={toggleLanguage}>
          <img src={getFlag()} alt={`Current language: ${language}`} className="flag-icon" />
        </button>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/alpha" element={<Alpha language={language} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
