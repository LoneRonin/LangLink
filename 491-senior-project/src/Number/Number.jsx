import React, { useState } from 'react';
import './Number.css';
import { useNavigate } from 'react-router-dom';

// Spanish and Japanese number exercises
const spanishNumbers = [
  { english: 'One', spanish: 'Uno', options: ['Uno', 'Dos', 'Tres', 'Cuatro'] },
  { english: 'Two', spanish: 'Dos', options: ['Uno', 'Dos', 'Cinco', 'Seis'] },
  { english: 'Three', spanish: 'Tres', options: ['Tres', 'Cuatro', 'Siete', 'Ocho'] },
  { english: 'Four', spanish: 'Cuatro', options: ['Cinco', 'Cuatro', 'Nueve', 'Diez'] },
  { english: 'Five', spanish: 'Cinco', options: ['Seis', 'Siete', 'Cinco', 'Ocho'] },
  { english: 'Six', spanish: 'Seis', options: ['Seis', 'Siete', 'Ocho', 'Nueve'] },
  { english: 'Seven', spanish: 'Siete', options: ['Cinco', 'Siete', 'Ocho', 'Diez'] },
  { english: 'Eight', spanish: 'Ocho', options: ['Ocho', 'Nueve', 'Diez', 'Uno'] },
  { english: 'Nine', spanish: 'Nueve', options: ['Seis', 'Siete', 'Nueve', 'Cinco'] },
  { english: 'Ten', spanish: 'Diez', options: ['Diez', 'Dos', 'Tres', 'Cuatro'] }
];

const japaneseNumbers = [
  { english: 'One', hiragana: 'いち', options: ['いち', 'に', 'さん', 'し'] },
  { english: 'Two', hiragana: 'に', options: ['いち', 'に', 'ご', 'ろく'] },
  { english: 'Three', hiragana: 'さん', options: ['さん', 'し', 'しち', 'はち'] },
  { english: 'Four', hiragana: 'し', options: ['ご', 'し', 'きゅう', 'じゅう'] },
  { english: 'Five', hiragana: 'ご', options: ['ろく', 'しち', 'ご', 'はち'] },
  { english: 'Six', hiragana: 'ろく', options: ['ろく', 'しち', 'はち', 'きゅう'] },
  { english: 'Seven', hiragana: 'しち', options: ['ご', 'しち', 'はち', 'じゅう'] },
  { english: 'Eight', hiragana: 'はち', options: ['はち', 'きゅう', 'じゅう', 'いち'] },
  { english: 'Nine', hiragana: 'きゅう', options: ['ろく', 'しち', 'きゅう', 'ご'] },
  { english: 'Ten', hiragana: 'じゅう', options: ['じゅう', 'に', 'さん', 'し'] }
];

const Number = ({ language }) => {
  const navigate = useNavigate();
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  // Determine the current set of exercises based on the language
  const exercises = language === 'es' ? spanishNumbers : japaneseNumbers;
  const currentExercise = exercises[currentExerciseIndex];

  const handleButtonClick = (answer) => {
    const correctAnswer = language === 'es' ? currentExercise.spanish : currentExercise.hiragana;
    if (answer === correctAnswer) {
      setIsCorrect(true);
      setTimeout(() => {
        setIsCorrect(false);
        setCurrentExerciseIndex((prevIndex) => (prevIndex + 1) % exercises.length);
      }, 500);
    } else {
      setIsWrong(true);
      setTimeout(() => {
        setIsWrong(false);
      }, 500);
    }
  };

  return (
    <div>
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate('/lessons')}>
          Back to Lessons
        </button>
        <button className="numlesson-button" onClick={() => navigate("/lesson/shoppinglist")}>
          Do Shopping Activity
        </button>
        <button className="numlesson-button" onClick={() => navigate("/lesson/numberdialouge")}>
          Learn Vocabulary
        </button>
        <button className="numlesson-button" onClick={() => navigate("/lesson/numbertest")}>
          Take Test
        </button>
      </div>

      <div className="grammar-container">
        <h1>{language === 'es' ? 'Spanish Numbers Practice' : 'Japanese Numbers Practice'}</h1>
        <h2>Number: {currentExercise.english}</h2>
        <div className="grammar-buttons">
          {currentExercise.options.map((option) => (
            <button key={option} onClick={() => handleButtonClick(option)}>
              {option}
            </button>
          ))}
        </div>
        {isCorrect && (<div className="correct-message">Correct!</div>)}
        {isWrong && (<div className="incorrect-message">Incorrect!</div>)}
      </div>
    </div>
  );
};

export default Number;
