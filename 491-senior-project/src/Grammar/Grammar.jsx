import React from 'react';
import './Grammar.css'; 
 
// const languageOptions = [
//     { key: "Japanese", text: "English", value: "en" },
//     { key: "Spanish", text: "Spanish", value: "es" }
//   ];

const Grammar = () => {
  return (
    <div className="page-container">
      <h1>Grammar Learning Page</h1>
      {/* change these buttons so that they are pictures */}
      <div className="button-container">
        <button className="button" onClick={() => window.location.href = '/grammar/conjugate'}>
          Conjugate
        </button>
        <button className="button" onClick={() => window.location.href = '/grammar/sentence'}>
          Sentence
        </button>
      </div>
    </div>
  );
};

export default Grammar;
