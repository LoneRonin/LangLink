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
  {
    word: 'estudiar',
    definition: 'to study',
    tense: 'Simple Present',
    pronoun: 'Tú: You',
    correctAnswer: 'estudias',
    options: ['estudio', 'estudias', 'estudia', 'estudiamos']
  },
  {
    word: 'trabajar',
    definition: 'to work',
    tense: 'Simple Present',
    pronoun: 'Ellas: They',
    correctAnswer: 'trabajan',
    options: ['trabajo', 'trabajas', 'trabaja', 'trabajan']
  },
  {
    word: 'viajar',
    definition: 'to travel',
    tense: 'Simple Present',
    pronoun: 'Ustedes: You all',
    correctAnswer: 'viajan',
    options: ['viajo', 'viajas', 'viaja', 'viajan']
  },
  {
    word: 'leer',
    definition: 'to read',
    tense: 'Simple Present',
    pronoun: 'Yo: I',
    correctAnswer: 'leo',
    options: ['leo', 'lees', 'lee', 'leemos']
  },
  {
    word: 'escuchar',
    definition: 'to listen',
    tense: 'Simple Present',
    pronoun: 'Vosotros: You all (Spain)',
    correctAnswer: 'escucháis',
    options: ['escucho', 'escuchas', 'escucha', 'escucháis']
  },
  {
    word: 'cantar',
    definition: 'to sing',
    tense: 'Simple Present',
    pronoun: 'Ellos: They',
    correctAnswer: 'cantan',
    options: ['canto', 'cantas', 'canta', 'cantan']
  },
  {
    word: 'escribir',
    definition: 'to write',
    tense: 'Simple Present',
    pronoun: 'Usted: You (formal)',
    correctAnswer: 'escribe',
    options: ['escribo', 'escribes', 'escribe', 'escribimos']
  }
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
