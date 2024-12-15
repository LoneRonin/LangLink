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
      <div className="btn-container">
        {/* Navigation Buttons for each page */}
        <btn className="btn" onClick={() => navigate('/dailyquiz/es')}>
          Take Spanish Daily Quiz
        </btn>
        <btn className="btn" onClick={() => navigate('/dailyquiz/jp')}>
          Take Japanese Daily Quiz
        </btn>

        {/* New button to toggle Leaderboard visibility */}
        <btn className="btn" onClick={handleLeaderboardToggle}>
          {showLeaderboard ? "Hide Leaderboard" : "View Leaderboard"}
        </btn>
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
