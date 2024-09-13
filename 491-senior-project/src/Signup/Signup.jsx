import React, { useState } from 'react';
import { auth } from '../firebase'; // Import Firebase auth
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import createUserWithEmailAndPassword
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState(null); // State to handle errors
  const [success, setSuccess] = useState(null); // State to handle success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Firebase function to create a new user
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      setSuccess('Account created successfully!');
      console.log('User signed up:', formData);
    } catch (err) {
      setError(err.message); // Handle errors
      console.error('Error during sign-up:', err.message);
    }
  };

  return (
    <section className="signup-container">
      <div className="signup-content">
        <h1>Sign Up</h1>
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
          {error && <p className="error-message">{error}</p>} {/* Display error message */}
          {success && <p className="success-message">{success}</p>} {/* Display success message */}
          <button type="submit" className="continue-button">Continue</button>
        </form>
      </div>
    </section>
  );
};

export default Signup;