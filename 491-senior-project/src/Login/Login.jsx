import React, { useState } from 'react';
import { auth } from '../firebase'; // Import auth
import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebase sign-in
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false); // State for login success
  const [error, setError] = useState(null); // State for login errors
  const navigate = useNavigate(); // Initialize useNavigate

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
    <section className={`login-container ${loginSuccess ? 'login-success' : ''}`}> {/* Add success class on success */}
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