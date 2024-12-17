import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Colors.css';

const ColorDialogue = () => {
  return (
    <div className="dialogue-container">
      <h2>Diálogo sobre los Colores</h2>
      <div className="dialogue">
        <h3><strong>Ana:</strong> Hola, Miguel. ¿Cuál es tu color favorito?</h3>
        <h3><strong>Miguel:</strong> Hola, Ana. Mi color favorito es el azul. ¿Y el tuyo?</h3>
        <h3><strong>Ana:</strong> Me encanta el verde. Es tan relajante.</h3>
        <h3><strong>Miguel:</strong> ¡Sí! El verde me recuerda a la naturaleza. ¿Te gustan los colores brillantes?</h3>
        <h3><strong>Ana:</strong> Claro, el amarillo es muy alegre. ¿Y tú?</h3>
        <h3><strong>Miguel:</strong> Prefiero el rojo, es un color muy fuerte y apasionado.</h3>
        <h3><strong>Ana:</strong> ¡Qué interesante! A veces me gusta el morado también, es muy elegante.</h3>
        <h3><strong>Miguel:</strong> ¡De acuerdo! Cada color tiene su propio encanto.</h3>
      </div>

      <h3>Vocabulario de Colores</h3>
      <table className="vocab-table">
        <thead>
          <tr>
            <th>Español</th>
            <th>Inglés</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Azul</td><td>Blue</td></tr>
          <tr><td>Verde</td><td>Green</td></tr>
          <tr><td>Amarillo</td><td>Yellow</td></tr>
          <tr><td>Rojo</td><td>Red</td></tr>
          <tr><td>Morado</td><td>Purple</td></tr>
          <tr><td>Color</td><td>Color</td></tr>
          <tr><td>Favorito</td><td>Favorite</td></tr>
          <tr><td>Brillante</td><td>Bright</td></tr>
          <tr><td>Alegre</td><td>Cheerful</td></tr>
          <tr><td>Elegante</td><td>Elegant</td></tr>
          <tr><td>Encanto</td><td>Charm</td></tr>
        </tbody>
      </table>

      {/* Button to navigate to Color Matching */}
      

      <div className="back-button-container">
      <Link to='/lessons' className="back-button"> 
          Back to Lessons
          </Link>
        <Link to="/color" className="back-button"> 
          Do Flashcards
          </Link>
        <Link to="/lesson/colormatching" className="back-button">          
        Do Color Matching
        </Link>
        <Link to="/lesson/colortest" className="back-button">  
          Take Test
          </Link>
      </div>
    </div>
  );
};

export default ColorDialogue;
