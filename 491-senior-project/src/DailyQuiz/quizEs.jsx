import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Ensure these imports are correct

const SpanishQuiz = () => {
  const [quizAvailable, setQuizAvailable] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [timer, setTimer] = useState("24:00:00");
  const [quizTime, setQuizTime] = useState("");
  const quizStartRef = useRef(null);
  const timerRef = useRef(null);
  const [sentenceBuilding, setSentenceBuilding] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const lastQuizTime = localStorage.getItem('lastQuizTime');
    const currentTime = Date.now();

    if (!lastQuizTime || currentTime - lastQuizTime >= 10) {
      setQuizAvailable(true);
      fetchNewQuestions();
    } else {
      setQuizAvailable(false);
      startCountdown(new Date(parseInt(lastQuizTime) + 86400000));
    }
  }, []);

  const fetchNewQuestions = () => {
    const questionPool = [
      { id: 1, type: 'multiple-choice', question: "What's the Spanish word for 'blue'?", options: ['Azul', 'Rojo', 'Verde'], answer: 'Azul' },
      { id: 2, type: 'multiple-choice', question: "Translate 'twelve' into Spanish", options: ['Doce', 'Once', 'Catorce'], answer: 'Doce' },
      { id: 3, type: 'word-bank', question: "Translate: 'I like apples'", correctSentence: 'Me gustan las manzanas', wordBank: ['Me', 'gusta', 'gustan', 'las', 'manzanas'] },
      { id: 4, type: 'word-bank', question: "Translate: 'Today is a sunny day'", correctSentence: 'Hoy es un día soleado', wordBank: ['Hoy', 'es', 'un', 'día', 'soleado', 'mañana'] },
      { id: 5, type: 'multiple-choice', question: "What's the Spanish word for 'grocery store'?", options: ['Supermercado', 'Biblioteca', 'Escuela'], answer: 'Supermercado' },
    ];

    const selectedQuestions = questionPool.sort(() => 0.5 - Math.random()).slice(0, 5);
    setQuestions(selectedQuestions);
    quizStartRef.current = new Date();
  };

  const handleAnswer = (questionId, answer) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.type === 'word-bank') {
      const builtSentence = sentenceBuilding.join(' ').trim();
      handleAnswer(currentQuestion.id, builtSentence);
      setSentenceBuilding([]);
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleQuizSubmit = async () => {
    const endTime = new Date();
    const quizDuration = endTime - quizStartRef.current;

    const minutes = Math.floor((quizDuration / 1000 / 60) % 60);
    const seconds = Math.floor((quizDuration / 1000) % 60);

    setQuizTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);

    const totalSeconds = Math.floor(quizDuration / 1000);

    let calculatedScore = 0;
    questions.forEach((q) => {
      const userAnswer = userAnswers[q.id];
      if (q.type === 'multiple-choice' && userAnswer === q.answer) {
        calculatedScore++;
      }
      if (q.type === 'word-bank' && 
          userAnswer?.trim().toLowerCase() === q.correctSentence.trim().toLowerCase()) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    localStorage.setItem('lastQuizTime', Date.now());
    setQuizAvailable(false);
    startCountdown(new Date(Date.now() + 86400000));

    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          ESscore: calculatedScore,
          EStimeCompletedSeconds: totalSeconds,
        }, { merge: true });

        console.log("Quiz data saved to Firestore");
      }
    } catch (error) {
      console.error("Error saving quiz data: ", error);
    }
  };

  const startCountdown = (endTime) => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      const remainingTime = getTimeRemaining(endTime);
      if (remainingTime.total <= 0) {
        clearInterval(timerRef.current);
        setQuizAvailable(true);
      } else {
        setTimer(
          `${remainingTime.hours.toString().padStart(2, '0')}:${
            remainingTime.minutes.toString().padStart(2, '0')}:${
            remainingTime.seconds.toString().padStart(2, '0')}`
        );
      }
    }, 1000);
  };

  const getTimeRemaining = (endTime) => {
    const total = Date.parse(endTime) - Date.now();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return { total, hours, minutes, seconds };
  };

  const handleWordClick = (word) => {
    setSentenceBuilding((prev) => [...prev, word]);
  };

  const handleWordRemove = (index) => {
    setSentenceBuilding((prev) => prev.filter((_, i) => i !== index));
  };

  const resetSentence = () => {
    setSentenceBuilding([]);
  };

  const handleGoBack = () => {
    navigate('/dailyquiz');
  };

  return (
    <div className="daily-quiz-container">
      {quizAvailable ? (
        <div>
          <h2>Daily Quiz</h2>
          {questions[currentQuestionIndex]?.type === 'word-bank' && (
            <div>
              <p>{questions[currentQuestionIndex]?.question}</p>
              <div className="word-bank">
                {questions[currentQuestionIndex]?.wordBank.map((word, index) => (
                  <button key={index} onClick={() => handleWordClick(word)} className="word-button">
                    {word}
                  </button>
                ))}
              </div>
              <div className="sentence-builder">
                <p>Current Sentence: {sentenceBuilding.join(' ')}</p>
                {sentenceBuilding.length > 0 && (
                  <button onClick={resetSentence} className="reset-button">
                    Reset Sentence
                  </button>
                )}
              </div>
            </div>
          )}
          {questions[currentQuestionIndex]?.type === 'multiple-choice' && (
            <div>
              <p>{questions[currentQuestionIndex]?.question}</p>
              {questions[currentQuestionIndex]?.options.map((option, idx) => (
                <button key={idx} onClick={() => handleAnswer(questions[currentQuestionIndex].id, option)} className="option-button">
                  {option}
                </button>
              ))}
            </div>
          )}
          {currentQuestionIndex < questions.length - 1 ? (
            <button onClick={handleNext} className="next-button">Next</button>
          ) : (
            <button onClick={handleQuizSubmit} className="submit-button">Submit Quiz</button>
          )}
        </div>
      ) : (
        <div>
          <p>You can take the quiz again in {timer}.</p>
          <p>Score: {score !== null ? score : "N/A"}</p>
          <p>Time Elapsed: {quizTime}</p>
          <button onClick={handleGoBack} className="go-back-button">Back to Daily Quiz</button>
        </div>
      )}
    </div>
  );
};

export default SpanishQuiz;
