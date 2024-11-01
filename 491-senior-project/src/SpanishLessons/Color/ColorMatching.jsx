import React, { useState } from "react";

// List of colors with English and Spanish names
const colors = [
  { color: "#FF0000", name: "Red", spanish: "Rojo" },
  { color: "#00FF00", name: "Green", spanish: "Verde" },
  { color: "#0000FF", name: "Blue", spanish: "Azul" },
  { color: "#FFFF00", name: "Yellow", spanish: "Amarillo" },
  { color: "#FFA500", name: "Orange", spanish: "Naranja" },
];

const ColorMatch = () => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedOption === colors[currentColorIndex].spanish) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const nextColor = () => {
    setIsCorrect(null);
    setSelectedOption("");
    setCurrentColorIndex((prevIndex) =>
      prevIndex < colors.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div>
      <h2>Match the Color with its Spanish Name</h2>
      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: colors[currentColorIndex].color,
          marginBottom: "20px",
        }}
      ></div>
      <form>
        {colors.map((color, index) => (
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
        <div>
          {isCorrect ? (
            <p style={{ color: "green" }}>Correct!</p>
          ) : (
            <p style={{ color: "red" }}>Incorrect, try again.</p>
          )}
        </div>
      )}
      <button onClick={nextColor}>Next Color</button>
    </div>
  );
};

export default ColorMatch;
