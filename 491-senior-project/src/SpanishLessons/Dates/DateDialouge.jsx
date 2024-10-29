import React from 'react';
import './DateDialogue.css';

const DateDialogue = () => {
  return (
    <div className="dialogue-container">
      <h2>Diálogo sobre Fechas y Horas</h2>
      <div className="dialogue">
        <p><strong>Carlos:</strong> Hola, Marta. ¿Qué día es hoy?</p>
        <p><strong>Marta:</strong> Hola, Carlos. Hoy es martes, 3 de octubre. ¿Por qué preguntas?</p>
        <p><strong>Carlos:</strong> Quiero confirmar la fecha de nuestra reunión. ¿Es mañana a las diez de la mañana?</p>
        <p><strong>Marta:</strong> Sí, será el miércoles a las diez en punto. ¿Tienes algún otro compromiso antes?</p>
        <p><strong>Carlos:</strong> No, pero el jueves tengo otra cita a la misma hora.</p>
        <p><strong>Marta:</strong> Bueno, entonces nos vemos mañana. ¿A qué hora llegas?</p>
        <p><strong>Carlos:</strong> Llegaré unos minutos antes, tal vez a las nueve y media.</p>
        <p><strong>Marta:</strong> Perfecto. Nos vemos entonces. ¡Que tengas un buen día!</p>
      </div>

      <h3>Vocabulario de Fechas y Horas</h3>
      <table className="vocab-table">
        <thead>
          <tr>
            <th>Español</th>
            <th>Inglés</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Fecha</td><td>Date</td></tr>
          <tr><td>Hora</td><td>Time</td></tr>
          <tr><td>Día</td><td>Day</td></tr>
          <tr><td>Martes</td><td>Tuesday</td></tr>
          <tr><td>Miércoles</td><td>Wednesday</td></tr>
          <tr><td>Jueves</td><td>Thursday</td></tr>
          <tr><td>Mañana</td><td>Tomorrow</td></tr>
          <tr><td>En punto</td><td>On the dot / Sharp</td></tr>
          <tr><td>Media</td><td>Half</td></tr>
          <tr><td>Cita</td><td>Appointment</td></tr>
          <tr><td>Compromiso</td><td>Commitment</td></tr>
        </tbody>
      </table>
    </div>
  );
};

export default DateDialogue;
