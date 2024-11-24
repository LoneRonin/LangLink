import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons'; // Bell icon import
import Login from './Login/Login.jsx';
import Homepage from './Homepage/Homepage.jsx';
import Signup from './Signup/Signup.jsx';
import LanguageSelection from './LanguageSelection/LanguageSelection.jsx';
import Profile from './Profile/Profile.jsx';
import Alpha from './Alphabet/Alpha.jsx';
import Conjugate from './Conjugate/Conjugate.jsx';
import NotificationsDropdown from './Notifications/NotificationsDropdown.jsx'; // Dropdown import
import DarkModeToggle from './DarkMode/DarkMode.jsx';  // Import dark mode toggle from DarkMode.jsx
import './index.css';
import Communities from './Communities/Communities';
import Friends from './Friends/Friends.jsx';
import DailyQuiz from './DailyQuiz/Quiz.jsx';

// Import flag images
import esFlag from './flags/es.png'; // Spanish flag
import jpFlag from './flags/jp.png'; // Japanese flag
import BluLogo from './Logo/LangLinkBlueTransparent.png';

const App = () => {
  const [language, setLanguage] = useState('es');

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'es' ? 'jp' : 'es'));
  };

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
        <Link to="/homepage">
          <img src={BluLogo} alt="LangLink Logo" className="logo-icon" />
        </Link>

        <ul className="nav-list">
          <li className="nav-item"><Link to="/">Log In</Link></li>
          <li className="nav-item"><Link to="/homepage">Homepage</Link></li>
          <li className="nav-item"><Link to="/signup">Sign Up</Link></li>
          <li className="nav-item"><Link to="/alpha">Alphabet</Link></li>
          <li className="nav-item"><Link to="/conjugate">Conjugate</Link></li>
          <li className="nav-item"><Link to="/profile">Profile</Link></li>
          <li className="nav-item"><Link to="/communities">Communities</Link></li>
          <li className="nav-item"><Link to="/friends">Friends</Link></li>
          <li className="nav-item"><Link to="/dailyquiz">DailyQuiz</Link></li>


          {/* Add Notifications Dropdown */}
          <li className="nav-item">
            <NotificationsDropdown />
          </li>
        </ul>

        <button className="language-button" onClick={toggleLanguage}>
          <img src={getFlag()} alt={`Current language: ${language}`} className="flag-icon" />
        </button>

        {/* Dark Mode Toggle Button */}
        <DarkModeToggle />  {/* This will add the toggle button for dark mode */}
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/conjugate" element={<Conjugate />} />
        <Route path="/alpha" element={<Alpha language={language} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/language-selection" element={<LanguageSelection />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/dailyquiz" element={<DailyQuiz />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
