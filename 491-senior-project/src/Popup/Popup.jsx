// Popup.jsx
import React from 'react';
import './Popup.css';

const Popup = ({ word, definition, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Word of the Day</h2>
        <p><strong>{word}</strong>: {definition}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
