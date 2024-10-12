/*Zachary Hunt */
import React, { useState } from 'react';
import './Conjugate.css';
import { useNavigate } from 'react-router-dom'
// dictionary of spanish verb exercises
const exercises = [
  // hablar
  {
    word: 'hablar',
    definition: 'to talk',
    tense: 'Simple Present',
    pronoun: 'Él: He', 
    correctAnswer: 'habla', // correct answer
    options: ['habla', 'hablo', 'habler', 'hablos'] // answers to be selected
  },
  // comer
  {
    word: 'comer',
    definition: 'to eat',
    tense: 'Simple Present',
    pronoun: 'Ella: She',
    correctAnswer: 'come',// correct answer
    options: ['come', 'comer', 'comes', 'comemos']// answers to be selected
  },
  // vivir
  {
    word: 'vivir',
    definition: 'to live',
    tense: 'Simple Present',
    pronoun: 'Nosotros: We',
    correctAnswer: 'vivimos',
    options: ['vive', 'vivimos', 'vivo', 'viven']
  },
  // estudiar
  {
    word: 'estudiar',
    definition: 'to study',
    tense: 'Simple Present',
    pronoun: 'Tú: You',
    correctAnswer: 'estudias',
    options: ['estudio', 'estudias', 'estudia', 'estudiamos']
  },
  // trabajar
  {
    word: 'trabajar',
    definition: 'to work',
    tense: 'Simple Present',
    pronoun: 'Ellas: They',
    correctAnswer: 'trabajan',
    options: ['trabajo', 'trabajas', 'trabaja', 'trabajan']
  },
  // viajar
  {
    word: 'viajar',
    definition: 'to travel',
    tense: 'Simple Present',
    pronoun: 'Ustedes: You all',
    correctAnswer: 'viajan',
    options: ['viajo', 'viajas', 'viaja', 'viajan']
  },
  // leer
  {
    word: 'leer',
    definition: 'to read',
    tense: 'Simple Present',
    pronoun: 'Yo: I',
    correctAnswer: 'leo',
    options: ['leo', 'lees', 'lee', 'leemos']
  },
  // escuhar
  {
    word: 'escuchar',
    definition: 'to listen',
    tense: 'Simple Present',
    pronoun: 'Vosotros: You all (Spain)',
    correctAnswer: 'escucháis',
    options: ['escucho', 'escuchas', 'escucha', 'escucháis']
  },
  // cantar
  {
    word: 'cantar',
    definition: 'to sing',
    tense: 'Simple Present',
    pronoun: 'Ellos: They',
    correctAnswer: 'cantan',
    options: ['canto', 'cantas', 'canta', 'cantan']
  },
  // escribir
  {
    word: 'escribir',
    definition: 'to write',
    tense: 'Simple Present',
    pronoun: 'Usted: You (formal)',
    correctAnswer: 'escribe',
    options: ['escribo', 'escribes', 'escribe', 'escribimos']
  }
]; // end of dictionary

const Conjugate = () => {
  const navigate = useNavigate();
  // setting up states for conjugate activity
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  // setting use States with index of exercise list (see above dictionary)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const currentExercise = exercises[currentExerciseIndex];

  const handleButtonClick = (answer) => {
    if (answer === currentExercise.correctAnswer) { // correct answer was picked
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
    }};
// return buttons, correct/incorrect message, word info for conjugate exercise
return (
  <div>
    {/* Back to Grammar Button */}
    <div className="back-button-container">
      <button className="back-button" onClick={() => navigate('/grammar')}>
        Back to Grammar
      </button>
    </div>

    <div className="grammar-container">
      <h1>Conjugate Practice</h1>
      {/* display based on current index of exercise list */}
      <h2>{currentExercise.word}: {currentExercise.definition}</h2> 
      <h2>Tense: {currentExercise.tense}</h2>
      <h2>{currentExercise.pronoun}</h2>
      {/* Handles answer being chosen */}
      <div className="grammar-buttons">
        {currentExercise.options.map((option) => (
          <button key={option} onClick={() => handleButtonClick(option)}> 
            {option} 
          </button>
        ))}
      </div>
      {/* display correct/incorrect when button is clicked */}
      {isCorrect && (<div className="correct-message">Correct!</div>)} 
      {isWrong && (<div className="incorrect-message">Incorrect!</div>)}
    </div>
  </div>
); 
};
export default Conjugate;
