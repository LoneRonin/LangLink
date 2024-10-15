// Worked on by: Tristan Clayman

import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import PostForm from './PostForm';
import PostsList from './PostsList';
import { db } from '../firebase';
import './Communities.css';

// State to hold the user's first name and selected language
const Communities = () => {
  const [firstName, setFirstName] = useState(''); // Stores the user's first name
  const [language, setLanguage] = useState(''); // Stores the user's selected language
  const auth = getAuth(); // Initialize Firebase Authentication
  const user = auth.currentUser; // Get the currently authenticated user

  // useEffect to fetch user data when the component mounts or when the user changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) { // Check if the user is logged in
        // Reference to the user's document in Firestore
        const userDocRef = doc(db, 'users', user.uid);
        // Fetch the user's document from Firestore
        const userDoc = await getDoc(userDocRef); 
        if (userDoc.exists()) { // Check if the document exists
          const data = userDoc.data(); // Retrieve user data
          setFirstName(data.firstName || 'User'); // Set the first name or default to 'User'
          setLanguage(data.language || ''); // Set the language
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handlePostAdded = () => {
    // Any additional logic you want to run after a post is added
  };

  return (
    <div className="community-container">
      <h1 className="community-header">Welcome to the {language === 'Spanish' ? 'Spanish' : 'Japanese'} Community, {firstName}.</h1>
      <p className="community-message">Feel free to share your thoughts and upvote!</p>

      {/* Post submission form */}
      <PostForm onPostAdded={handlePostAdded} />

      {/* List of posts */}
      <PostsList />
    </div>
  );
};

export default Communities;