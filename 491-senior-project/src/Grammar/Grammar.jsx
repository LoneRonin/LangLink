import React from 'react';
import './Grammar.css';
import { useNavigate } from 'react-router-dom';

import esFlag from './es.png'; // Spanish flag
import jpFlag from './jp.png'; // Japanese flag

const Grammar = ({ language }) => {
  const navigate = useNavigate();
  const flag = language === 'es' ? esFlag : jpFlag;

  return (
    <div className="page-container">
      <h1>Grammar Learning Page</h1>
      {/* Back to Lessons Button */}
      <button className="back-button" onClick={() => navigate('/lessons')}>
        Back to Lessons
      </button>
      <div className="button-container">
        {/* Conditionally route based on the selected language */}
        <button className="button" onClick={() =>
            window.location.href = language === 'es' 
              ? '/grammar/conjugate-es' 
              : '/grammar/conjugate-jp'}>Conjugate</button>
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
