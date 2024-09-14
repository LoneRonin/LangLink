import React, { useState } from 'react';
import './Conjugate.css';

const exercises = [
  {
    word: 'hablar',
    definition: 'to talk',
    tense: 'Simple Present',
    pronoun: 'Él: He',
    correctAnswer: 'habla',
    options: ['habla', 'hablo', 'habler', 'hablos']
  },
  {
    word: 'comer',
    definition: 'to eat',
    tense: 'Simple Present',
    pronoun: 'Ella: She',
    correctAnswer: 'come',
    options: ['come', 'comer', 'comes', 'comemos']
  },
  {
    word: 'vivir',
    definition: 'to live',
    tense: 'Simple Present',
    pronoun: 'Nosotros: We',
    correctAnswer: 'vivimos',
    options: ['vive', 'vivimos', 'vivo', 'viven']
  },
  // Add more exercises as needed
];

const Conjugate = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  const currentExercise = exercises[currentExerciseIndex];

  const handleButtonClick = (answer) => {
    if (answer === currentExercise.correctAnswer) {
      setIsCorrect(true);
      setTimeout(() => {
        setIsCorrect(false);
        // Move to the next exercise
        setCurrentExerciseIndex((prevIndex) => (prevIndex + 1) % exercises.length);
      }, 500); // Green flash will disappear after 500ms
    } else {
      setIsWrong(true);
      setTimeout(() => {
        setIsWrong(false);
      }, 500); // Red flash will disappear after 500ms
    }
 
    
  
};
return (
  <div className="grammar-container">
    <h1>Conjugate Practice</h1>
    <h2>{currentExercise.word}: {currentExercise.definition}</h2>
    <h2>Tense: {currentExercise.tense}</h2>
    <h2>{currentExercise.pronoun}</h2>

    <div className="grammar-buttons">
      {currentExercise.options.map((option) => (
        <button key={option} onClick={() => handleButtonClick(option)}>
          {option}
        </button>
      ))}
    </div>

    {isCorrect && (
      <div className="correct-message">
        Correct!
      </div>
    )}
    {isWrong && (
      <div className="incorrect-message">
        Incorrect!
      </div>
    )}
  </div>
);
};
export default Conjugate;
