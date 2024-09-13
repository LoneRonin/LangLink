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

const specialSpanishCharacters = [
  { letter: 'á', pronunciation: 'a with acute' },
  { letter: 'é', pronunciation: 'e with acute' },
  { letter: 'í', pronunciation: 'i with acute' },
  { letter: 'ó', pronunciation: 'o with acute' },
  { letter: 'ú', pronunciation: 'u with acute' },
  { letter: 'ü', pronunciation: 'u with diaeresis' }
];

const hiraganaAlphabet = [
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

const specialHiraganaAlphabet = [
  { letter: 'が', pronunciation: 'ga' },
  { letter: 'ぎ', pronunciation: 'gi' },
  { letter: 'ぐ', pronunciation: 'gu' },
  { letter: 'げ', pronunciation: 'ge' },
  { letter: 'ご', pronunciation: 'go' },
  { letter: 'ざ', pronunciation: 'za' },
  { letter: 'じ', pronunciation: 'zi' },
  { letter: 'ず', pronunciation: 'zu' },
  { letter: 'ぜ', pronunciation: 'ze' },
  { letter: 'ぞ', pronunciation: 'zo' },
  { letter: 'だ', pronunciation: 'da' },
  { letter: 'ぢ', pronunciation: 'di' },
  { letter: 'づ', pronunciation: 'du' },
  { letter: 'で', pronunciation: 'de' },
  { letter: 'ど', pronunciation: 'do' },
  { letter: 'ば', pronunciation: 'ba' },
  { letter: 'び', pronunciation: 'bi' },
  { letter: 'ぶ', pronunciation: 'bu' },
  { letter: 'べ', pronunciation: 'be' },
  { letter: 'ぼ', pronunciation: 'bo' },
  { letter: 'ぱ', pronunciation: 'pa' },
  { letter: 'ぴ', pronunciation: 'pi' },
  { letter: 'ぷ', pronunciation: 'pu' },
  { letter: 'ぺ', pronunciation: 'pe' },
  { letter: 'ぽ', pronunciation: 'po' }
];

function Alpha({ language }) {
  // Determine the alphabet and special characters based on the selected language
  const alphabet = language === 'es' ? spanishAlphabet : hiraganaAlphabet;
  const specialCharacters = language === 'es' ? specialSpanishCharacters : specialHiraganaAlphabet;

  // State to manage popups
  const [showPopups, setShowPopups] = useState(Array(alphabet.length + specialCharacters.length).fill(false));

  // State to manage marked letters for each language separately
  const [markedLetters, setMarkedLetters] = useState({
    es: Array(spanishAlphabet.length + specialSpanishCharacters.length).fill(false),
    jp: Array(hiraganaAlphabet.length + specialHiraganaAlphabet.length).fill(false),
  });

  // Calculate progress based on the current language
  const totalLetters = alphabet.length + specialCharacters.length;
  const learnedLetters = markedLetters[language].filter(Boolean).length;
  const progressPercentage = Math.round((learnedLetters / totalLetters) * 100);

  const columns = 8;

  // Full rows and leftovers for the main alphabet
  const fullRows = alphabet.slice(0, Math.floor(alphabet.length / columns) * columns);
  const leftovers = alphabet.slice(Math.floor(alphabet.length / columns) * columns);

  // Full rows and leftovers for the special characters
  const specialFullRows = specialCharacters.slice(0, Math.floor(specialCharacters.length / columns) * columns);
  const specialLeftovers = specialCharacters.slice(Math.floor(specialCharacters.length / columns) * columns);

  // Handle letter click to show popup
  const handleLetterClick = (index) => {
    setShowPopups(prev => prev.map((_, i) => i === index));
  };

  // Close popup
  const handleClosePopup = () => {
    setShowPopups(prev => prev.map(() => false));
  };

  // Mark letter as learned for the current language
  const handleMarkLetter = (index) => {
    setMarkedLetters(prev => ({
      ...prev,
      [language]: [...prev[language].slice(0, index), true, ...prev[language].slice(index + 1)],
    }));
    handleClosePopup();
  };

  return (
    <div className="alpha-container">
      <h1>{language === 'es' ? 'Learn Spanish Alphabet' : 'Learn Japanese Hiragana'}</h1>
      
      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}>
          {progressPercentage}%
        </div>
      </div>

      {/* Full Rows Grid for Main Alphabet */}
      <div className="letter-grid">
        {fullRows.map((item, index) => (
          <React.Fragment key={index}>
            <div
              className={`letter-card ${markedLetters[language][index] ? 'green' : ''}`}
              onClick={() => handleLetterClick(index)}
            >
              <div className="uppercase">{item.letter}</div>
              <div className="lowercase">{item.pronunciation}</div>
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

      {/* Leftover Items Grid for Main Alphabet */}
      <div className="leftover-grid">
        {leftovers.map((item, index) => (
          <React.Fragment key={index + fullRows.length}>
            <div
              className={`letter-card ${markedLetters[language][index + fullRows.length] ? 'green' : ''}`}
              onClick={() => handleLetterClick(index + fullRows.length)}
            >
              <div className="uppercase">{item.letter}</div>
              <div className="lowercase">{item.pronunciation}</div>
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
        {/* Full Rows for Special Characters */}
        {specialFullRows.map((item, index) => (
          <React.Fragment key={index + alphabet.length}>
            <div
              className={`letter-card ${markedLetters[language][index + alphabet.length] ? 'green' : ''}`}
              onClick={() => handleLetterClick(index + alphabet.length)}
            >
              <div className="uppercase">{item.letter}</div>
              <div className="lowercase">{item.pronunciation}</div>
            </div>
            {showPopups[index + alphabet.length] && (
              <LetterPopup 
                letter={item.letter} 
                pronunciation={item.pronunciation} 
                onClose={handleClosePopup}
                onMark={() => handleMarkLetter(index + alphabet.length)}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Leftover Items Grid for Special Characters */}
      <div className="leftover-grid">
        {specialLeftovers.map((item, index) => (
          <React.Fragment key={index + alphabet.length + specialFullRows.length}>
            <div
              className={`letter-card ${markedLetters[language][index + alphabet.length + specialFullRows.length] ? 'green' : ''}`}
              onClick={() => handleLetterClick(index + alphabet.length + specialFullRows.length)}
            >
              <div className="uppercase">{item.letter}</div>
              <div className="lowercase">{item.pronunciation}</div>
            </div>
            {showPopups[index + alphabet.length + specialFullRows.length] && (
              <LetterPopup 
                letter={item.letter} 
                pronunciation={item.pronunciation} 
                onClose={handleClosePopup}
                onMark={() => handleMarkLetter(index + alphabet.length + specialFullRows.length)}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Alpha;
