/*Zachary Hunt */
import React, { useState } from 'react';
import './Sentence.css';

const Sentence = () => {
  const [sentence, setSentence] = useState('');

  //Word Bank
  const [words, setWords] = useState([ // Add Words below to be used for word bank
    'test', 'this', 'aint', 'spanish'
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
    <div className="container">
      <h1>Japanese Sentence Builder</h1>
      <p>Phrase actual: {sentence}</p>
      <div>
        {/* displays word bank as a grid of buttons you can click to add to sentence */}
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
  );
};

export default Sentence;
