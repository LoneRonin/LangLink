// Worked on by: Tristan Clayman, Victor Perez

import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; 
import Popup from '../Popup/Popup.jsx'; 
import { hasShownPopupToday, setPopupShownToday } from '../firebaseUtils'; 
import { spanishWords, japaneseWords } from '../wordBank'; 
import { useNavigate } from 'react-router-dom';
import './Homepage.css';
import Friends from '../Friends/Friends.jsx'; // Import Friends component


const Homepage = ({ language }) => {
  // State to hold the user's first name, loading status, and error messages
  const [firstName, setFirstName] = useState(''); // Stores the user's first name
  const [loading, setLoading] = useState(true); // Manages the loading state while fetching data
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [wordOfTheDay, setWordOfTheDay] = useState(null);

  // useEffect to fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth(); // Initialize Firebase Authentication
      const user = auth.currentUser; // Get the current authenticated user

      if (user) { // Check if a user is logged in
        try {
          // Reference to the user's document in Firestore
          const userDocRef = doc(db, 'users', user.uid);
          // Fetch the user's document from Firestore
          const userDoc = await getDoc(userDocRef);
          // Check if the document exists
          if (userDoc.exists()) {
            const data = userDoc.data(); // Get user data
            // Set the first name from user data or default to 'User'
            setFirstName(data.firstName || 'User');
          } else {
            setError('No user data found');
          }
        } catch (err) {
          setError('Error fetching user data');
        }
      } else {
        setError('No user logged in');
      }
      setLoading(false);
    };

    fetchUserData();

    // Show the popup if it hasn't been shown today
    if (!hasShownPopupToday()) {
      setShowPopup(true);
      setPopupShownToday();
    }
  }, []);

  useEffect(() => {
    // Check local storage for the word of the day for the current language
    const today = new Date().toISOString().split('T')[0];
    const storageKey = `wordOfTheDay_${language}`;
    const storedWordData = JSON.parse(localStorage.getItem(storageKey));

    if (storedWordData && storedWordData.date === today) {
      setWordOfTheDay(storedWordData.word);
    } else {
      const newWord = getRandomWord();
      setWordOfTheDay(newWord);
      localStorage.setItem(storageKey, JSON.stringify({ date: today, word: newWord }));
    }
  }, [language]);

  const getRandomWord = () => {
    const words = language === 'es' ? spanishWords : japaneseWords;
    return words[Math.floor(Math.random() * words.length)];
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleRedirect = (page) => {
    navigate(page);
  };

  const { word, definition, audioSrc } = wordOfTheDay || {};

  return (
    <section className="homepage-container">
      {/* Left Sidebar for Daily Quiz and Lesson Themes */}
      <div className="left-sidebar">
        <button className="circle-button" onClick={() => handleRedirect('/dailyquiz')}>
        Daily Quiz
        </button>
      </div>

      {/* Main Content */}
      <div className="homepage-content">
        <h1 className="welcome-text">Welcome back to Language Link, {firstName}!</h1>
        <p>Here’s what you can do next:</p>
        <button onClick={handleShowPopup}>Show Word of the Day</button>
        {showPopup && wordOfTheDay && <Popup word={word} definition={definition} audioSrc={audioSrc} onClose={handlePopupClose} />}
        <div className="button-container">
          <button className="action-button" onClick={() => handleRedirect('/alpha')}>
            Learn Alphabet
          </button>
          <button className="action-button" onClick={() => handleRedirect('/communities')}>
            Communities
          </button>
        </div>
      </div>

      {/* Right Sidebar for Friend Suggestions 
      <div className="right-sidebar">
        <div className="friend-suggestions">
          <h2>Friend Suggestions</h2>
          <Friends /> {/* Use the Friends component to display friend suggestions }
        </div>
      </div>*/}
    </section>
  );
};

export default Homepage;
