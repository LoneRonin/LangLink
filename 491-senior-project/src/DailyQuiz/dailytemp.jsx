import React from "react";
import { useNavigate } from "react-router-dom";
import './dailytemp.css'
const QuizPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1>Daily Quiz Page</h1>
      <div className="button-container">
        {/* Navigation Buttons for each page */}
        <button className="button" onClick={() => navigate('/dailyquiz/es')}>
          Take Spanish Daily Quiz
        </button>
        <button className="button" onClick={() => navigate('/dailyquiz/jp')}>
          Take Japanese Daily Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizPage;