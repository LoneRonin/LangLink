import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlank.css';

const FillInTheBlank = () => {
  const navigate = useNavigate();
  const [hiragana] = useState([
    { hiragana: 'あ', id: 'a', romanji: 'a' },
    { hiragana: 'い', id: 'i', romanji: 'i' },
    { hiragana: 'う', id: 'u', romanji: 'u' },
    { hiragana: 'え', id: 'e', romanji: 'e' },
    { hiragana: 'お', id: 'o', romanji: 'o' },
    { hiragana: 'か', id: 'ka', romanji: 'ka' },
    { hiragana: 'き', id: 'ki', romanji: 'ki' },
    { hiragana: 'く', id: 'ku', romanji: 'ku' },
    { hiragana: 'け', id: 'ke', romanji: 'ke' },
    { hiragana: 'こ', id: 'ko', romanji: 'ko' },
    { hiragana: 'さ', id: 'sa', romanji: 'sa' },
    { hiragana: 'し', id: 'shi', romanji: 'shi' },
    { hiragana: 'す', id: 'su', romanji: 'su' },
    { hiragana: 'せ', id: 'se', romanji: 'se' },
    { hiragana: 'そ', id: 'so', romanji: 'so' },
    { hiragana: 'た', id: 'ta', romanji: 'ta' },
    { hiragana: 'ち', id: 'chi', romanji: 'chi' },
    { hiragana: 'つ', id: 'tsu', romanji: 'tsu' },
    { hiragana: 'て', id: 'te', romanji: 'te' },
    { hiragana: 'と', id: 'to', romanji: 'to' },
    { hiragana: 'な', id: 'na', romanji: 'na' },
    { hiragana: 'に', id: 'ni', romanji: 'ni' },
    { hiragana: 'ぬ', id: 'nu', romanji: 'nu' },
    { hiragana: 'ね', id: 'ne', romanji: 'ne' },
    { hiragana: 'の', id: 'no', romanji: 'no' },
    { hiragana: 'は', id: 'ha', romanji: 'ha' },
    { hiragana: 'ひ', id: 'hi', romanji: 'hi' },
    { hiragana: 'ふ', id: 'hu', romanji: 'hu' },
    { hiragana: 'へ', id: 'he', romanji: 'he' },
    { hiragana: 'ほ', id: 'ho', romanji: 'ho' },
    { hiragana: 'ま', id: 'ma', romanji: 'ma' },
    { hiragana: 'み', id: 'mi', romanji: 'mi' },
    { hiragana: 'む', id: 'mu', romanji: 'mu' },
    { hiragana: 'め', id: 'me', romanji: 'me' },
    { hiragana: 'も', id: 'mo', romanji: 'mo' },
    { hiragana: 'や', id: 'ya', romanji: 'ya' },
    { hiragana: 'ゆ', id: 'yu', romanji: 'yu' },
    { hiragana: 'よ', id: 'yo', romanji: 'yo' },
    { hiragana: 'ら', id: 'ra', romanji: 'ra' },
    { hiragana: 'り', id: 'ri', romanji: 'ri' },
    { hiragana: 'る', id: 'ru', romanji: 'ru' },
    { hiragana: 'れ', id: 're', romanji: 're' },
    { hiragana: 'ろ', id: 'ro', romanji: 'ro' },
    { hiragana: 'わ', id: 'wa', romanji: 'wa' },
    { hiragana: 'を', id: 'wo', romanji: 'wo' },
    { hiragana: 'ん', id: 'n', romanji: 'n' },
    { hiragana: 'が', id: 'ga', romanji: 'ga' },
    { hiragana: 'ぎ', id: 'gi', romanji: 'gi' },
    { hiragana: 'ぐ', id: 'gu', romanji: 'gu' },
    { hiragana: 'げ', id: 'ge', romanji: 'ge' },
    { hiragana: 'ご', id: 'go', romanji: 'go' },
    { hiragana: 'ざ', id: 'za', romanji: 'za' },
    { hiragana: 'じ', id: 'zi', romanji: 'zi' },
    { hiragana: 'ず', id: 'zu', romanji: 'zu' },
    { hiragana: 'ぜ', id: 'ze', romanji: 'ze' },
    { hiragana: 'ぞ', id: 'zo', romanji: 'zo' },
    { hiragana: 'だ', id: 'da', romanji: 'da' },
    { hiragana: 'ぢ', id: 'di', romanji: 'di' },
    { hiragana: 'づ', id: 'du', romanji: 'du' },
    { hiragana: 'で', id: 'de', romanji: 'de' },
    { hiragana: 'ど', id: 'do', romanji: 'do' },
    { hiragana: 'ば', id: 'ba', romanji: 'ba' },
    { hiragana: 'び', id: 'bi', romanji: 'bi' },
    { hiragana: 'ぶ', id: 'bu', romanji: 'bu' },
    { hiragana: 'べ', id: 'be', romanji: 'be' },
    { hiragana: 'ぼ', id: 'bo', romanji: 'bo' },
    { hiragana: 'ぱ', id: 'pa', romanji: 'pa' },
    { hiragana: 'ぴ', id: 'pi', romanji: 'pi' },
    { hiragana: 'ぷ', id: 'pu', romanji: 'pu' },
    { hiragana: 'ぺ', id: 'pe', romanji: 'pe' },
    { hiragana: 'ぽ', id: 'po', romanji: 'po' }
  ]);

  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let correctCount = 0;
    hiragana.forEach((item) => {
      if (answers[item.id] === item.romanji) {
        correctCount++;
      }
    });
    setScore(correctCount);
  };

  const handleBackToAlphabet = () => {
    navigate('/alpha'); // Adjust the path to match your route
  };

  return (
    <div className="fill-in-the-blank-page">
      <h1>Practice Japanese Alphabet</h1>
      <div className="button-container">
        <button onClick={handleBackToAlphabet} className="back-button">
          Back to Learn Alphabet
        </button>
      </div>
      <form onSubmit={handleSubmit} className="hiragana-form">
        <div className="hiragana-container">
            {hiragana.map((item) => (
              <div key={item.id} className="hiragana-row">
                <span className="hiragana-character">{item.hiragana}</span>
                <input
                  type="text"
                  value={answers[item.id] || ''}
                  onChange={(e) => handleChange(item.id, e.target.value)}
                  className="romanji-input"
                />
              </div>
            ))}
          </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {score !== null && (
        <div className="score-display">
          You got {score} out of {hiragana.length} correct!
        </div>
      )}
    </div>
  );
};

export default FillInTheBlank;