// Worked on by: Tristan Clayman, Victor Perez

import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure correct path to firebase.js
import './Homepage.css'; // Optional for styling


const Homepage = () => {
  // State to hold the user's first name, loading status, and error messages
  const [firstName, setFirstName] = useState(''); // Stores the user's first name
  const [loading, setLoading] = useState(true); // Manages the loading state while fetching data
  const [error, setError] = useState(null);

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
