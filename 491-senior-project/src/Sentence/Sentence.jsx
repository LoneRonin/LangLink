import React, { useState } from 'react';
import './Sentence.css';
import { useNavigate } from 'react-router-dom';

const Sentence = ({ language }) => {
  const navigate = useNavigate();
  const [sentence, setSentence] = useState('');

  // Word Banks for Spanish and Japanese
  const spanishWords = [
    'Hola', 'soy', 'un', 'programador', 'que', 'ama', 'React',
    'Me', 'gusta', 'aprender', 'nuevas', 'tecnologías',
    'Estoy', 'creando', 'una', 'actividad', 'interesante',
  ];

  const japaneseWords = [
    'こんにちは', '私は', 'プログラマー', 'です', 'React', 'が', '好きです',
    '新しい', '技術', 'を', '学ぶ', 'のが', '好きです',
    '面白い', '活動', 'を', '作っています',
  ];

  // Determine the current word bank based on the language
  const words = language === 'es' ? spanishWords : japaneseWords;

  // Function for adding words to a sentence
  const addWord = (word) => {
    setSentence(prevSentence => `${prevSentence} ${word}`);
  };

  // Function for removing all words from the sentence
  const resetSentence = () => {
    setSentence('');
  };

  // Return buttons and text for sentence builder
  return (
    <div>
      {/* Back to Grammar Button */}
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate('/grammar')}>
          Back to Grammar
        </button>
        <button className="back-button" onClick={() => navigate('/lessons')}>
          Back to Lessons
        </button>
      </div>

      <div className=".sentence-container">
        <h1>{language === 'es' ? 'Spanish Sentence Builder' : 'Japanese Sentence Builder'}</h1>
        <h1>Current Sentence: {sentence}</h1>
        <div>
          {/* Displays word bank as a grid of buttons you can click to add to sentence */}
          {words.map((word, index) => (
            <button 
              key={index} 
              onClick={() => addWord(word)} 
              className="button" >
              {word}
            </button>
          ))}
        </div>
        {/* Reset sentence button */}
        <div className="resetbtnsent-container"><button onClick={resetSentence} className="reset-button">Reset</button></div>
        
      </div>
    </div>
  );
};

export default Sentence;
