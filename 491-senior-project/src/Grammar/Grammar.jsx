import React from 'react';
import './Grammar.css';
import { useNavigate } from 'react-router-dom';

const Grammar = ({ language }) => {
  const navigate = useNavigate();

  // Determine the page title based on the selected language
  const pageTitle = language === 'es' ? 'Spanish Grammar Learning Page' : 'Japanese Grammar Learning Page';

  return (
    <div className="page-container">
      <h1>{pageTitle}</h1>
      {/* Back to Lessons Button */}
      <button className="back-button" onClick={() => navigate('/lessons')}>
        Back to Lessons
      </button>
      <div className="btn-container">
        {/* Conditionally route based on the selected language */}
        <button onClick={() => navigate('/grammar/conjugate')}>Conjugate</button>
        {/* Conditionally route based on the selected language */}
        <button onClick={() => navigate('/grammar/sentence')}>Sentence</button>
      </div>
    </div>
  );
};

export default Grammar;
