import React, { useState } from "react";
import "./ShoppingList.css";

// Spanish shopping list with items, correct quantity, and price in euros
const items = [
  { name: "Manzanas", correctQuantity: "tres", price: 1.5 }, // apples
  { name: "Plátanos", correctQuantity: "cinco", price: 0.8 }, // bananas
  { name: "Leche", correctQuantity: "dos", price: 1.2 },      // milk
  { name: "Huevos", correctQuantity: "doce", price: 2.5 },    // eggs
  { name: "Pan", correctQuantity: "uno", price: 1.0 },        // bread
];

// Function to convert Spanish quantity words to numbers for comparison
const quantityWords = {
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
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [enteredQuantity, setEnteredQuantity] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  const handleQuantityChange = (event) => {
    setEnteredQuantity(event.target.value.toLowerCase());
  };

  const handleCheckQuantity = () => {
    const selectedItem = items[selectedItemIndex];
    if (quantityWords[enteredQuantity] === quantityWords[selectedItem.correctQuantity]) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const nextItem = () => {
    setIsCorrect(null);
    setEnteredQuantity("");
    setSelectedItemIndex((prevIndex) =>
      prevIndex < items.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="shopping-list-container">
      <h2>Lista de Compras</h2>
      <div className="item">
        <p>
          <strong>{items[selectedItemIndex].name}</strong> - Precio: €{items[selectedItemIndex].price.toFixed(2)}
        </p>
      </div>
      <input
        type="text"
        placeholder="Escribe la cantidad en español"
        value={enteredQuantity}
        onChange={handleQuantityChange}
      />
      <button onClick={handleCheckQuantity}>Verificar Cantidad</button>
      {isCorrect !== null && (
        <div className={`feedback ${isCorrect ? "correct" : "incorrect"}`}>
          {isCorrect ? "¡Correcto!" : "Incorrecto, intenta de nuevo."}
        </div>
      )}
      <button onClick={nextItem}>Siguiente Artículo</button>
    </div>
  );
};

export default ShoppingList;
