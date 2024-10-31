import React from 'react';
import './LetterPopup.css';

function LetterPopup({ letter, pronunciation, audioSrc, onClose, onMark }) {
  const playAudio = () => {
    const audio = new Audio(audioSrc);
    audio.play();
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>{letter}</h2>
        <p>Pronunciation: {pronunciation}</p>
        <div className="popup-buttons">
          <button onClick={playAudio}>Play Pronunciation</button>
          <button onClick={onMark}>Mark as Learned</button>
        </div>
      </div>
    </div>
  );
}

export default LetterPopup;