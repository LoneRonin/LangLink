import React from "react";
import { useNavigate } from "react-router-dom";

const LessonPage = ({ language, toggleFlag, flag }) => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1>Spanish Lesson Page</h1>
      <div className="button-container">
        {/* Navigation Buttons for each page */}
        <button className="button" onClick={() => navigate('/lesson/colormatching')}>
          Color Matching
        </button>
        <button className="button" onClick={() => navigate('/lesson/colordialouge')}>
          Color Dialogue
        </button>
        <button className="button" onClick={() => navigate('/lesson/calendar')}>
          Calendar
        </button>
        <button className="button" onClick={() => navigate('/lesson/datedialouge')}>
          Date Dialogue
        </button>
        <button className="button" onClick={() => navigate('/lesson/shoppinglist')}>
          Shopping List
        </button>
        <button className="button" onClick={() => navigate('/lesson/numberdialouge')}>
          Number Dialogue
        </button>

      </div>
    </div>
  );
};

export default LessonPage;
