import React from 'react';
import './Popup.css';

const Popup = ({ word, definition, audioSrc, onClose }) => {
  const playAudio = () => {
    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.play();
    } else {
      console.error('Audio source not available');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Word of the Day</h2>
        <p><strong>{word}</strong>: {definition}</p>
        <button onClick={playAudio}>Play Pronunciation</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
