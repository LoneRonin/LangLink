// Worked on by: Tristan Clayman, Victor Perez

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { arrayUnion, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Ensure correct path to firebase.js
import './Signup.css';

const Signup = () => {
  // State to store form data (first name, last name, email, password)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handles changes in form input fields and updates formData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handles form submission, creating user account and storing data in Firestore
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    const { firstName, lastName, email, password } = formData;

    try {
      // Create user with email and password in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Retrieve the user object

      // Store user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        displayName,
        email,
        language: '', // Default empty language to be selected later
        isDisabled: false,
      });

      // Add a welcome notification in the 'notifications' subcollection
      await setDoc(doc(db, 'users', user.uid, 'notifications', 'welcome'), {
        type: 'welcome',
        message: `Welcome to the app, ${firstName}! We're glad to have you here.`,
        timestamp: new Date(),
        read: false, // Notification is unread by default
      });

      await setDoc(doc(db, "userchats", user.uid), {
        chats:"",
      });

      // Redirect to language selection page
      navigate('/language-selection');
    } catch (error) {
      console.error("Error signing up:", error);
      setError('Failed to create account. Please try again.');
    }
  };

  return (
    <section className="signup-container">
      <div className="signup-content">
        <h1>Sign Up</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="continue-button">Continue</button>
        </form>
      </div>
    </section>
  );
};

export default Signup;
