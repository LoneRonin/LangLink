import React from 'react';
import './ColorDialogue.css';

const ColorDialogue = () => {
  return (
    <div className="dialogue-container">
      <h2>Diálogo sobre los Colores</h2>
      <div className="dialogue">
        <p><strong>Ana:</strong> Hola, Miguel. ¿Cuál es tu color favorito?</p>
        <p><strong>Miguel:</strong> Hola, Ana. Mi color favorito es el azul. ¿Y el tuyo?</p>
        <p><strong>Ana:</strong> Me encanta el verde. Es tan relajante.</p>
        <p><strong>Miguel:</strong> ¡Sí! El verde me recuerda a la naturaleza. ¿Te gustan los colores brillantes?</p>
        <p><strong>Ana:</strong> Claro, el amarillo es muy alegre. ¿Y tú?</p>
        <p><strong>Miguel:</strong> Prefiero el rojo, es un color muy fuerte y apasionado.</p>
        <p><strong>Ana:</strong> ¡Qué interesante! A veces me gusta el morado también, es muy elegante.</p>
        <p><strong>Miguel:</strong> ¡De acuerdo! Cada color tiene su propio encanto.</p>
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
    </div>
  );
};

export default ColorDialogue;
