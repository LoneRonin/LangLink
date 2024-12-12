/*Zachary Hunt */
import React, { useState } from 'react';
import './Conjugate.css';
import { useNavigate } from 'react-router-dom'
// dictionary of spanish verb exercises
const spanishExercises = [
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

// Japanese verb exercises
const japaneseExercises = [
  { word: '話す', definition: 'to speak', tense: 'Plain Form', pronoun: '彼: He', correctAnswer: '話す', options: ['話す', '話します', '話した', '話せ'] },
  { word: '食べる', definition: 'to eat', tense: 'Plain Form', pronoun: '彼女: She', correctAnswer: '食べる', options: ['食べる', '食べます', '食べた', '食べろ'] },
  { word: '見る', definition: 'to see', tense: 'Plain Form', pronoun: '私たち: We', correctAnswer: '見る', options: ['見る', '見ます', '見た', '見ろ'] },
  { word: '勉強する', definition: 'to study', tense: 'Plain Form', pronoun: '君: You', correctAnswer: '勉強する', options: ['勉強する', '勉強します', '勉強した', '勉強しろ'] },
  { word: '働く', definition: 'to work', tense: 'Plain Form', pronoun: '彼ら: They', correctAnswer: '働く', options: ['働く', '働きます', '働いた', '働け'] },
  { word: '旅行する', definition: 'to travel', tense: 'Plain Form', pronoun: 'あなたたち: You all', correctAnswer: '旅行する', options: ['旅行する', '旅行します', '旅行した', '旅行しろ'] },
  { word: '読む', definition: 'to read', tense: 'Plain Form', pronoun: '私: I', correctAnswer: '読む', options: ['読む', '読みます', '読んだ', '読め'] },
  { word: '聞く', definition: 'to listen', tense: 'Plain Form', pronoun: '君たち: You all', correctAnswer: '聞く', options: ['聞く', '聞きます', '聞いた', '聞け'] },
  { word: '歌う', definition: 'to sing', tense: 'Plain Form', pronoun: '彼ら: They', correctAnswer: '歌う', options: ['歌う', '歌います', '歌った', '歌え'] },
  { word: '書く', definition: 'to write', tense: 'Plain Form', pronoun: 'あなた: You (formal)', correctAnswer: '書く', options: ['書く', '書きます', '書いた', '書け'] }
];

const Conjugate = ({ language }) => {
  const navigate = useNavigate();
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  // Determine the current set of exercises based on the language
  const exercises = language === 'es' ? spanishExercises : japaneseExercises;
  const currentExercise = exercises[currentExerciseIndex];

  const handleButtonClick = (answer) => {
    if (answer === currentExercise.correctAnswer) {
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
        <button className="back-button" onClick={() => navigate('/grammar')}>
          Back to Grammar
        </button>
      </div>

      <div className="grammar-container">
        <h1>{language === 'es' ? 'Spanish Conjugation Practice' : 'Japanese Verb Practice'}</h1>
        <h1>{currentExercise.word}: {currentExercise.definition}</h1>
        <h1>Tense: {currentExercise.tense}</h1>
        <h1>{currentExercise.pronoun}</h1>
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

export default Conjugate;
