// firebaseUtils.js
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase'; // Adjust the path if needed

// Function to save user progress
export const saveProgress = async (userId, language, progress) => {
  try {
    // Validate progress array
    const validProgress = progress.map(value => value || false); // Replace undefined with false
    await setDoc(doc(db, 'users', userId), { 
      languages: {
        [language]: { progress: validProgress }
      }
    }, { merge: true });
    console.log('Progress saved successfully');
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

// Function to fetch user progress
export const fetchProgress = (userId, language, setProgress) => {
  const docRef = doc(db, 'users', userId);
  const unsubscribe = onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      const progress = data.languages?.[language]?.progress || [];
      setProgress(progress);
    } else {
      console.log('No such document!');
    }
  });

  return unsubscribe;
};

// Local Storage Utility Functions

// Check if the popup has been shown today
export const hasShownPopupToday = () => {
  const lastShownDate = localStorage.getItem('lastPopupDate');
  const today = new Date().toISOString().split('T')[0];
  return lastShownDate === today;
};

// Set the popup as shown for today
export const setPopupShownToday = () => {
  const today = new Date().toISOString().split('T')[0];
  localStorage.setItem('lastPopupDate', today);
};
