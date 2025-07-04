import React from 'react'; 
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Dates.css';
import { useNavigate } from 'react-router-dom';

const DateDialogue = () => {
     const navigate = useNavigate();
  
  return (
    <div className="dialogue-container">
      <h2>Diálogo sobre Fechas y Horas</h2>
      <div className="dialogue">
        <h3><strong>Carlos:</strong> Hola, Marta. ¿Qué día es hoy?</h3>
        <h3><strong>Marta:</strong> Hola, Carlos. Hoy es martes, 3 de octubre. ¿Por qué preguntas?</h3>
        <h3><strong>Carlos:</strong> Quiero confirmar la fecha de nuestra reunión. ¿Es mañana a las diez de la mañana?</h3>
        <h3><strong>Marta:</strong> Sí, será el miércoles a las diez en punto. ¿Tienes algún otro compromiso antes?</h3>
        <h3><strong>Carlos:</strong> No, pero el jueves tengo otra cita a la misma hora.</h3>
        <h3><strong>Marta:</strong> De acuerdo. El jueves es el 5 de octubre. ¿A qué hora es tu cita?</h3>
        <h3><strong>Carlos:</strong> Es a las tres de la tarde. ¿Y la próxima semana, a qué hora tenemos la presentación?</h3>
        <h3><strong>Marta:</strong> La presentación es el lunes, 9 de octubre, a las dos y media de la tarde.</h3>
        <h3><strong>Carlos:</strong> Perfecto. ¿Y el viernes 13, a qué hora tienes tu reunión?</h3>
        <h3><strong>Marta:</strong> Tengo una reunión a las cuatro de la tarde. Tal vez podamos reunirnos antes para repasar.</h3>
        <h3><strong>Carlos:</strong> Suena bien. ¿Qué tal a la una en punto?</h3>
        <h3><strong>Marta:</strong> Me parece excelente. Nos vemos mañana. ¡Que tengas un buen día!</h3>
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
          <tr><td>Lunes</td><td>Monday</td></tr>
          <tr><td>Viernes</td><td>Friday</td></tr>
          <tr><td>En punto</td><td>On the dot / Sharp</td></tr>
          <tr><td>Media</td><td>Half</td></tr>
          <tr><td>Cita</td><td>Appointment</td></tr>
          <tr><td>Compromiso</td><td>Commitment</td></tr>
          <tr><td>Esta semana</td><td>This week</td></tr>
          <tr><td>Próxima semana</td><td>Next week</td></tr>
        </tbody>
      </table>
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate('/lessons')}>
          Back to Lessons
        </button>
        <button className="numlesson-button" onClick={() => navigate("/lesson/calendar")}>
          Do Calendar Activity
        </button>
        <button className="numlesson-button" onClick={() => navigate("/date")}>
         Do Flashcards
        </button>
        <button className="numlesson-button" onClick={() => navigate("/lesson/datetest")}>
          Take Test
        </button>
      </div>
    </div>
  );
};
export default DateDialogue;
