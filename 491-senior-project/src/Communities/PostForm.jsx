// src/Communities/PostForm.jsx
import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp, doc, getDoc } from 'firebase/firestore';

const PostForm = ({ onPostAdded }) => {
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('Anonymous'); // Default author name
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          // Set the author's name to the user's first and last name
          setAuthorName(`${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Anonymous');
        }
      }
    };

    fetchUserName();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim() && user) {
      try {
        const postData = {
          content,
          timestamp: serverTimestamp(),
          upvotes: 0,
          userId: user.uid,
          author: authorName, // Use fetched author name
        };

        await addDoc(collection(db, 'posts'), postData);
        setContent('');
        onPostAdded();
      } catch (error) {
        console.error("Error adding post: ", error.message);
        alert("Failed to add post. Try again.");
      }
    } else {
      alert("Content cannot be empty or you are not logged in!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your post..."
        required
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
