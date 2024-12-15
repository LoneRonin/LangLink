import React, { useState } from 'react';
import './colortests.css'; // Add CSS as needed for styling
import { useNavigate } from 'react-router-dom';
const ColorTest = () => {
    const navigate = useNavigate();
  
    const [answers, setAnswers] = useState({
        q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '', q9: '', q10: '', q11: '', q12: ''
      });
    
      const correctAnswers = {
        q1: 'azul', q2: 'verde', q3: 'naturaleza', q4: 'amarillo', q5: 'alegre',
        q6: 'encanto', q7: 'alegre', q8: 'bright', q9: 'azul',
        q10: 'Mi color favorito es verde.', 
        q11: 'El morado tiene su encanto.', 
        q12: 'El amarillo es alegre.'
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
        alert(`Your total score is: ${score} / 12`);
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <h2>Spanish Test: Colors</h2>
          {/* Section 1: Fill-in-the-Blank with Dropdown Options (5 Questions) */}
          <div>
            <p>1. Fill in the blanks with the appropriate word </p>
            <p>Miguel: Hola, mi nombre es Miguel. Mi color favorito es el 
            <select className="color-dropdown" name="q1" onChange={handleChange}><option value=""></option><option value="azul">azul</option><option value="alegría">alegría</option><option value="elegante">elegante</option></select> porque es muy tranquilo.
            Me gusta también el <select className="color-dropdown" name="q2" onChange={handleChange}><option value=""></option><option value="verde">verde</option><option value="azul">azul</option><option value="favorito">favorito</option></select> porque me recuerda a la 
            <select className="color-dropdown" name="q3" onChange={handleChange}><option value=""></option><option value="naturaleza">naturaleza</option><option value="verde">verde</option><option value="favorito">favorito</option></select>.
            A veces, disfruto de colores brillantes como el 
                <select className="color-dropdown" name="q4" onChange={handleChange}><option value=""></option><option value="amarillo">amarillo</option><option value="naturaleza">naturaleza</option><option value="favorito">favorito</option></select>, ya que es un color muy 
                <select className="color-dropdown" name="q5" onChange={handleChange}><option value=""></option><option value="alegre">alegre</option><option value="amarillo">amarillo</option><option value="azul">azul</option></select>.</p>
          </div>
    
          {/* Section 2: Multiple-Choice with Radio Buttons in a 2x2 Grid */}
 
            <div>
              <p>2. What is the Spanish word for "charm"?</p>
              <label><input type="radio" name="q6" value="brillante" onChange={handleChange} /> Brillante</label>
              <label><input type="radio" name="q6" value="encanto" onChange={handleChange} /> Encanto</label>
              <label><input type="radio" name="q6" value="elegante" onChange={handleChange} /> Elegante</label>
              <label><input type="radio" name="q6" value="favorito" onChange={handleChange} /> Favorito</label>
            </div>
    
            <div>
              <p>3. What is the Spanish translation of "cheerful"?</p>
              <label><input type="radio" name="q7" value="alegre" onChange={handleChange} /> Alegre</label>
              <label><input type="radio" name="q7" value="triste" onChange={handleChange} /> Triste</label>
              <label><input type="radio" name="q7" value="serio" onChange={handleChange} /> Serio</label>
              <label><input type="radio" name="q7" value="encanto" onChange={handleChange} /> Encanto</label>
            </div>
    
            <div>
              <p>4. What does "brillante" mean in English?</p>
              <label><input type="radio" name="q8" value="cheerful" onChange={handleChange} /> Cheerful</label>
              <label><input type="radio" name="q8" value="elegant" onChange={handleChange} /> Elegant</label>
              <label><input type="radio" name="q8" value="bright" onChange={handleChange} /> Bright</label>
              <label><input type="radio" name="q8" value="blue" onChange={handleChange} /> Blue</label>
            </div>
    
            <div>
              <p>5. What is the Spanish word for "blue"?</p>
              <label><input type="radio" name="q9" value="azul" onChange={handleChange} /> Azul</label>
              <label><input type="radio" name="q9" value="verde" onChange={handleChange} /> Verde</label>
              <label><input type="radio" name="q9" value="morado" onChange={handleChange} /> Morado</label>
              <label><input type="radio" name="q9" value="amarillo" onChange={handleChange} /> Amarillo</label>
            </div>

    
          {/* Section 3: Translation Exercises */}
          <div>
            <p>6. Translate to Spanish: "My favorite color is green."</p>
            <input type="text" name="q10" onChange={handleChange} placeholder="Type your answer here" />
    
            <p>7. Translate to Spanish: "Purple has its charm."</p>
            <input type="text" name="q11" onChange={handleChange} placeholder="Type your answer here" />
    
            <p>8. Translate to Spanish: "Yellow is cheerful."</p>
            <input type="text" name="q12" onChange={handleChange} placeholder="Type your answer here" />
          </div>
    
          <button type="submit">Submit</button>
          <button className="back-button" onClick={() => navigate('/lessons')}>
          Back to Lessons
        </button>
        </form>
      );
    };
    

export default ColorTest;
