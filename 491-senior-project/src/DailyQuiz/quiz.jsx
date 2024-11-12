// import React, { useEffect, useState } from 'react';
// import './quiz.css';

// const DailyQuizEs = () => {
//     const [quizAvail, setQuizAvail] =useState(false)
//     const [questions, setQuestions] = useState([])

//     useEffect(() =>{

//     })
//     return(
//         <div><h1>Spanish Daily Quiz</h1></div>
//     );
// };

// const DailyQuizJp = () =>{
//     return(
//         <div><h1>Japanese Daily Quiz</h1></div>
//     );
// };

// export default {DailyQuizEs, DailyQuizJp};

import React, { useState, useEffect, useRef } from 'react';
import './quiz.css';

const DailyQuiz = () => {
  const [quizAvailable, setQuizAvailable] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [timer, setTimer] = useState("24:00:00");
  const timerRef = useRef(null);

  useEffect(() => {
    const lastQuizTime = localStorage.getItem('lastQuizTime');
    const currentTime = Date.now();

    if (!lastQuizTime || currentTime - lastQuizTime >= 86400000) {
      // If 24 hours have passed or this is the first time, reset the quiz
      setQuizAvailable(true);
      fetchNewQuestions();
    } else {
      setQuizAvailable(false);
      startCountdown(new Date(parseInt(lastQuizTime) + 86400000));
    }
  }, []);

  const fetchNewQuestions = () => {
    const newQuestions = [
      { id: 1, question: "What's the capital of Spain?", options: ["Madrid", "Barcelona", "Seville"], answer: "Madrid" },
      { id: 2, question: "Translate 'Hello' to Spanish", options: ["Hola", "Adiós", "Gracias"], answer: "Hola" }
    ];
    setQuestions(newQuestions);
  };

  const handleQuizSubmit = () => {
    const currentTime = Date.now();
    localStorage.setItem('lastQuizTime', currentTime);
    setQuizAvailable(false);
    startCountdown(new Date(currentTime + 86400000)); // Start 24-hour countdown
  };

  const getTimeRemaining = (endTime) => {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return { total, hours, minutes, seconds };
  };

  const startCountdown = (endTime) => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      const { total, hours, minutes, seconds } = getTimeRemaining(endTime);

      if (total <= 0) {
        clearInterval(timerRef.current);
        setQuizAvailable(true);
      } else {
        setTimer(
          `${hours > 9 ? hours : "0" + hours}:${
            minutes > 9 ? minutes : "0" + minutes
          }:${seconds > 9 ? seconds : "0" + seconds}`
        );
      }
    }, 1000);
  };

  return (
    <div className="daily-quiz-container">
      {quizAvailable ? (
        <div>
          <h2>Daily Quiz</h2>
          {questions.map((q) => (
            <div key={q.id} className="question">
              <p>{q.question}</p>
              {q.options.map((option, idx) => (
                <button key={idx} className="option-button">{option}</button>
              ))}
            </div>
          ))}
          <button onClick={handleQuizSubmit} className="submit-button">Submit Quiz</button>
        </div>
      ) : (
        <div>
          <p className="unavailable-message">You can take the quiz again in:</p>
          <p className="countdown-timer">{timer}</p>
        </div>
      )}
    </div>
  );
};

export default DailyQuiz;

