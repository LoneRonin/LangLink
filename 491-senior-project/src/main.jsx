import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login/Login.jsx';
import Homepage from './Homepage/Homepage.jsx';
import Signup from './Signup/Signup.jsx';
import LanguageSelection from './LanguageSelection/LanguageSelection.jsx';
import Profile from './Profile/Profile.jsx'; // Import the Profile page
import Alpha from './Alphabet/Alpha.jsx';
import Conjugate from './Conjugate/Conjugate.jsx';
import Grammar from './Grammar/Grammar.jsx';
import SentenceEs from './Sentence/Sentence.jsx';
import SentenceJp from './Sentence/Sentencejp.jsx';
import Forgotpass from './ForgotPassword/ForgotPass.jsx'

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
import './index.css';

//Import for Daily quiz
import SpanishQuiz from './DailyQuiz/quizEs.jsx';
import JapaneseQuiz from './DailyQuiz/quizJp.jsx';
import QuizPage from './DailyQuiz/dailytemp.jsx';

//Import for Leaderboard
import QuizLeaderboard from './DailyQuiz/board.jsx';

// Import flag images (you can replace these with actual paths or URLs)
import esFlag from './flags/es.png'; // Spanish flag
import jpFlag from './flags/jp.png'; // Japanese flag
import BluLogo from './Logo/LangLinkBlueTransparent.png';


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
      <img src={BluLogo} alt="LangLink Logo" className="logo-icon"/>
      <ul className="nav-list">
        <li className="nav-item"><Link to="/">Log In</Link></li>
        <li className="nav-item"><Link to="/homepage">Homepage</Link></li>
        <li className="nav-item"><Link to="/signup">Sign Up</Link></li>
        <li className="nav-item"><Link to="/alpha">Alphabet</Link></li>
        {/* <li className="nav-item"><Link to="/conjugate">Conjugate</Link></li>*/}
        <li className="nav-item"><Link to="/grammar">Grammar</Link></li> 
        <li className="nav-item"><Link to="/lesson">Lesson</Link></li> 
        <li className="nav-item"><Link to="/profile">Profile</Link></li>
        {/* <li className="nav-item"><Link to="/sentence">Sentence</Link></li> */}
        <li className="nav-item"><Link to="/dailyquiz">DailyQuiz</Link></li>
        
      </ul>
      {/* Language button on the far right */}
      <button className="language-button" onClick={toggleLanguage}>
          <img src={getFlag()} alt={`Current language: ${language}`} className="flag-icon" />
        </button>
    </nav>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/grammar/conjugate-es" element={<Conjugate />} />
      <Route path="/grammar/sentence-es" element={<SentenceEs />} />
      <Route path="/grammar/sentence-jp" element={<SentenceJp />} />
      <Route path="Grammar" element = {<Grammar />} />
      
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
      <Route path="/signup" element={<Signup />} />
      <Route path="/language-selection" element={<LanguageSelection />} />
      <Route path="/profile" element={<Profile />} /> {/* Added route for Profile */}
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
