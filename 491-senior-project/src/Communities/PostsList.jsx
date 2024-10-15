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
    <div className="forum-posts-list">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="forum-post">
            {/* Upvote Section */}
            <div className="vote-section">
              <button className="upvote-btn" onClick={() => handleUpvote(post.id)}>
                ↑ {post.upvotes || 0}
              </button>
            </div>

            {/* Post Content Section */}
            <div className="post-content-section">
              <div className="post-header">
                <span className="post-author">Posted by {post.author || 'Anonymous'}</span>
                <span className="post-date">{post.timestamp?.toDate().toLocaleString()}</span>
              </div>

              <div className="post-body">
                <p>{post.content}</p>
              </div>

              <div className="post-footer">
                <button className="comment-btn" onClick={() => toggleComments(post.id)}>
                  💬 {commentsVisible[post.id] ? "Hide Comments" : "View Comments"}
                </button>
              </div>

              {commentsVisible[post.id] && <Comments postId={post.id} />} {/* Render Comments component */}
            </div>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default PostsList;