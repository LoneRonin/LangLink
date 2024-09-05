import React from 'react';
import './Homepage.css'; // Make sure you create this file

const Homepage = () => {
  return (
    <section className="homepage-container">
      <div className="homepage-content">
        <h1>Welcome to Your Homepage</h1>
        <p>Here is some information and random boxes for your homepage.</p>
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
