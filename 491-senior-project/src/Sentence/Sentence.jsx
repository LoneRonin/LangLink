import React, { useState } from 'react';
import './Sentence.css';

const Sentence = () => {
  const [sentence, setSentence] = useState('');
  const [words, setWords] = useState([
    'Hola', 'soy', 'un', 'programador', 'que', 'ama', 'React',
    'Me', 'gusta', 'aprender', 'nuevas', 'tecnologías',
    'Estoy', 'creando', 'una', 'actividad', 'interesante',
  ]);

  const addWord = (word) => {
    setSentence(prevSentence => `${prevSentence} ${word}`);
  };

  const resetSentence = () => {
    setSentence('');
  };

  return (
    <div className="container">
      <h1>Spanish Sentence Builder</h1>
      <p>Phrase actual: {sentence}</p>
      <div>
        {words.map((word, index) => (
          <button 
            key={index} 
            onClick={() => addWord(word)} 
            className="button"
          >
            {word}
          </button>
        ))}
      </div>
      <button onClick={resetSentence} className="reset-button">Reset</button>
    </div>
  );
};

export default Sentence;
