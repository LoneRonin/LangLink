import React, { useState } from 'react';
import './Color.css';
import { useNavigate } from 'react-router-dom';

// Spanish color exercises
const spanishColors = [
  { english: 'Red', spanish: 'Rojo', options: ['Rojo', 'Azul', 'Verde', 'Amarillo'] },
  { english: 'Blue', spanish: 'Azul', options: ['Rojo', 'Azul', 'Negro', 'Blanco'] },
  { english: 'Green', spanish: 'Verde', options: ['Verde', 'Rosa', 'Naranja', 'Amarillo'] },
  { english: 'Yellow', spanish: 'Amarillo', options: ['Negro', 'Blanco', 'Amarillo', 'Rojo'] },
  { english: 'Black', spanish: 'Negro', options: ['Blanco', 'Negro', 'Azul', 'Verde'] },
  { english: 'White', spanish: 'Blanco', options: ['Rojo', 'Blanco', 'Naranja', 'Rosa'] },
  { english: 'Pink', spanish: 'Rosa', options: ['Rosa', 'Azul', 'Negro', 'Amarillo'] },
  { english: 'Orange', spanish: 'Naranja', options: ['Naranja', 'Rojo', 'Blanco', 'Verde'] }
];

// Japanese color exercises
const japaneseColors = [
  { english: 'Red', hiragana: 'あか', options: ['あか', 'あお', 'みどり', 'きいろ'] },
  { english: 'Blue', hiragana: 'あお', options: ['あか', 'あお', 'くろ', 'しろ'] },
  { english: 'Green', hiragana: 'みどり', options: ['みどり', 'ももいろ', 'オレンジ', 'きいろ'] },
  { english: 'Yellow', hiragana: 'きいろ', options: ['くろ', 'しろ', 'きいろ', 'あか'] },
  { english: 'Black', hiragana: 'くろ', options: ['しろ', 'くろ', 'あお', 'みどり'] },
  { english: 'White', hiragana: 'しろ', options: ['あか', 'しろ', 'オレンジ', 'ももいろ'] },
  { english: 'Pink', hiragana: 'ももいろ', options: ['ももいろ', 'あお', 'くろ', 'きいろ'] },
  { english: 'Orange', hiragana: 'オレンジ', options: ['オレンジ', 'あか', 'しろ', 'みどり'] }
];

const Color = ({ language }) => {
  const navigate = useNavigate();
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  // Determine the current set of exercises based on the language
  const exercises = language === 'es' ? spanishColors : japaneseColors;
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
      </div>

      <div className="grammar-container">
        <h1>{language === 'es' ? 'Spanish Colors Practice' : 'Japanese Colors Practice'}</h1>
        <h2>Color: {currentExercise.english}</h2>
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

export default Color;
