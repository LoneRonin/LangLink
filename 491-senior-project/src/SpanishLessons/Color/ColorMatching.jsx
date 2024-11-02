import React, { useState, useEffect } from "react";
import "./ColorMatching.css"; // Ensure this path is correct

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
  const [selectedColor, setSelectedColor] = useState({});
  const [shuffledColors, setShuffledColors] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    const shuffled = shuffleColors([...colors]);
    setShuffledColors(shuffled);
    setNewColor(shuffled); // Set the first color to guess
  }, []);

  // Function to shuffle colors
  const shuffleColors = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const setNewColor = (shuffled) => {
    const randomIndex = Math.floor(Math.random() * shuffled.length);
    setSelectedColor(shuffled[randomIndex]);
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
    setNewColor(shuffledColors); // Set a new color to guess
  };

  return (
    <div className="color-match-container">
      <h2>Guess the Spanish Name of the Color</h2>
      <div
        className="color-display"
        style={{
          backgroundColor: selectedColor.color,
        }}
      ></div>
      <form className="radio-group">
        {shuffledColors.map((color, index) => (
          <div key={index}>
            <input
              type="radio"
              id={color.spanish}
              value={color.spanish}
              checked={selectedOption === color.spanish}
              onChange={handleOptionChange}
            />
            <label htmlFor={color.spanish}>{color.spanish}</label>
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
    </div>
  );
};

export default ColorMatch;
