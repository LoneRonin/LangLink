import React, { useState } from 'react';
import './Date.css';
import { useNavigate } from 'react-router-dom';

// Spanish and Japanese days of the week and months
const spanishDates = {
    days: [
      { english: 'Monday', spanish: 'Lunes', options: ['Lunes', 'Martes', 'Miércoles', 'Jueves'] },
      { english: 'Tuesday', spanish: 'Martes', options: ['Lunes', 'Martes', 'Viernes', 'Sábado'] },
      { english: 'Wednesday', spanish: 'Miércoles', options: ['Domingo', 'Lunes', 'Miércoles', 'Jueves'] },
      { english: 'Thursday', spanish: 'Jueves', options: ['Viernes', 'Jueves', 'Sábado', 'Domingo'] },
      { english: 'Friday', spanish: 'Viernes', options: ['Viernes', 'Lunes', 'Martes', 'Miércoles'] },
      { english: 'Saturday', spanish: 'Sábado', options: ['Sábado', 'Domingo', 'Lunes', 'Martes'] },
      { english: 'Sunday', spanish: 'Domingo', options: ['Miércoles', 'Jueves', 'Viernes', 'Domingo'] }
    ],
    months: [
      { english: 'January', spanish: 'Enero', options: ['Enero', 'Febrero', 'Marzo', 'Abril'] },
      { english: 'February', spanish: 'Febrero', options: ['Mayo', 'Febrero', 'Junio', 'Julio'] },
      { english: 'March', spanish: 'Marzo', options: ['Agosto', 'Septiembre', 'Marzo', 'Octubre'] },
      { english: 'April', spanish: 'Abril', options: ['Noviembre', 'Diciembre', 'Enero', 'Abril'] },
      { english: 'May', spanish: 'Mayo', options: ['Mayo', 'Febrero', 'Marzo', 'Abril'] },
      { english: 'June', spanish: 'Junio', options: ['Junio', 'Julio', 'Agosto', 'Septiembre'] },
      { english: 'July', spanish: 'Julio', options: ['Octubre', 'Noviembre', 'Diciembre', 'Julio'] },
      { english: 'August', spanish: 'Agosto', options: ['Enero', 'Febrero', 'Agosto', 'Marzo'] },
      { english: 'September', spanish: 'Septiembre', options: ['Abril', 'Mayo', 'Junio', 'Septiembre'] },
      { english: 'October', spanish: 'Octubre', options: ['Julio', 'Agosto', 'Octubre', 'Noviembre'] },
      { english: 'November', spanish: 'Noviembre', options: ['Diciembre', 'Enero', 'Febrero', 'Noviembre'] },
      { english: 'December', spanish: 'Diciembre', options: ['Marzo', 'Abril', 'Mayo', 'Diciembre'] }
    ]
  };
  
  const japaneseDates = {
    days: [
      { english: 'Monday', hiragana: 'げつようび', options: ['げつようび', 'かようび', 'すいようび', 'もくようび'] },
      { english: 'Tuesday', hiragana: 'かようび', options: ['げつようび', 'かようび', 'きんようび', 'どようび'] },
      { english: 'Wednesday', hiragana: 'すいようび', options: ['にちようび', 'げつようび', 'すいようび', 'もくようび'] },
      { english: 'Thursday', hiragana: 'もくようび', options: ['きんようび', 'もくようび', 'どようび', 'にちようび'] },
      { english: 'Friday', hiragana: 'きんようび', options: ['きんようび', 'げつようび', 'かようび', 'すいようび'] },
      { english: 'Saturday', hiragana: 'どようび', options: ['どようび', 'にちようび', 'げつようび', 'かようび'] },
      { english: 'Sunday', hiragana: 'にちようび', options: ['すいようび', 'もくようび', 'きんようび', 'にちようび'] }
    ],
    months: [
      { english: 'January', hiragana: 'いちがつ', options: ['いちがつ', 'にがつ', 'さんがつ', 'しがつ'] },
      { english: 'February', hiragana: 'にがつ', options: ['ごがつ', 'にがつ', 'ろくがつ', 'しちがつ'] },
      { english: 'March', hiragana: 'さんがつ', options: ['はちがつ', 'くがつ', 'さんがつ', 'じゅうがつ'] },
      { english: 'April', hiragana: 'しがつ', options: ['じゅういちがつ', 'じゅうにがつ', 'いちがつ', 'しがつ'] },
      { english: 'May', hiragana: 'ごがつ', options: ['ごがつ', 'にがつ', 'さんがつ', 'しがつ'] },
      { english: 'June', hiragana: 'ろくがつ', options: ['ろくがつ', 'しちがつ', 'はちがつ', 'くがつ'] },
      { english: 'July', hiragana: 'しちがつ', options: ['じゅうがつ', 'じゅういちがつ', 'じゅうにがつ', 'しちがつ'] },
      { english: 'August', hiragana: 'はちがつ', options: ['いちがつ', 'にがつ', 'はちがつ', 'さんがつ'] },
      { english: 'September', hiragana: 'くがつ', options: ['しがつ', 'ごがつ', 'ろくがつ', 'くがつ'] },
      { english: 'October', hiragana: 'じゅうがつ', options: ['しちがつ', 'はちがつ', 'じゅうがつ', 'じゅういちがつ'] },
      { english: 'November', hiragana: 'じゅういちがつ', options: ['じゅうにがつ', 'いちがつ', 'にがつ', 'じゅういちがつ'] },
      { english: 'December', hiragana: 'じゅうにがつ', options: ['さんがつ', 'しがつ', 'ごがつ', 'じゅうにがつ'] }
    ]
  };

const Date = ({ language }) => {
  const navigate = useNavigate();
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isDayExercise, setIsDayExercise] = useState(true);

  // Determine the current set of exercises based on the language and type (days or months)
  const exercises = isDayExercise
    ? (language === 'es' ? spanishDates.days : japaneseDates.days)
    : (language === 'es' ? spanishDates.months : japaneseDates.months);
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

  const toggleExerciseType = () => {
    setIsDayExercise(!isDayExercise);
    setCurrentExerciseIndex(0); // Reset index when switching
  };

  return (
    <div>
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate('/lessons')}>
          Back to Lessons
        </button>
        <button className="back-button" onClick={() => navigate("/lesson/calendar")}>
          Do Calendar Activity
        </button>
        <button className="back-button" onClick={() => navigate("/lesson/datedialouge")}>
          Learn Vocabulary
        </button>
        <button className="back-button" onClick={() => navigate("/lesson/datetest")}>
          Take Test
        </button>
      </div>

      <div className="grammar-container">
        <h1>{language === 'es' ? 'Spanish Dates Practice' : 'Japanese Dates Practice'}</h1>
        <h2>{isDayExercise ? 'Day: ' : 'Month: '}{currentExercise.english}</h2>
        <div className="grammar-buttons">
          {currentExercise.options.map((option) => (
            <button key={option} onClick={() => handleButtonClick(option)}>
              {option}
            </button>
          ))}
        </div>
        {isCorrect && (<div className="correct-message">Correct!</div>)}
        {isWrong && (<div className="incorrect-message">Incorrect!</div>)}
        <button className="toggle-button" onClick={toggleExerciseType}>
          {isDayExercise ? 'Switch to Months' : 'Switch to Days'}
        </button>
      </div>
    </div>
  );
};

export default Date;
