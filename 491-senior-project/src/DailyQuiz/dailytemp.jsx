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
      
      {/* Button Container for all four buttons */}
      <div className="button-container">
        {/* Navigation Buttons for each page */}
        <button className="button" onClick={() => navigate('/dailyquiz/es')}>
          Take Spanish Daily Quiz
        </button>
        <button className="button" onClick={() => navigate('/dailyquiz/jp')}>
          Take Japanese Daily Quiz
        </button>

        {/* New button to toggle Leaderboard visibility */}
        <button className="button" onClick={handleLeaderboardToggle}>
          {showLeaderboard ? "Hide Leaderboard" : "View Leaderboard"}
        </button>
      </div>

      {/* Conditionally render the Leaderboard */}
      {showLeaderboard && (
        <div className="leaderboard-overlay">
          <div className="leaderboard-container">
            <button className="close-btn" onClick={handleLeaderboardToggle}>X</button>
            <Leaderboard />  {/* Render the Leaderboard component here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
