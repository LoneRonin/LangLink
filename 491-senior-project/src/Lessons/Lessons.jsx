// Lessons.jsx

import React from 'react';
import './Lessons.css';

const Lesson = () => {

  return (
    <div className="circles-container">
      <button className="circle-button"></button>
      <button className="circle-button"></button>
      <button className="circle-button"></button>
      <button className="circle-button"></button>
      <button className="circle-button"></button>
      
      {/* Dotted paths */}
      <div className="dotted-path"></div>
      <div className="dotted-path"></div>
      <div className="dotted-path"></div>
      <div className="dotted-path"></div>
      <div className="dotted-path"></div>
      
      {/* Visible lines between dots */}
      <div className="path-line" style={{left: '15px', top: '30px'}}></div>
      <div className="path-line" style={{left: '115px', top: '30px'}}></div>
      <div className="path-line" style={{left: '215px', top: '30px'}}></div>
      <div className="path-line" style={{left: '315px', top: '30px'}}></div>
    </div>
  );
};

export default Lesson;
