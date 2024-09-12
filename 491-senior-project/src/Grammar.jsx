import React, { useState, useEffect } from 'react'
import './Grammar.css'
//import './Conjugates.jsx'

const Grammar = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  const handleButtonClick = (answer) => {
    if (answer === 'habla') {
      setIsCorrect(true);
      setTimeout(() => {
        setIsCorrect(false);
      }, 500); // Green flash will disappear after 500ms
    }
    else{
      setIsWrong(true);
      setTimeout(() => {
        setIsWrong(false);
      }, 500); // Red flash will disappear after 500ms
    }
  };
  //==========FOR GRAMMAR BASE PAGE==========//
  // const navigate = useNavigate()

  //   const handleConjugatesClick = () => {
  //       navigate('./conjugates') // Adjust the path according to your routing setup
  //   }

    // return (
    //     <div>
    //       <h1>Grammar Lesson</h1>
    //       <button>Go to Conjugates</button>

    //     </div>
    //   );
    // Move this to Conjugate Page Later //
    // return (
    //     <div>
    //       <h1>Grammar Lesson</h1>
    //       <button>Go to Conjugates</button>

    //     </div>
    //   );

    //=======FOR CONJUGATE PRACTICE=======//
    return (
      <div>
        <h1>Conjugate Practice</h1>
        <h2>hablar: to talk</h2>
        <h2>Tense: Simple Present</h2>
        <h2>Él: He</h2>
        <button onClick={() => handleButtonClick('habla')}>ANSWER: habla</button>
        <button onClick={() => handleButtonClick('hablo')}>hablo</button>
        <button onClick={() => handleButtonClick('habler')}>habler</button>
        <button onClick={() => handleButtonClick('hablos')}>hablos</button>
  
        {isCorrect && (
          <div style={{ backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
            Correct!
          </div>
        )}
        {isWrong && (
          <div style={{ backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
            Incorrect!
          </div>
        )}
      </div>
    );
  };


export default Grammar