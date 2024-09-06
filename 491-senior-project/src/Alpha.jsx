import React, { useState } from 'react';
import './Alpha.css';
import LetterPopup from './LetterPopup';

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

const specialCharacters = [
  { letter: 'á', pronunciation: 'a with acute' },
  { letter: 'é', pronunciation: 'e with acute' },
  { letter: 'í', pronunciation: 'i with acute' },
  { letter: 'ó', pronunciation: 'o with acute' },
  { letter: 'ú', pronunciation: 'u with acute' },
  { letter: 'ü', pronunciation: 'u with diaeresis' }
];

function Alpha() {
  const [showPopups, setShowPopups] = useState(Array(spanishAlphabet.length + specialCharacters.length).fill(false));
  const [markedLetters, setMarkedLetters] = useState(Array(spanishAlphabet.length + specialCharacters.length).fill(false));

  const totalLetters = spanishAlphabet.length + specialCharacters.length;
  const learnedLetters = markedLetters.filter(Boolean).length;
  const progressPercentage = Math.round((learnedLetters / totalLetters) * 100);

  const columns = 8;

  const fullRows = spanishAlphabet.slice(0, Math.floor(spanishAlphabet.length / columns) * columns);
  const leftovers = spanishAlphabet.slice(Math.floor(spanishAlphabet.length / columns) * columns);

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

      {/* Full Rows Grid */}
      <div className="letter-grid">
        {fullRows.map((item, index) => (
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

      {/* Leftover Items Grid */}
      <div className="leftover-grid">
        {leftovers.map((item, index) => (
          <React.Fragment key={index + fullRows.length}>
            <div
              className={`letter-card ${markedLetters[index + fullRows.length] ? 'green' : ''}`}
              onClick={() => handleLetterClick(index + fullRows.length)}
            >
              <div className="uppercase">{item.letter}</div>
              <div className="lowercase">{item.letter.toLowerCase()}</div>
            </div>
            {showPopups[index + fullRows.length] && (
              <LetterPopup 
                letter={item.letter} 
                pronunciation={item.pronunciation} 
                onClose={handleClosePopup}
                onMark={() => handleMarkLetter(index + fullRows.length)}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Special Characters Section */}
      <h2>Special Characters</h2>
      <div className="special-characters-grid">
        {specialCharacters.map((item, index) => (
          <React.Fragment key={index + spanishAlphabet.length}>
            <div
              className={`letter-card ${markedLetters[index + spanishAlphabet.length] ? 'green' : ''}`}
              onClick={() => handleLetterClick(index + spanishAlphabet.length)}
            >
              <div className="uppercase">{item.letter}</div>
              <div className="lowercase">{item.letter.toLowerCase()}</div>
            </div>
            {showPopups[index + spanishAlphabet.length] && (
              <LetterPopup 
                letter={item.letter} 
                pronunciation={item.pronunciation} 
                onClose={handleClosePopup}
                onMark={() => handleMarkLetter(index + spanishAlphabet.length)}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Alpha;
