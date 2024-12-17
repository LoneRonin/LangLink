import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Leaderboard from "./board"; // Import the Leaderboard component
import './dailytemp.css';

const QuizPage = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false); // State to toggle leaderboard visibility
  const navigate = useNavigate();

  const handleLeaderboardToggle = () => {
    setShowLeaderboard((prev) => !prev); // Toggle the leaderboard visibility
  };

  return (
    <div className="page-container">
      <h1>Daily Quiz Page</h1>
      
      {/* Conditionally render the button container */}
      {!showLeaderboard && (
        <div className="btn-container">
          {/* Navigation Buttons */}
          <button className="button" onClick={() => navigate('/dailyquiz/es')}>
            Take Spanish Daily Quiz
          </button>
          <button className="button" onClick={() => navigate('/dailyquiz/jp')}>
            Take Japanese Daily Quiz
          </button>
          <button className="button" onClick={handleLeaderboardToggle}>
            View Leaderboard
          </button>
        </div>
      )}

      {/* Conditionally render the leaderboard */}
      {showLeaderboard && (
        <div className="leaderboard-container">
          {/* Close button */}
          <button className="close-btn" onClick={handleLeaderboardToggle}>
            X
          </button>
          <Leaderboard /> {/* Render the Leaderboard component */}
        </div>
      )}
    </div>
  );
};

export default QuizPage;
