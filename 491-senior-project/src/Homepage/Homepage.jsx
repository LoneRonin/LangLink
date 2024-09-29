import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure correct path to firebase.js
import './Homepage.css'; // Optional for styling

const Homepage = () => {
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <section className="homepage-container">
      <div className="homepage-content">
        <h1 className="welcome-text">Welcome back to Language Link, {firstName}!</h1>
        <p>Here’s what’s new:</p>
        {/* Add more content or components here */}
      </div>
    </section>
  );
};

export default Homepage;
