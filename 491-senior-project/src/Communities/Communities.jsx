import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
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

  return (
    <section className="community-container">
      <div className="community-header">
        <h1>Welcome to the {language === 'Spanish' ? 'Spanish' : 'Japanese'} Community, {firstName}!</h1>
      </div>
    </section>
  );
};

export default Communities;