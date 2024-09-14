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
  { letter: 'あ', pronunciation: 'a', romanji: 'a' },
  { letter: 'い', pronunciation: 'i', romanji: 'i' },
  { letter: 'う', pronunciation: 'u', romanji: 'u' },
  { letter: 'え', pronunciation: 'e', romanji: 'e' },
  { letter: 'お', pronunciation: 'o', romanji: 'o' },
  { letter: 'か', pronunciation: 'ka', romanji: 'ka' },
  { letter: 'き', pronunciation: 'ki', romanji: 'ki' },
  { letter: 'く', pronunciation: 'ku', romanji: 'ku' },
  { letter: 'け', pronunciation: 'ke', romanji: 'ke' },
  { letter: 'こ', pronunciation: 'ko', romanji: 'ko' },
  { letter: 'さ', pronunciation: 'sa', romanji: 'sa' },
  { letter: 'し', pronunciation: 'shi', romanji: 'shi' },
  { letter: 'す', pronunciation: 'su', romanji: 'su' },
  { letter: 'せ', pronunciation: 'se', romanji: 'se' },
  { letter: 'そ', pronunciation: 'so', romanji: 'so' },
  { letter: 'た', pronunciation: 'ta', romanji: 'ta' },
  { letter: 'ち', pronunciation: 'chi', romanji: 'chi' },
  { letter: 'つ', pronunciation: 'tsu', romanji: 'tsu' },
  { letter: 'て', pronunciation: 'te', romanji: 'te' },
  { letter: 'と', pronunciation: 'to', romanji: 'to' },
  { letter: 'な', pronunciation: 'na', romanji: 'na' },
  { letter: 'に', pronunciation: 'ni', romanji: 'ni' },
  { letter: 'ぬ', pronunciation: 'nu', romanji: 'nu' },
  { letter: 'ね', pronunciation: 'ne', romanji: 'ne' },
  { letter: 'の', pronunciation: 'no', romanji: 'no' },
  { letter: 'は', pronunciation: 'ha', romanji: 'ha' },
  { letter: 'ひ', pronunciation: 'hi', romanji: 'hi' },
  { letter: 'ふ', pronunciation: 'hu', romanji: 'hu' },
  { letter: 'へ', pronunciation: 'he', romanji: 'he' },
  { letter: 'ほ', pronunciation: 'ho', romanji: 'ho' },
  { letter: 'ま', pronunciation: 'ma', romanji: 'ma' },
  { letter: 'み', pronunciation: 'mi', romanji: 'mi' },
  { letter: 'む', pronunciation: 'mu', romanji: 'mu' },
  { letter: 'め', pronunciation: 'me', romanji: 'me' },
  { letter: 'も', pronunciation: 'mo', romanji: 'mo' },
  { letter: 'や', pronunciation: 'ya', romanji: 'ya' },
  { letter: 'ゆ', pronunciation: 'yu', romanji: 'yu' },
  { letter: 'よ', pronunciation: 'yo', romanji: 'yo' },
  { letter: 'ら', pronunciation: 'ra', romanji: 'ra' },
  { letter: 'り', pronunciation: 'ri', romanji: 'ri' },
  { letter: 'る', pronunciation: 'ru', romanji: 'ru' },
  { letter: 'れ', pronunciation: 're', romanji: 're' },
  { letter: 'ろ', pronunciation: 'ro', romanji: 'ro' },
  { letter: 'わ', pronunciation: 'wa', romanji: 'wa' },
  { letter: 'を', pronunciation: 'wo', romanji: 'wo' },
  { letter: 'ん', pronunciation: 'n', romanji: 'n' }
];

const specialHiraganaAlphabet = [
  { letter: 'が', pronunciation: 'ga', romanji: 'ga' },
  { letter: 'ぎ', pronunciation: 'gi', romanji: 'gi' },
  { letter: 'ぐ', pronunciation: 'gu', romanji: 'gu' },
  { letter: 'げ', pronunciation: 'ge', romanji: 'ge' },
  { letter: 'ご', pronunciation: 'go', romanji: 'go' },
  { letter: 'ざ', pronunciation: 'za', romanji: 'za' },
  { letter: 'じ', pronunciation: 'zi', romanji: 'zi' },
  { letter: 'ず', pronunciation: 'zu', romanji: 'zu' },
  { letter: 'ぜ', pronunciation: 'ze', romanji: 'ze' },
  { letter: 'ぞ', pronunciation: 'zo', romanji: 'zo' },
  { letter: 'だ', pronunciation: 'da', romanji: 'da' },
  { letter: 'ぢ', pronunciation: 'di', romanji: 'di' },
  { letter: 'づ', pronunciation: 'du', romanji: 'du' },
  { letter: 'で', pronunciation: 'de', romanji: 'de' },
  { letter: 'ど', pronunciation: 'do', romanji: 'do' },
  { letter: 'ば', pronunciation: 'ba', romanji: 'ba' },
  { letter: 'び', pronunciation: 'bi', romanji: 'bi' },
  { letter: 'ぶ', pronunciation: 'bu', romanji: 'bu' },
  { letter: 'べ', pronunciation: 'be', romanji: 'be' },
  { letter: 'ぼ', pronunciation: 'bo', romanji: 'bo' },
  { letter: 'ぱ', pronunciation: 'pa', romanji: 'pa' },
  { letter: 'ぴ', pronunciation: 'pi', romanji: 'pi' },
  { letter: 'ぷ', pronunciation: 'pu', romanji: 'pu' },
  { letter: 'ぺ', pronunciation: 'pe', romanji: 'pe' },
  { letter: 'ぽ', pronunciation: 'po', romanji: 'po' }
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
              <div className="lowercase">{item.romanji}</div>
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
              <div className="lowercase">{item.romanji}</div>
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
              <div className="lowercase">{item.romanji}</div>
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
              <div className="lowercase">{item.romanji}</div>
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
