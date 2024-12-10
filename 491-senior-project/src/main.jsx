// Worked on by: Tristan Clayman, Ethan Watanabe, Zachary Hunt, Victor Perez, Diego Garcia
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { faBell } from '@fortawesome/free-solid-svg-icons'; // Bell icon import
import { getAuth, signOut } from 'firebase/auth'; // Import Firebase signOut
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Font Awesome icon
import { faCog } from '@fortawesome/free-solid-svg-icons'; // Import the gear icon
import Login from './Login/Login.jsx';
import Homepage from './Homepage/Homepage.jsx';
import Signup from './Signup/Signup.jsx';
import LanguageSelection from './LanguageSelection/LanguageSelection.jsx';
import Profile from './Profile/Profile.jsx';
import Lessons from './Lessons/Lessons.jsx'; 
import Alpha from './Alphabet/Alpha.jsx';
import FillInTheBlank from './Alphabet/FillInTheBlank.jsx';
import Conjugate from './Conjugate/Conjugate.jsx';
import NotificationsDropdown from './Notifications/NotificationsDropdown.jsx'; // Dropdown import
import DarkModeToggle from './DarkMode/DarkMode.jsx';  // Import dark mode toggle from DarkMode.jsx
import Grammar from './Grammar/Grammar.jsx';
import Sentence from './Sentence/Sentence.jsx';
import Forgotpass from './ForgotPassword/ForgotPass.jsx';
import Color from './Color/Color.jsx';
import Number from './Number/Number.jsx';
import Date from './Date/Date.jsx';

// Imports for Spanish Lessons
import ColorDialouge from './SpanishLessons/Color/ColorDialouge.jsx'
import ColorMatch from './SpanishLessons/Color/ColorMatching.jsx'

import CalendarActivity from './SpanishLessons/Dates/CalendarActivity.jsx'
import DateDialouge from './SpanishLessons/Dates/DateDialouge.jsx'

import ShoppingList from './SpanishLessons/Number/ShoppingList.jsx'
import NumberDialouge from './SpanishLessons/Number/NumberDialouge.jsx'

import LessonPage from './SpanishLessons/lessonpagetemp.jsx'

//Imports for Spanish Tests
import ColorTest from './SpanishTest/ColorTest.jsx'
import NumberTest from './SpanishTest/NumberTest.jsx';
import DateTest from './SpanishTest/DateTest.jsx';
import Chatbox from './ChatComponents/Chatbox/Chatbox.jsx';

import './index.css';
import Communities from './Communities/Communities.jsx';
import Friends from './Friends/Friends.jsx';
import DailyQuiz from './DailyQuiz/Quiz.jsx';

//Import for Daily quiz
import SpanishQuiz from './DailyQuiz/quizEs.jsx';
import JapaneseQuiz from './DailyQuiz/quizJp.jsx';
import QuizPage from './DailyQuiz/dailytemp.jsx';

//Import for Leaderboard
import QuizLeaderboard from './DailyQuiz/board.jsx';

// Import flag images
import esFlag from './flags/es.png'; // Spanish flag
import jpFlag from './flags/jp.png'; // Japanese flag
import BluLogo from './Logo/LangLinkBlueTransparent.png';
import TranslateComponent from './TranslateComponent';


const App = () => {
  
  const [language, setLanguage] = useState('es'); // State for the currently selected language ('es' for Spanish, 'jp' for Japanese)
  const [showMenu, setShowMenu] = useState(false); // For toggling the sign-out menu
    //state to store if chat is displayed
  const [isChatting, setIsChatting] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

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


  const toggleChatbox = () => {
    if(isChatting){
      setIsChatting(false);
      document.getElementById('chatbox').style.display=('none');
    }
    else{
      setIsChatting(true);
      document.getElementById('chatbox').style.display=('flex');
    }
  }

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
          <li className="nav-item"><Link to="/lessons">Lessons</Link></li>
          <li className="nav-item"><Link to="/conjugate">Conjugate</Link></li>
          <li className="nav-item"><Link to="/grammar">Grammar</Link></li> 
        <li className="nav-item"><Link to="/lesson">Lesson</Link></li> 
          <li className="nav-item"><Link to="/profile">Profile</Link></li>
          <li className="nav-item"><Link to="/communities">Communities</Link></li>
          <li className="nav-item"><Link to="/friends">Friends</Link></li>
          <li className="nav-item"><Link to="/dailyquiz">DailyQuiz</Link></li>
          <li className="nav-item"><Link to="/translate">Translator</Link></li>


          {/* Add Notifications Dropdown */}
          <li className="nav-item">
            <NotificationsDropdown />
          </li>
        </ul>
        {<button className='chat-button' onClick={toggleChatbox}>Chat</button>}
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
        <li className="nav-item"><Link to="/dailyquiz">DailyQuiz</Link></li>
        
        </ul>
      )}
    </div>
    

        <button className="language-button" onClick={toggleLanguage}>
          <img src={getFlag()} alt={`Current language: ${language}`} className="flag-icon" />
      </button>

        {/* Dark Mode Toggle Button */}
        <DarkModeToggle />  {/* This will add the toggle button for dark mode */}
        </div>
      </nav>

      <div id='chatbox' className='chatbox'>
        <Chatbox/>
    </div>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<Homepage language={language} />} />
        <Route path="/lessons" element={<Lessons language={language} />} />
        <Route path="/grammar/conjugate" element={<Conjugate language={language} />} />
        <Route path="/grammar/sentence" element={<Sentence language={language} />} />
        <Route path="/grammar" element={<Grammar language={language} />} />
        <Route path="/color" element={<Color language={language} />} />
        <Route path="/number" element={<Number language={language} />} />
        <Route path="/date" element={<Date language={language} />} />
      
      {/* Routes for Spanish Lessons */}
      <Route path="/lesson/colormatching" element={<ColorMatch />} />
      <Route path="/lesson/colordialouge" element={<ColorDialouge />} />
      <Route path="/lesson/calendar" element={<CalendarActivity />} />
      <Route path="/lesson/datedialouge" element={<DateDialouge />} />
      <Route path="/lesson/shoppinglist" element={<ShoppingList />} />
      <Route path="/lesson/numberdialouge" element={<NumberDialouge />} />
      
      <Route path="Lesson" element = {<LessonPage />} />

      {/* Routes for Spanish Tests */}
      <Route path="/lesson/colortest" element={<ColorTest />} />
      <Route path="/lesson/numbertest" element={<NumberTest />} />
      <Route path="/lesson/datetest" element={<DateTest />} />

      {/* Routes for Daily Quiz */}

      <Route path="/dailyquiz/es" element={<SpanishQuiz />} /> 
      <Route path="/dailyquiz/jp" element={<JapaneseQuiz />} /> 
      <Route path="/leaderboard" element={<QuizLeaderboard />} /> 
      <Route path="dailyquiz" element = {<QuizPage />} />

        <Route path="/alpha" element={<Alpha language={language} />} />
        <Route path="/matching" element={<FillInTheBlank language={language} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/language-selection" element={<LanguageSelection />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/dailyquiz" element={<DailyQuiz />} />
        <Route path="/translate" element={<TranslateComponent />} /> 
        <Route path="/forgotpassword" element={<Forgotpass />} />
        <Route path="/friends" element={<Friends />} />
    </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

