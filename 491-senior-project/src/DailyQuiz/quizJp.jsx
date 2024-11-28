import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const JapaneseQuiz = () => {
    const [quizAvailable, setQuizAvailable] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [timer, setTimer] = useState("24:00:00");
    const [quizTime, setQuizTime] = useState("00:00:00");
    const [sentence, setSentence] = useState([]);
    const quizStart = useRef(null);
    const timerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const lastQuiz = localStorage.getItem('lastQuizTime');
        const now = Date.now();
        if (!lastQuiz || now - lastQuiz >= 10) {
            setQuizAvailable(true);
            setQuestions(generateQuestions());
            quizStart.current = new Date();
        } else {
            setQuizAvailable(false);
            startCountdown(new Date(parseInt(lastQuiz) + 86400000));
        }
    }, []);

    const generateQuestions = () => {
        const pool = [
            { id: 1, type: 'multiple-choice', q: "What's 'cat' in Japanese?", opts: ['犬', '猫', '鳥'], ans: '猫' },
            { id: 2, type: 'multiple-choice', q: "Translate 'five' to Japanese.", opts: ['三', '五', '十'], ans: '五' },
            { id: 3, type: 'word-bank', q: "Translate: 'I like sushi'", ans: '私は寿司が好きです', words: ['私は', '寿司', 'が', '好き', 'です', '犬'] },
            { id: 4, type: 'multiple-choice', q: "What's 'book' in Japanese?", opts: ['本', '学校', '机'], ans: '本' },
            { id: 5, type: 'word-bank', q: "Translate: 'Today is Monday'", ans: '今日は月曜日です', words: ['今日は', '月曜日', '火曜日', 'です', '昨日'] },
            { id: 6, type: 'multiple-choice', q: "What's 'water' in Japanese?", opts: ['水', '火', '風'], ans: '水' },
            { id: 7, type: 'multiple-choice', q: "Translate 'ten' to Japanese.", opts: ['一', '十', '百'], ans: '十' },
            { id: 8, type: 'word-bank', q: "Translate: 'I am a student'", ans: '私は学生です', words: ['私は', '学生', 'です', '先生', '犬'] },
            { id: 9, type: 'word-bank', q: "Translate: 'We go to the park'", ans: '私たちは公園に行きます', words: ['私たちは', '公園', 'に', '行きます', '学校'] },
            { id: 10, type: 'multiple-choice', q: "What's 'school' in Japanese?", opts: ['学校', '店', '図書館'], ans: '学校' },
        ];
        return pool.sort(() => 0.5 - Math.random()).slice(0, 5); // Select 5 random questions
    };

    const handleAnswer = (id, answer) => setUserAnswers((prev) => ({ ...prev, [id]: answer }));
    const handleNext = () => {
        if (questions[currentIndex]?.type === 'word-bank') handleAnswer(questions[currentIndex].id, sentence.join(' '));
        setSentence([]); 
        setCurrentIndex((prev) => prev + 1);
    };

    const handleSubmit = async () => {
        const duration = new Date(new Date() - quizStart.current);
        const minutes = duration.getUTCMinutes();
        const seconds = duration.getUTCSeconds();
        setQuizTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        const totalSeconds = minutes * 60 + seconds;

        const calculatedScore = questions.reduce((score, q) => 
            score + (userAnswers[q.id] === q.ans ? 1 : 0), 0
        );
        setScore(calculatedScore);
        localStorage.setItem('lastQuizTime', Date.now());
        setQuizAvailable(false);
        startCountdown(new Date(Date.now() + 86400000));

        if (auth.currentUser) {
            await setDoc(doc(db, 'users', auth.currentUser.uid), {
                JPscore: calculatedScore,
                JPtimeCompletedSeconds: totalSeconds,
                JPtimeCompletedMinutes: minutes,
            }, { merge: true });
        }
    };

    const startCountdown = (endTime) => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            const remaining = Date.parse(endTime) - Date.now();
            if (remaining <= 0) {
                clearInterval(timerRef.current);
                setQuizAvailable(true);
            } else {
                const hrs = Math.floor((remaining / 1000 / 60 / 60) % 24);
                const mins = Math.floor((remaining / 1000 / 60) % 60);
                const secs = Math.floor((remaining / 1000) % 60);
                setTimer(`${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
            }
        }, 1000);
    };
    return (
        <div className="daily-quiz-container">
            {quizAvailable ? (
                <div>
                    <h2>Japanese Quiz</h2>
                    <p>{questions[currentIndex]?.q}</p>
                    {questions[currentIndex]?.type === 'multiple-choice' && (
                        questions[currentIndex]?.opts.map((opt, idx) => (
                            <button key={idx} onClick={() => handleAnswer(questions[currentIndex].id, opt)}>
                                {opt}
                            </button>
                        ))
                    )}
                    {questions[currentIndex]?.type === 'word-bank' && (
                        <div>
                            <div>
                                {questions[currentIndex]?.words.map((word, idx) => (
                                    <button key={idx} onClick={() => setSentence([...sentence, word])}>{word}</button>
                                ))}
                            </div>
                            <p>Sentence: {sentence.join(' ')}</p>
                            <button onClick={() => setSentence([])}>Reset</button>
                        </div>
                    )}
                    {currentIndex < questions.length - 1 ? (
                        <button onClick={handleNext}>Next</button>
                    ) : (
                        <button onClick={handleSubmit}>Submit Quiz</button>
                    )}
                </div>
            ) : (
                <div>
                    <p>Next quiz in: {timer}</p>
                    <p>Score: {score}</p>
                    <p>Time: {quizTime}</p>
                    <button onClick={() => navigate('/dailyquiz')}>Back</button></div>)}</div>
);};
export default JapaneseQuiz;
