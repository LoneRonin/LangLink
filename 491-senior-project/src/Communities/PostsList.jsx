import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, increment } from 'firebase/firestore';
import Comments from './Comments'; // Import Comments component
import './PostsList.css'; // Import CSS

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentsVisible, setCommentsVisible] = useState({}); // Track visibility of comments

  useEffect(() => {
    const postsCollection = collection(db, 'posts');
    const q = query(postsCollection, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(postsData);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  const handleUpvote = async (postId) => {
    try {
      const postDocRef = doc(db, 'posts', postId);
      await updateDoc(postDocRef, { upvotes: increment(1) });
    } catch (error) {
      console.error("Error upvoting post: ", error.message);
    }
  };

  const toggleComments = (postId) => {
    setCommentsVisible((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="posts-list">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-content">
              <p>{post.content}</p>
              <div className="post-meta">
                <small>Posted by {post.author || 'Anonymous'} on {post.timestamp?.toDate().toLocaleString()}</small>
                <div className="post-actions">
                  <button className="upvote-btn" onClick={() => handleUpvote(post.id)}>↑ {post.upvotes || 0}</button>
                  <button className="comment-btn" onClick={() => toggleComments(post.id)}>💬 View Comments</button>
                </div>
              </div>
            </div>
            {commentsVisible[post.id] && <Comments postId={post.id} />} {/* Render Comments component */}
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default PostsList;
