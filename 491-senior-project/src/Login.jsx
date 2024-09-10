import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Logic for handling login can be added here
    console.log("Login attempted with:", { email, password });
  };

  return (
    <section className="login-container">
      <div className="login-box">
        {/* Add your website's logo here */}
        <h1 className="logo">LangLink</h1>
        
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
          <button type="submit" className="btn">Login</button>
        </form>

        <div className="login-links">
          <Link to="#" className="forgot-password">Forgot password?</Link>
          <Link to="/signup" className="signup-link">Create new account</Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
