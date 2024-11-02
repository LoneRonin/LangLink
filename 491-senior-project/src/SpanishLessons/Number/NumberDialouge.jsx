import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './NumDialouge.css';

const NumberDialogue = () => {
  return (
    <div className="dialogue-container">
      <h2>Diálogo sobre Números y Cantidades</h2>
      <div className="dialogue">
        <p><strong>Lucía:</strong> Hola, Juan. ¿Cuántas manzanas tenemos?</p>
        <p><strong>Juan:</strong> Hola, Lucía. Creo que tenemos cinco manzanas. ¿Necesitamos más?</p>
        <p><strong>Lucía:</strong> Sí, necesitamos al menos diez para la receta.</p>
        <p><strong>Juan:</strong> Entendido. ¿Y cuántos huevos tenemos?</p>
        <p><strong>Lucía:</strong> Tenemos doce huevos, suficientes para la receta.</p>
        <p><strong>Juan:</strong> Perfecto. ¿Cuántos vasos vamos a necesitar para la bebida?</p>
        <p><strong>Lucía:</strong> Cuatro, ya que somos cuatro personas. ¿Tienes alguna otra pregunta?</p>
        <p><strong>Juan:</strong> No, todo claro. Gracias, Lucía.</p>
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
      <Link to="/lesson/shoppinglist" className="button">
        Do Shopping List Activity
      </Link>
    </div>
  );
};

export default NumberDialogue;
