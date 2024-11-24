import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Ensure these imports are correct

const JapaneseQuiz = () => {
    const [quizAvailable, setQuizAvailable] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [timer, setTimer] = useState("24:00:00");
    const [quizTime, setQuizTime] = useState("00:00:00");
    const quizStartRef = useRef(null);
    const timerRef = useRef(null);
    const [currentSentence, setCurrentSentence] = useState('');
    const [sentenceBuilding, setSentenceBuilding] = useState([]); // For building the sentence
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
            {
                id: 1, type: 'multiple-choice', question: "What's the Japanese word for 'cat'?",
                options: ['犬 (inu)', '猫 (neko)', '鳥 (tori)'],
                answer: '猫 (neko)'
            },
            {
                id: 2,
                type: 'multiple-choice',
                question: "Translate 'five' into Japanese.",
                options: ['三 (san)', '五 (go)', '十 (juu)'],
                answer: '五 (go)'
            },
            {
                id: 3,
                type: 'word-bank',
                question: "Translate: 'I like sushi'",
                correctSentence: '私は寿司が好きです',
                wordBank: ['私は', '寿司', 'が', '好き', 'です', '犬']
            },
            {
                id: 4,
                type: 'word-bank',
                question: "Translate: 'Today is Monday'",
                correctSentence: '今日は月曜日です',
                wordBank: ['今日は', '月曜日', '火曜日', 'です', '昨日']
            },
            {
                id: 5,
                type: 'multiple-choice',
                question: "What's the Japanese word for 'book'?",
                options: ['本 (hon)', '学校 (gakkou)', '机 (tsukue)'],
                answer: '本 (hon)'
            },
            {
                id: 6,
                type: 'multiple-choice',
                question: "What's the Japanese word for 'water'?",
                options: ['水 (mizu)', '火 (hi)', '風 (kaze)'],
                answer: '水 (mizu)'
            },
            {
                id: 7,
                type: 'multiple-choice',
                question: "Translate 'ten' into Japanese.",
                options: ['一 (ichi)', '十 (juu)', '百 (hyaku)'],
                answer: '十 (juu)'
            },
            {
                id: 8,
                type: 'word-bank',
                question: "Translate: 'I am a student'",
                correctSentence: '私は学生です',
                wordBank: ['私は', '学生', 'です', '先生', '犬']
            },
            {
                id: 9,
                type: 'word-bank',
                question: "Translate: 'We go to the park'",
                correctSentence: '私たちは公園に行きます',
                wordBank: ['私たちは', '公園', 'に', '行きます', '学校']
            },
            {
                id: 10,
                type: 'multiple-choice',
                question: "What's the Japanese word for 'school'?",
                options: ['学校 (gakkou)', '店 (mise)', '図書館 (toshokan)'],
                answer: '学校 (gakkou)'
            },
        ];

        // Randomly select 5 questions
        const selectedQuestions = questionPool.sort(() => 0.5 - Math.random()).slice(0, 5);
        setQuestions(selectedQuestions);
        quizStartRef.current = new Date(); // Start quiz timer
    };

    const handleAnswer = (questionId, answer) => {
        setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
    };

    const handleNext = () => {
        const currentQuestion = questions[currentQuestionIndex];
        if (currentQuestion.type === 'word-bank') {
            handleAnswer(currentQuestion.id, currentSentence.trim());
            setSentenceBuilding([]); // Clear the sentence for next question
        }
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    const handleQuizSubmit = async () => {
        const endTime = new Date();
        const quizDuration = new Date(endTime - quizStartRef.current);

        // Calculate time in minutes and seconds
        const minutes = quizDuration.getUTCMinutes();
        const seconds = quizDuration.getUTCSeconds();

        setQuizTime(
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );

        // Store the total time in seconds and minutes
        const totalSeconds = minutes * 60 + seconds;

        let calculatedScore = 0;
        questions.forEach((q) => {
            const userAnswer = userAnswers[q.id];
            if (q.type === 'multiple-choice' && userAnswer === q.answer) {
                calculatedScore++;
            }
            if (q.type === 'word-bank' && userAnswer === q.correctSentence) {
                calculatedScore++;
            }
        });

        setScore(calculatedScore);
        localStorage.setItem('lastQuizTime', Date.now());
        setQuizAvailable(false);
        startCountdown(new Date(Date.now() + 86400000)); // Start 24-hour countdown

        // Save score and time to Firestore, merging data to keep other fields intact
        try {
            const user = auth.currentUser; // Get the current user
            if (user) {
                const userRef = doc(db, 'users', user.uid); // Reference to the user's document
                await setDoc(userRef, {
                    JPscore: calculatedScore,
                    JPtimeCompletedSeconds: totalSeconds, // Store time as total seconds
                    JPtimeCompletedMinutes: minutes, // Store time in minutes
                }, { merge: true }); // Merge data to preserve other fields

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
                    `${remainingTime.hours.toString().padStart(2, '0')}:${remainingTime.minutes.toString().padStart(2, '0')}:${remainingTime.seconds.toString().padStart(2, '0')}`
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

    // Sentence Builder Functions
    const handleWordClick = (word) => {
        setSentenceBuilding((prev) => [...prev, word]);
    };

    const handleWordRemove = (index) => {
        setSentenceBuilding((prev) => prev.filter((_, i) => i !== index));
    };

    const resetSentence = () => {
        setSentenceBuilding([]); // Reset the sentence builder
        setCurrentSentence(''); // Clear the current sentence
    };

    // "Go Back" button functionality
    const handleGoBack = () => {
        navigate('/dailyquiz'); // Navigate to the QuizPage route
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
                    <p>Score: {score}</p>
                    <p>Time Elapsed: {quizTime}</p>
                    <button onClick={handleGoBack} className="go-back-button">Back to Daily Quiz</button>
                </div>
            )}
        </div>
    );
};

export default JapaneseQuiz;
