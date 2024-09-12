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

const specialspanishCharacters = [
  { letter: 'á', pronunciation: 'a with acute' },
  { letter: 'é', pronunciation: 'e with acute' },
  { letter: 'í', pronunciation: 'i with acute' },
  { letter: 'ó', pronunciation: 'o with acute' },
  { letter: 'ú', pronunciation: 'u with acute' },
  { letter: 'ü', pronunciation: 'u with diaeresis' }
];

const hiriganaAlphabet = [
  { letter: 'あ', pronunciation: 'a' },
  { letter: 'い', pronunciation: 'i' },
  { letter: 'う', pronunciation: 'u' },
  { letter: 'え', pronunciation: 'e' },
  { letter: 'お', pronunciation: 'o' },
  { letter: 'か', pronunciation: 'ka' },
  { letter: 'き', pronunciation: 'ki' },
  { letter: 'く', pronunciation: 'ku' },
  { letter: 'け', pronunciation: 'ke' },
  { letter: 'こ', pronunciation: 'ko' },
  { letter: 'さ', pronunciation: 'sa' },
  { letter: 'し', pronunciation: 'shi' },
  { letter: 'す', pronunciation: 'su' },
  { letter: 'せ', pronunciation: 'se' },
  { letter: 'そ', pronunciation: 'so' },
  { letter: 'た', pronunciation: 'ta' },
  { letter: 'ち', pronunciation: 'chi' },
  { letter: 'つ', pronunciation: 'tsu' },
  { letter: 'て', pronunciation: 'te' },
  { letter: 'と', pronunciation: 'to' },
  { letter: 'な', pronunciation: 'na' },
  { letter: 'に', pronunciation: 'ni' },
  { letter: 'ぬ', pronunciation: 'nu' },
  { letter: 'ね', pronunciation: 'ne' },
  { letter: 'の', pronunciation: 'no' },
  { letter: 'は', pronunciation: 'ha' },
  { letter: 'ひ', pronunciation: 'hi' },
  { letter: 'ふ', pronunciation: 'hu' },
  { letter: 'へ', pronunciation: 'he' },
  { letter: 'ほ', pronunciation: 'ho' },
  { letter: 'ま', pronunciation: 'ma' },
  { letter: 'み', pronunciation: 'mi' },
  { letter: 'む', pronunciation: 'mu' },
  { letter: 'め', pronunciation: 'me' },
  { letter: 'も', pronunciation: 'mo' },
  { letter: 'や', pronunciation: 'ya' },
  { letter: 'ゆ', pronunciation: 'yu' },
  { letter: 'よ', pronunciation: 'yo' },
  { letter: 'ら', pronunciation: 'ra' },
  { letter: 'り', pronunciation: 'ri' },
  { letter: 'る', pronunciation: 'ru' },
  { letter: 'れ', pronunciation: 're' },
  { letter: 'ろ', pronunciation: 'ro' },
  { letter: 'わ', pronunciation: 'wa' },
  { letter: 'を', pronunciation: 'wo' },
  { letter: 'ん', pronunciation: 'n' }
];


function Alpha() {
  const [showPopups, setShowPopups] = useState(Array(spanishAlphabet.length + specialspanishCharacters.length).fill(false));
  const [markedLetters, setMarkedLetters] = useState(Array(spanishAlphabet.length + specialspanishCharacters.length).fill(false));

  const totalLetters = spanishAlphabet.length + specialspanishCharacters.length;
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
        {specialspanishCharacters.map((item, index) => (
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
