import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./ShoppingList.css";

// List of items with prices
const items = [
  { name: "Manzanas", price: 2 }, // apples
  { name: "Plátanos", price: 0.5 }, // bananas
  { name: "Leche", price: 1.5 },      // milk
  { name: "Huevos", price: 2.5 },    // eggs
  { name: "Pan", price: 1.0 },        // bread
];

// Function to convert Spanish quantity words to numbers for comparison
const quantityWords = {
  cero: 0, 
  uno: 1,
  dos: 2,
  tres: 3,
  cuatro: 4,
  cinco: 5,
  seis: 6,
  siete: 7,
  ocho: 8,
  nueve: 9,
  diez: 10,
  once: 11,
  doce: 12,
};

const ShoppingList = () => {
  const [quantities, setQuantities] = useState(Array(items.length).fill(0));
  const [totalCost, setTotalCost] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [calculatedCost, setCalculatedCost] = useState(0); // Added to store calculated cost

  // Function to generate a random total cost divisible by 0.5 and <= 75
  const generateRandomTotalCost = () => {
    const randomCost = Math.floor(Math.random() * 151) * 0.5; // Random cost between 0 and 75, in increments of 0.5
    setTotalCost(randomCost);
  };

  // Call function to set a random total cost when component mounts
  React.useEffect(() => {
    generateRandomTotalCost();
  }, []);

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = parseInt(value); // Update the quantity for the selected item
    setQuantities(newQuantities);
  };

  const handleCheckQuantity = () => {
    // Calculate the total cost based on selected quantities
    const calculatedCost = quantities.reduce((sum, qty, index) => {
      return sum + qty * items[index].price;
    }, 0);

    // Store the calculated cost and check if it is within the budget
    setCalculatedCost(calculatedCost); // Save calculated cost
    setIsCorrect(calculatedCost <= totalCost); // Check if within budget
  };

  return (
    <div className="shopping-list-container">
      <h2>Shopping List</h2>
      <h3>Budget: €{totalCost.toFixed(2)}</h3>
      <div className="items">
        {items.map((item, index) => (
          <div className="item" key={index}>
            <p>
              <strong>{item.name}</strong> - Unit Price: €{item.price.toFixed(2)}
            </p>
            <select value={quantities[index]} onChange={(e) => handleQuantityChange(index, e.target.value)}>
              {/* Include an option for zero */}
              <option value="0">cero (0)</option> {/* Explicitly set for zero */}
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {Object.keys(quantityWords)[i + 1]} ({i + 1}) {/* Adjusted index for correct labels */}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <button onClick={handleCheckQuantity}>Verify Cost</button>
      <button onClick={generateRandomTotalCost}>Change Budget</button> {/* Button to change total cost */}
      {isCorrect !== null && (
        <div className={`feedback ${isCorrect ? "correct" : "incorrect"}`}>
          {isCorrect 
            ? `¡Correcto!  Total: €${calculatedCost.toFixed(2)}` 
            : `¡Incorrecto! Total: €${calculatedCost.toFixed(2)}`
          }
        </div>
      )}
      {/* Link to navigate back */}
      <Link to="/lesson/numberdialouge" className="back-button">Back to number dialogue</Link>
    </div>
  );
};

export default ShoppingList;
