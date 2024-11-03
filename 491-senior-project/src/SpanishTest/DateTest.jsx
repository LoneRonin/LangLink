import React, { useState } from 'react';
import './datetests.css';

const DateTest = () => {
  const [answers, setAnswers] = useState({
    q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '', q9: '', q10: '', q11: '', q12: '', q13: '', q14: '', q15: ''
  });

  const correctAnswers = {
    q1: 'Tuesday', // Martes
    q2: 'Wednesday', // Miércoles
    q3: 'Thursday', // Jueves
    q4: 'Monday', // Lunes
    q5: 'Friday', // Viernes
    q6: 'date', // Fecha
    q7: 'time', // Hora
    q8: 'appointment', // Cita
    q9: 'this week', // Esta semana
    q10: 'next week', // Próxima semana
    q11: '¿Qué día es hoy?', // What day is it today?
    q12: 'Tengo una cita el viernes.', // I have an appointment on Friday.
    q13: 'Mi compromiso es el martes.', // My commitment is on Tuesday.
    q14: 'La reunión es a las seis en punto.', // The meeting is at six o'clock.
    q15: 'Ella tiene un compromiso esta semana.' // She has a commitment this week.
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prevAnswers => ({ ...prevAnswers, [name]: value }));
  };

  const calculateScore = () => {
    let score = 0;
    for (const key in answers) {
      if (answers[key].toLowerCase() === correctAnswers[key].toLowerCase()) {
        score++;
      }
    }
    return score;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const score = calculateScore();
    alert(`Your total score is: ${score} / 15`);
  };

  return (
    <form onSubmit={handleSubmit} className="dialogue-container">
      <h2>Spanish Dates Vocabulary Test</h2>

      {/* Section 1: Type the English translation for the given Spanish day */}
      <div>
        <h3>Section 1: Type the correct English translation</h3>
        <div>
          <p>1. Martes: <input type="text" name="q1" onChange={handleChange} /></p>
        </div>
        <div>
          <p>2. Miércoles: <input type="text" name="q2" onChange={handleChange} /></p>
        </div>
        <div>
          <p>3. Jueves: <input type="text" name="q3" onChange={handleChange} /></p>
        </div>
        <div>
          <p>4. Lunes: <input type="text" name="q4" onChange={handleChange} /></p>
        </div>
        <div>
          <p>5. Viernes: <input type="text" name="q5" onChange={handleChange} /></p>
        </div>
      </div>

      {/* Section 2: Multiple Choice Questions */}
      <div>
        <h3>Section 2: Choose the correct translation</h3>
        <div>
          <p>6. What does "Fecha" mean?</p>
          <label>
            <input type="radio" name="q6" value="date" onChange={handleChange} />
            Date
          </label>
          <label>
            <input type="radio" name="q6" value="time" onChange={handleChange} />
            Time
          </label>
          <label>
            <input type="radio" name="q6" value="day" onChange={handleChange} />
            Day
          </label>
        </div>
        <div>
          <p>7. What does "Hora" mean?</p>
          <label>
            <input type="radio" name="q7" value="time" onChange={handleChange} />
            Time
          </label>
          <label>
            <input type="radio" name="q7" value="date" onChange={handleChange} />
            Date
          </label>
          <label>
            <input type="radio" name="q7" value="appointment" onChange={handleChange} />
            Appointment
          </label>
        </div>
        <div>
          <p>8. What does "Cita" mean?</p>
          <label>
            <input type="radio" name="q8" value="commitment" onChange={handleChange} />
            Commitment
          </label>
          <label>
            <input type="radio" name="q8" value="date" onChange={handleChange} />
            Date
          </label>
          <label>
            <input type="radio" name="q8" value="appointment" onChange={handleChange} />
            Appointment
          </label>
        </div>
        <div>
          <p>9. What does "Esta semana" mean?</p>
          <label>
            <input type="radio" name="q9" value="this week" onChange={handleChange} />
            This week
          </label>
          <label>
            <input type="radio" name="q9" value="next week" onChange={handleChange} />
            Next week
          </label>
          <label>
            <input type="radio" name="q9" value="last week" onChange={handleChange} />
            Last week
          </label>
        </div>
        <div>
          <p>10. What does "Próxima semana" mean?</p>
          <label>
            <input type="radio" name="q10" value="this week" onChange={handleChange} />
            This week
          </label>
          <label>
            <input type="radio" name="q10" value="next week" onChange={handleChange} />
            Next week
          </label>
          <label>
            <input type="radio" name="q10" value="last week" onChange={handleChange} />
            Last week
          </label>
        </div>
      </div>

      {/* Section 3: Direct Translation */}
      <div>
        <h3>Section 3: Translate the phrases.</h3>
        <p>11. Translate: What day is it today?</p>
        <input type="text" name="q11" onChange={handleChange} placeholder="Enter your answer here" />

        <p>12. Translate: I have an appointment on Friday.</p>
        <input type="text" name="q12" onChange={handleChange} placeholder="Enter your answer here" />

        <p>13. Translate: My commitment is on Tuesday.</p>
        <input type="text" name="q13" onChange={handleChange} placeholder="Enter your answer here" />

        <p>14. Translate: The meeting is at six o'clock.</p>
        <input type="text" name="q14" onChange={handleChange} placeholder="Enter your answer here" />

        <p>15. Translate: She has a commitment this week.</p>
        <input type="text" name="q15" onChange={handleChange} placeholder="Enter your answer here" />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default DateTest;
