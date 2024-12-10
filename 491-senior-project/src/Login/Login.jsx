import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase'; // Import auth and db
// Worked on by: Tristan Clayman, Victor Perez

import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebase sign-in
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { doc, getDoc, setDoc, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore'; // Firestore functions
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState(""); // State to store the user's email
  const [password, setPassword] = useState(""); // State to store the user's password
  const [loginSuccess, setLoginSuccess] = useState(false); // State for login success
  const [error, setError] = useState(null); // State for login errors
  const navigate = useNavigate(); // Initialize useNavigate

  // This effect will run when the user logs in
  useEffect(() => {
    if (loginSuccess) {
      const checkAndAddNotification = async () => {
        const user = auth.currentUser;
        if (user) {
          // Reference to the user's document in Firestore
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          const userData = userDoc.data();

          if (userData && !userData.quizCompleted) {
            // Add a notification if the quiz is not completed
            await addDoc(collection(db, 'users', user.uid, 'notifications'), {
              message: 'Reminder: Start your daily quiz!',
              timestamp: new Date(),
            });
          } else {
            // Remove notification if the quiz is completed
            const notificationsQuery = collection(db, 'users', user.uid, 'notifications');
            const snapshot = await getDocs(notificationsQuery);
            snapshot.forEach(async (doc) => {
              await deleteDoc(doc.ref);
            });
          }
        }
      };

      checkAndAddNotification();
    }
  }, [loginSuccess]); // This runs when loginSuccess is true

  // Handle the login process when the form is submitted
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Try to sign in with Firebase auth
      await signInWithEmailAndPassword(auth, email, password);
      setLoginSuccess(true); // Set success state
      setError(null); // Clear any previous error
      console.log("Login successful:", { email });
      navigate('/homepage'); // Redirect to homepage after successful login
    } catch (err) {
      setLoginSuccess(false); // Reset success state
      setError("Invalid email or password"); // Set error message
    }
  };

  return (
    <section className={`login-container ${loginSuccess ? 'login-success' : ''}`}>
      <div className="login-box">
        <h1 className="logo">Welcome back to LangLink!</h1>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">Log In</button>
        </form>

        {error && <p className="error-message">{error}</p>} {/* Error message */}
        {loginSuccess && <p className="success-message">Login successful!</p>} {/* Success message */}

        <div className="login-links">
          <a href="#" className="forgot-password">Forgot password?</a>
          <a href="/signup" className="signup-link">Create new account</a>
        </div>
      </div>
    </section>
  );
};

export default Login;
