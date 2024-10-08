// Worked on by: Tristan Clayman

import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import PostForm from './PostForm';
import PostsList from './PostsList';
import { db } from '../firebase';
import './Communities.css';


const Communities = () => {
  const [firstName, setFirstName] = useState('');
  const [language, setLanguage] = useState('');
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setFirstName(data.firstName || 'User');
          setLanguage(data.language || '');
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
      <h1 className="community-header">Welcome to the {language === 'Spanish' ? 'Spanish' : 'Japanese'} Community, {firstName}!</h1>
      <p className="community-message">Feel free to share your thoughts and upvote!</p>

      {/* Post submission form */}
      <PostForm onPostAdded={handlePostAdded} />

      {/* List of posts */}
      <PostsList />
    </div>
  );
};

export default Communities;