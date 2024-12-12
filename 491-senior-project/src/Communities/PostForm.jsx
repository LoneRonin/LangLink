// src/Communities/PostForm.jsx
import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp, doc, getDoc } from 'firebase/firestore';

const PostForm = ({ language, onPostAdded }) => {
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('Anonymous');
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
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
        const collectionName = language === 'Spanish' ? 'spanishPosts' : 'japanesePosts';
        const postData = {
          content,
          timestamp: serverTimestamp(),
          upvotes: 0,
          userId: user.uid,
          author: authorName,
        };

        await addDoc(collection(db, collectionName), postData);
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
