// Worked on by: Tristan Clayman, Ethan Watanabe, Zachary Hunt, Victor Perez, Diego Garcia
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth'; // Import Firebase signOut
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Font Awesome icon
import { faCog } from '@fortawesome/free-solid-svg-icons'; // Import the gear icon
import Login from './Login/Login.jsx';
import Homepage from './Homepage/Homepage.jsx';
import Signup from './Signup/Signup.jsx';
import LanguageSelection from './LanguageSelection/LanguageSelection.jsx';
import Profile from './Profile/Profile.jsx';
import Alpha from './Alphabet/Alpha.jsx';
import Conjugate from './Conjugate/Conjugate.jsx';
import './index.css';
import esFlag from './flags/es.png';
import jpFlag from './flags/jp.png';
import BluLogo from './Logo/LangLinkBlueTransparent.png';
import Communities from './Communities/Communities';
import TranslateComponent from './TranslateComponent';


const App = () => {
  
  const [language, setLanguage] = useState('es'); // State for the currently selected language ('es' for Spanish, 'jp' for Japanese)
  const [showMenu, setShowMenu] = useState(false); // For toggling the sign-out menu
  
  // Toggle the current language between Spanish ('es') and Japanese ('jp')
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

  // Handle the user sign-out process
  const handleSignOut = () => {
    const auth = getAuth(); // Get the current Firebase authentication instance
    signOut(auth)
      .then(() => {
        console.log('User signed out'); // Log success message on sign-out
        window.location.href = '/'; // Redirect to login page after sign-out
      })
      .catch((error) => {
        console.error('Error signing out: ', error); // Log any errors during sign-out
      });
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
  <li className="nav-item"><Link to="/translate">Translator</Link></li>
</ul>

  {/* Group gear icon and language button */}
  <div className="navbar-right">
    <div className="settings-dropdown">
      <FontAwesomeIcon 
        icon={faCog} 
        className="gear-icon" 
        onClick={() => setShowMenu(!showMenu)} 
      />
      {showMenu && (
        <ul className="dropdown-menu">
          <li className="dropdown-item" onClick={handleSignOut}>Sign Out</li>
        </ul>
      )}
    </div>

    {/* Language button next to the gear icon */}
    <button className="language-button" onClick={toggleLanguage}>
      <img src={getFlag()} alt={`Current language: ${language}`} className="flag-icon" />
    </button>
  </div>
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
        <Route path="/translate" element={<TranslateComponent />} /> 
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);