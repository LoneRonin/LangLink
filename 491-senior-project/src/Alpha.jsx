import React, { useState } from 'react';
import './Alpha.css';
import LetterPopup from './LetterPopup';

// Define the Spanish alphabet with letters and pronunciations
const spanishAlphabet = [
  { letter: 'A', pronunciation: 'ah' },
  { letter: 'B', pronunciation: 'beh' },
  { letter: 'C', pronunciation: 'seh' },
  { letter: 'D', pronunciation: 'deh' },
  { letter: 'E', pronunciation: 'eh' },
  { letter: 'F', pronunciation: 'EH-feh' },
  { letter: 'G', pronunciation: 'hheh' },
  { letter: 'H', pronunciation: 'AH-cheh' },
  { letter: 'I', pronunciation: 'ee' },
  { letter: 'J', pronunciation: 'HHOH-tah' },
  { letter: 'K', pronunciation: 'kah' },
  { letter: 'L', pronunciation: 'EH-leh' },
  { letter: 'M', pronunciation: 'EH-meh' },
  { letter: 'N', pronunciation: 'EH-neh' },
  { letter: 'Ñ', pronunciation: 'EH-nyeh' },
  { letter: 'O', pronunciation: 'oh' },
  { letter: 'P', pronunciation: 'peh' },
  { letter: 'Q', pronunciation: 'koo' },
  { letter: 'R', pronunciation: 'EH-rreh' },
  { letter: 'S', pronunciation: 'EH-seh' },
  { letter: 'T', pronunciation: 'teh' },
  { letter: 'U', pronunciation: 'oo' },
  { letter: 'V', pronunciation: 'veh' },
  { letter: 'W', pronunciation: 'DOH-bleh-vey' },
  { letter: 'X', pronunciation: 'EH-kees' },
  { letter: 'Y', pronunciation: 'yay' },
  { letter: 'Z', pronunciation: 'ZEH-tah' }
];

function Alpha() {
  const [showPopups, setShowPopups] = useState(Array(spanishAlphabet.length).fill(false));
  const [markedLetters, setMarkedLetters] = useState(Array(spanishAlphabet.length).fill(false));

  // Calculate progress
  const totalLetters = spanishAlphabet.length;
  const learnedLetters = markedLetters.filter(Boolean).length;
  const progressPercentage = Math.round((learnedLetters / totalLetters) * 100);

  const handleLetterClick = (index) => {
    setShowPopups(prev => prev.map((_, i) => i === index));
  };

  const handleClosePopup = () => {
    setShowPopups(prev => prev.map(() => false));
  };

  const handleMarkLetter = (index) => {
    setMarkedLetters(prev => [...prev.slice(0, index), true, ...prev.slice(index + 1)]);
    handleClosePopup();
  };

  return (
    <div className="alpha-container">
      <h1>Learn Spanish Alphabet</h1>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}>
          {progressPercentage}%
        </div>
      </div>
      <div className="letter-grid">
        {spanishAlphabet.map((item, index) => (
          <React.Fragment key={index}>
            <div
              className={`letter-card ${markedLetters[index] ? 'green' : ''}`}
              onClick={() => handleLetterClick(index)}
            >
              <div className="uppercase">{item.letter}</div>
              <div className="lowercase">{item.letter.toLowerCase()}</div>
            </div>
            {showPopups[index] && (
              <LetterPopup 
                letter={item.letter} 
                pronunciation={item.pronunciation} 
                onClose={handleClosePopup}
                onMark={() => handleMarkLetter(index)}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Alpha;