import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './board.css';

const Board = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [sortCriteria, setSortCriteria] = useState(null); // No sorting criteria by default

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const leaderboardData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const spanishTimeInSeconds = data.EStimeCompletedSeconds || null;
          const japaneseTimeInSeconds = data.JPtimeCompletedSeconds || null;

          return {
            firstName: data.firstName,
            lastName: data.lastName,
            spanishScore: data.ESscore || null,
            spanishTime: spanishTimeInSeconds,
            japaneseScore: data.JPscore || null,
            japaneseTime: japaneseTimeInSeconds,
          };
        });

        setLeaderboard(leaderboardData);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  // Helper function to sort leaderboard and limit to top 10
  const sortLeaderboard = (field, isDescending) => {
    return leaderboard
      .filter(user => user[field] !== null) // Only users with a value for the field
      .sort((a, b) => {
        if (isDescending) {
          return b[field] - a[field]; // Sort in descending order
        }
        return a[field] - b[field]; // Sort in ascending order
      })
      .slice(0, 10); // Limit to top 10 users
  };

  // Conditional rendering of tables
  const renderTable = (field, isDescending, label) => {
    const sortedData = sortLeaderboard(field, isDescending);

    return (
      <div>
        <h3>{label}</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>{label.includes('Score') ? 'Score' : 'Time (Seconds)'}</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((user, index) => (
              <tr key={index}>
                <td>{`${user.firstName} ${user.lastName}`}</td> {/* Merged Name Column */}
                <td>{user[field]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="leaderboard-container">
      <button className="close-btn" onClick={() => window.close()}>X</button>
      <h1>Leaderboard</h1>
      <h2>Sort by</h2>

      <div className="button-group">
        <button onClick={() => setSortCriteria('highest-spanish-score')}>Highest Spanish Score</button>
        <button onClick={() => setSortCriteria('highest-japanese-score')}>Highest Japanese Score</button>
        <button onClick={() => setSortCriteria('fastest-spanish-time')}>Fastest Spanish Time</button>
        <button onClick={() => setSortCriteria('fastest-japanese-time')}>Fastest Japanese Time</button>
      </div>

      {sortCriteria === 'highest-spanish-score' && renderTable('spanishScore', true, 'Highest Spanish Score')}
      {sortCriteria === 'highest-japanese-score' && renderTable('japaneseScore', true, 'Highest Japanese Score')}
      {sortCriteria === 'fastest-spanish-time' && renderTable('spanishTime', false, 'Fastest Spanish Time')}
      {sortCriteria === 'fastest-japanese-time' && renderTable('japaneseTime', false, 'Fastest Japanese Time')}
    </div>
  );
};

export default Board;
