import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import Login from './Login/Login.jsx';
import Homepage from './Homepage/Homepage.jsx';
import Signup from './Signup/Signup.jsx';
import LanguageSelection from './LanguageSelection/LanguageSelection.jsx';
import Profile from './Profile/Profile.jsx';
import Lessons from './Lessons/Lessons.jsx'; 
import Alpha from './Alphabet/Alpha.jsx';
import FillInTheBlank from './Alphabet/FillInTheBlank.jsx';
import Conjugate from './Conjugate/Conjugate.jsx';
import Grammar from './Grammar/Grammar.jsx';
import SentenceEs from './Sentence/Sentence.jsx';
import SentenceJp from './Sentence/Sentencejp.jsx';
import Forgotpass from './ForgotPassword/ForgotPass.jsx';
import Color from './Color/Color.jsx';
import Number from './Number/Number.jsx';
import Date from './Date/Date.jsx';
import './index.css';
import esFlag from './flags/es.png';
import jpFlag from './flags/jp.png';
import BluLogo from './Logo/LangLinkBlueTransparent.png';
import Communities from './Communities/Communities';

const App = () => {
  const [language, setLanguage] = useState('es');
  const [showMenu, setShowMenu] = useState(false);

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

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('User signed out');
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
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
          <li className="nav-item"><Link to="/lessons">Lessons</Link></li>
          <li className="nav-item"><Link to="/alpha">Alphabet</Link></li>
          <li className="nav-item"><Link to="/grammar">Grammar</Link></li> 
          <li className="nav-item"><Link to="/profile">Profile</Link></li>
          <li className="nav-item"><Link to="/communities">Communities</Link></li>
        </ul>

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

          <button className="language-button" onClick={toggleLanguage}>
            <img src={getFlag()} alt={`Current language: ${language}`} className="flag-icon" />
          </button>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/lessons" element={<Lessons language={language} />} />
        <Route path="/grammar/conjugate-es" element={<Conjugate />} />
        <Route path="/grammar/sentence-es" element={<SentenceEs />} />
        <Route path="/grammar/sentence-jp" element={<SentenceJp />} />
        <Route path="/grammar" element={<Grammar language={language} />} />
        <Route path="/color" element={<Color language={language} />} />
        <Route path="/number" element={<Number language={language} />} />
        <Route path="/date" element={<Date language={language} />} />
        <Route path="/alpha" element={<Alpha language={language} />} />
        <Route path="/matching" element={<FillInTheBlank language={language} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/language-selection" element={<LanguageSelection />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/communities" element={<Communities />} /> 
        <Route path="/forgotpassword" element={<Forgotpass />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
