import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure correct path to firebase.js
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Homepage.css'; // Import the updated CSS for styling

const Homepage = () => {
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

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
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleRedirect = (page) => {
    // Use navigate to programmatically change routes
    navigate(page);
  };

  const dummyFriends = [
    { name: 'John Doe', flag: '🇺🇸' },
    { name: 'Jane Smith', flag: '🇬🇧' },
    { name: 'Carlos Diaz', flag: '🇲🇽' }
  ];

  return (
    <section className="homepage-container">
      {/* Left Sidebar for Daily Quiz and Lesson Themes */}
      <div className="left-sidebar">
        <button className="circle-button" onClick={() => handleRedirect('/daily-quiz')}>
          Daily Quiz
        </button>
        <button className="circle-button" onClick={() => handleRedirect('/lesson-themes')}>
          Lesson Themes
        </button>
      </div>

      {/* Main Content */}
      <div className="homepage-content">
        <h1 className="welcome-text">Welcome back to Language Link, {firstName}!</h1>
        <p>Here’s what you can do next:</p>
        <div className="button-container">
          <button className="action-button" onClick={() => handleRedirect('/conjugate')}>
            Learn Spanish Grammar
          </button>
          <button className="action-button" onClick={() => handleRedirect('/alpha')}>
            Learn Alphabet
          </button>
          <button className="action-button" onClick={() => handleRedirect('/communities')}>
            Communities
          </button>
        </div>
      </div>

      {/* Right Sidebar for Friend Suggestions */}
      <div className="right-sidebar">
        <div className="friend-suggestions">
          <h2>Friend Suggestions</h2>
          {dummyFriends.map((friend, index) => (
            <div className="friend" key={index}>
              <div className="friend-info">
                <p>{friend.name}</p>
                <span>{friend.flag}</span>
              </div>
              <div className="friend-actions">
                <button className="action-button small">Add</button>
                <button className="action-button small">Deny</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Homepage;
