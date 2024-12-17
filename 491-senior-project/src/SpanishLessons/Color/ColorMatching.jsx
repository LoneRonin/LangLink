import React, { useState, useEffect } from "react";
import "./ColorMatching.css"; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

// List of colors with their Spanish names
const colors = [
  { color: "#FF0000", spanish: "Rojo" },      // Red
  { color: "#00FF00", spanish: "Verde" },     // Green
  { color: "#0000FF", spanish: "Azul" },      // Blue
  { color: "#FFFF00", spanish: "Amarillo" },  // Yellow
  { color: "#FFA500", spanish: "Naranja" },    // Orange
  { color: "#800080", spanish: "Púrpura" },    // Purple
  { color: "#FFC0CB", spanish: "Rosa" },       // Pink
  { color: "#A52A2A", spanish: "Marrón" },     // Brown
  { color: "#00FFFF", spanish: "Cian" },       // Cyan
  { color: "#FFFFFF", spanish: "Blanco" },     // White
  { color: "#808080", spanish: "Gris" },       // Grey
];

const ColorMatch = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState({});
  const [choices, setChoices] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    setNewColor();
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const setNewColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const correctColor = colors[randomIndex];

    const incorrectColors = colors.filter(color => color.spanish !== correctColor.spanish);
    const randomIncorrectChoices = shuffleArray(incorrectColors).slice(0, 3);

    const newChoices = shuffleArray([correctColor, ...randomIncorrectChoices]);
    setSelectedColor(correctColor);
    setChoices(newChoices);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedOption === selectedColor.spanish) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const nextColor = () => {
    setIsCorrect(null);
    setSelectedOption("");
    setNewColor();
  };

  return (
    <div className="color-match-container">
      <h1>Guess the Spanish Name of the Color</h1>
      <div
        className="color-display"
        style={{
          backgroundColor: selectedColor.color,
        }}
      ></div>
      <form className="radio-group">
        {choices.map((choice, index) => (
          <div key={index}>
            <input
              type="radio"
              id={choice.spanish}
              value={choice.spanish}
              checked={selectedOption === choice.spanish}
              onChange={handleOptionChange}
            />
            <label htmlFor={choice.spanish}>{choice.spanish}</label>
          </div>
        ))}
      </form>
      <button onClick={handleSubmit}>Submit</button>
      {isCorrect !== null && (
        <div className={`feedback ${isCorrect ? "correct" : "incorrect"}`}>
          {isCorrect ? "Correct!" : "Incorrect, try again."}
        </div>
      )}
      <button onClick={nextColor}>Next Color</button>
      
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate('/lessons')}>
          Back to Lessons
        </button>
        <button className="numlesson-button" onClick={() => navigate('/color')}>
          Do Color Flashcards
        </button>
        <button className="numlesson-button" onClick={() => navigate('/lesson/colordialouge')}>
          Learn Vocabulary
        </button>
        <button className="numlesson-button" onClick={() => navigate('/lesson/colortest')}>
          Take Test
        </button>
      </div>

    </div>
  );
};

export default ColorMatch;
