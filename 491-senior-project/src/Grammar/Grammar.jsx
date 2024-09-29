/*Zachary Hunt */
import React, { useState } from 'react';
import './Grammar.css'; 

import esFlag from './es.png'; // Spanish flag
import jpFlag from './jp.png'; // Japanese flag

const Grammar = () => {
  //Use States for language switching
  const [flag, setFlag] = useState(esFlag);
  const [language, setLanguage] = useState('es'); // Tracks the current language (default is 'es' for Spanish)
  const toggleFlag = () => {
    if (language === 'es') { // change flag and language by clicking on image
      setFlag(jpFlag);
      setLanguage('jp');
    } else {
      setFlag(esFlag);
      setLanguage('es');
    }};

  // buttons and title for grammar homepage
  return (
    <div className="page-container">
      <h1>Grammar Learning Page</h1>
      <div className="button-container">
        {/* Conditionally route based on the selected language */}
        <button className="button" onClick={() =>
            window.location.href = language === 'es' 
              ? '/grammar/conjugate-es' 
              : '/grammar/conjugate-jp'}>Conjugate</button>
        {/* Toggle flag button */}
        <button className="flag-button" onClick={toggleFlag}>
          <img src={flag} alt="Language Flag" className="flag-image" />
        </button>
        {/* Conditionally route based on the selected language */}
        <button className="button" onClick={() =>
            window.location.href = language === 'es'
              ? '/grammar/sentence-es'
              : '/grammar/sentence-jp'}>Sentence</button>
      </div>
    </div>
  );
};
export default Grammar;
