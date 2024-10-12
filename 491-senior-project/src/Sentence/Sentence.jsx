/*Zachary Hunt */
import React, { useState } from 'react';
import './Sentence.css';
import { useNavigate } from 'react-router-dom';

const Sentence = () => {
  const navigate = useNavigate();
  const [sentence, setSentence] = useState('');

  //Word Bank
  const [words, setWords] = useState([ // Add Words below to be used for word bank
    'Hola', 'soy', 'un', 'programador', 'que', 'ama', 'React',
    'Me', 'gusta', 'aprender', 'nuevas', 'tecnologías',
    'Estoy', 'creando', 'una', 'actividad', 'interesante',
  ]);

  // function for adding words to a sentence
  const addWord = (word) => {
    setSentence(prevSentence => `${prevSentence} ${word}`);
  };

  // function for removing all words from sentence created
  const resetSentence = () => {
    setSentence('');
  };
  
  // return buttons, and text for sentence builder
  return (
    <div>
      {/* Back to Grammar Button */}
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate('/grammar')}>
          Back to Grammar
        </button>
      </div>

      <div className="container">
        <h1>Spanish Sentence Builder</h1>
        <p>Phrase actual: {sentence}</p>
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
        <button onClick={resetSentence} className="reset-button">Reset</button>
      </div>
    </div>
  );
};

export default Sentence;
