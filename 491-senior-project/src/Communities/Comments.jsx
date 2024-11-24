import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { auth } from '../firebase'; // Import authentication

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch comments in real-time using onSnapshot
  useEffect(() => {
    const commentsCollection = collection(db, `posts/${postId}/comments`);
    const q = query(commentsCollection, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const commentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setComments(commentsData);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, [postId]);

  // Handle submitting a new comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        const user = auth.currentUser;
        let authorName = 'Anonymous'; // Default name

        // Option 1: Use Firebase Authentication displayName
        if (user && user.displayName) {
          authorName = user.displayName;
        }

        // Option 2: Fetch user name from Firestore 'users' collection
        if (user) {
          const userDocRef = doc(db, 'users', user.uid); // Assume 'users' collection holds user data
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            authorName = `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || 'Anonymous';
          }
        }

        const commentData = {
          content: newComment,
          author: authorName, // Store the author's name
          timestamp: serverTimestamp(),
        };

        await addDoc(collection(db, `posts/${postId}/comments`), commentData);
        setNewComment(''); // Clear the comment input field
      } catch (error) {
        console.error("Error adding comment: ", error.message);
      }
    } else {
      alert("Comment cannot be empty!");
    }
  };

  return (
    <div className="comments-section">
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          required
        />
        <button type="submit">Comment</button>
      </form>

      {loading ? (
        <div>Loading comments...</div>
      ) : (
        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div>{comment.content}</div>
                <small>
                  From: {comment.author || 'Anonymous'} on {comment.timestamp?.toDate().toLocaleString()}
                </small>
              </div>
            ))
          ) : (
            <div>No comments yet.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Comments;
