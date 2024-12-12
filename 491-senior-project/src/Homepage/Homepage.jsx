import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
  return (
    <section className="homepage-container">
      <div className="homepage-content">
        <h1>Welcome to LangLink</h1>
        <p>Welcome "Insert Username"!</p>
        <div className="info-boxes">
          <div className="info-box">Box 1: Information</div>
          <div className="info-box">Box 2: Information</div>
          <div className="info-box">Box 3: Information</div>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
