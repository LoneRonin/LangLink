import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NumDialouge.css';
const NumberDialogue = () => {
    const navigate = useNavigate();
  
  return (
    <div className="dialogue-container">
      <h2>Diálogo sobre Números y Cantidades</h2>
      <div className="dialogue">
        <h3><strong>Lucía:</strong> Hola, Juan. ¿Cuántas manzanas tenemos?</h3>
        <h3><strong>Juan:</strong> Hola, Lucía. Creo que tenemos cinco manzanas. ¿Necesitamos más?</h3>
        <h3><strong>Lucía:</strong> Sí, necesitamos al menos diez para la receta.</h3>
        <h3><strong>Juan:</strong> Entendido. ¿Y cuántos huevos tenemos?</h3>
        <h3><strong>Lucía:</strong> Tenemos doce huevos, suficientes para la receta.</h3>
        <h3><strong>Juan:</strong> Perfecto. ¿Cuántos vasos vamos a necesitar para la bebida?</h3>
        <h3><strong>Lucía:</strong> Cuatro, ya que somos cuatro personas. ¿Tienes alguna otra pregunta?</h3>
        <h3><strong>Juan:</strong> No, todo claro. Gracias, Lucía.</h3>
      </div>
    <h3>Vocabulario de Números y Cantidades</h3>
      <table className="vocab-table">
        <thead>
          <tr>
            <th>Español</th>
            <th>Inglés</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Cuántos</td><td>How many</td></tr>
          <tr><td>Manzanas</td><td>Apples</td></tr>
          <tr><td>Huevos</td><td>Eggs</td></tr>
          <tr><td>Vasos</td><td>Glasses</td></tr>
          <tr><td>Cinco</td><td>Five</td></tr>
          <tr><td>Diez</td><td>Ten</td></tr>
          <tr><td>Doce</td><td>Twelve</td></tr>
          <tr><td>Personas</td><td>People</td></tr>
          <tr><td>Número</td><td>Number</td></tr>
          <tr><td>Suficiente</td><td>Enough</td></tr>
          <tr><td>Receta</td><td>Recipe</td></tr>
        </tbody>
      </table>
      {/* Button to navigate to Shopping List */}
      <div className="back-button-container">
        <button className="back-button " onClick={() => navigate('/lessons')}>
          Back to Lessons
        </button>
        <button className="numlesson-button" onClick={() => navigate("/lesson/shoppinglist")}>
          Do Shopping Activity
        </button>
        <button className="numlesson-button " onClick={() => navigate("/number")}>
          Do Flashcards
        </button>
        <button className="numlesson-button " onClick={() => navigate("/lesson/numbertest")}>
          Take Test
        </button>
      </div>
    </div>);};
export default NumberDialogue;
