import React from 'react';
import './LetterPopup.css';

function LetterPopup({ letter, pronunciation, onClose, onMark }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>{letter}</h2>
        <p>Pronunciation: {pronunciation}</p>
        <div className="popup-buttons">
          <button onClick={onMark}>Mark as Learned</button>
        </div>
      </div>
    </div>
  );
}

export default LetterPopup;
