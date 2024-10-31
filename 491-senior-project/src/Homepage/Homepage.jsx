import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; 
import Popup from '../Popup/Popup.jsx'; 
import { hasShownPopupToday, setPopupShownToday } from '../firebaseUtils'; 
import { spanishWords, japaneseWords } from '../wordBank'; 
import './Homepage.css'; // Optional for styling

const Homepage = ({ language }) => {
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const data = userDoc.data();
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

  const { word, definition } = getRandomWord();

  return (
    <section className="homepage-container">
      <div className="homepage-content">
        <h1 className="welcome-text">Welcome back to Language Link, {firstName}!</h1>
        <p>Here’s what’s new:</p>
        <button onClick={handleShowPopup}>Show Word of the Day</button>
        {showPopup && <Popup word={word} definition={definition} onClose={handlePopupClose} />}
        {/* Add more content or components here */}
      </div>
    </section>
  );
};

export default Homepage;
