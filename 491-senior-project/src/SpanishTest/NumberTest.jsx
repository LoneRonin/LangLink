import React, { useState } from 'react';
import './numtests.css';
import apple from './image1.png';
import book from './image2.png';
import orange from './image3.png';
import strawberry from './image4.png';
import pencil from './image5.png';

import { useNavigate } from 'react-router-dom';
const NumberTest = () => {
     const navigate = useNavigate();
  
    const [answers, setAnswers] = useState({
        q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '', q9: '', q10: '', q11: '', q12: '', q13: '', q14: '', q15: ''
      });
    
      const correctAnswers = {
        q1: 'how many', // "Cuántos"
        q2: 'apples', // "Manzanas"
        q3: 'Cinco vasos', // "Five Glasses"
        q4: 'twelve people', // "Doce personas"
        q5: 'recipe', // "Receta"
        q6: 'uno', // "Yo tengo una manzana."
        q7: 'tres', // "Tengo tres libros en mi casa."
        q8: 'cinco', // "Tengo cinco naranjas."
        q9: 'diez', // "Tengo diez fresas."
        q10: 'doce', // "Tengo doce lápices."
        q11: 'Mi libro favorito es tres.', // "Mi libro favorito es tres."
        q12: 'Hay dos manzanas.', // "Hay dos manzanas."
        q13: 'I have five books.', // "Tengo cinco libros."
        q14: 'Tengo tres naranjas.', // "Tengo tres naranjas."
        q15: 'Tengo cuatro manzanas.' // "Tengo cuatro manzanas."
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
          <h2>Spanish Vocabulary Test</h2>
    
          {/* Section 1: Multiple Choice Questions (5 Questions) */}
          <div>
            <h3>Section 1: Choose the correct translation</h3>
            <div>
              <p>1. What is the Spanish translation of "How many"?</p>
              <label>
                <input type="radio" name="q1" value="how many" onChange={handleChange} />
                Cuántos
              </label>
              <label>
                <input type="radio" name="q1" value="apples" onChange={handleChange} />
                Manzanas
              </label>
              <label>
                <input type="radio" name="q1" value="glasses" onChange={handleChange} />
                Vasos
              </label>
            </div>
            <div>
              <p>2. What does "manzanas" mean?</p>
              <label>
                <input type="radio" name="q2" value="apples" onChange={handleChange} />
                Apples
              </label>
              <label>
                <input type="radio" name="q2" value="eggs" onChange={handleChange} />
                Huevos
              </label>
              <label>
                <input type="radio" name="q2" value="recipe" onChange={handleChange} />
                Receta
              </label>
            </div>
            <div>
              <p>3. What is the translation of "5 glasses"?</p>
              <label>
                <input type="radio" name="q3" value="Cinco vasos" onChange={handleChange} />
                Cinco vasos
              </label>
              <label>
                <input type="radio" name="q3" value="Cinco personas" onChange={handleChange} />
                Cinco personas
              </label>
              <label>
                <input type="radio" name="q3" value="Doce vasos" onChange={handleChange} />
                Doce vasos
              </label>
            </div>
            <div>
              <p>4. What is the translation of "12 people"?</p>
              <label>
                <input type="radio" name="q4" value="twelve people" onChange={handleChange} />
                Doce personas
              </label>
              <label>
                <input type="radio" name="q4" value="three people" onChange={handleChange} />
                Tres personas
              </label>
              <label>
                <input type="radio" name="q4" value="two people" onChange={handleChange} />
                Dos personas
              </label>
            </div>
            <div>
              <p>5. What does "receta" mean?</p>
              <label>
                <input type="radio" name="q5" value="recipe" onChange={handleChange} />
                Recipe
              </label>
              <label>
                <input type="radio" name="q5" value="eggs" onChange={handleChange} />
                Huevos
              </label>
              <label>
                <input type="radio" name="q5" value="apples" onChange={handleChange} />
                Manzanas
              </label>
            </div>
          </div>
    
          {/* Section 2: Visual Input Section for Quantities */}
          <div>
            <h3>Section 2: Type the Spanish translation for the quantity of items shown in the picture.</h3>
            <div>
              <img src= {apple} alt="1 apple" />
              <p>1. One apple: <input type="text" name="q6" onChange={handleChange} /></p>
            </div>
            <div>
              <img src={book} alt="3 books" />
              <p>2. Three books: <input type="text" name="q7" onChange={handleChange} /></p>
            </div>
            <div>
              <img src={orange} alt="5 oranges" />
              <p>3. Five oranges: <input type="text" name="q8" onChange={handleChange} /></p>
            </div>
            <div>
              <img src={strawberry} alt="10 strawberries" />
              <p>4. Ten strawberries: <input type="text" name="q9" onChange={handleChange} /></p>
            </div>
            <div>
              <img src={pencil} alt="12 pencils" />
              <p>5. Twelve pencils: <input type="text" name="q10" onChange={handleChange} /></p>
            </div>
          </div>
          {/* Section 3: Mixed Translation Questions */}
          <div>
            <h3>Section 3: Translate the phrases.</h3>
            <p>11. Translate: My favorite book is three.</p>
            <input type="text" name="q11" onChange={handleChange} placeholder="Enter your answer here" />
    
            <p>12. Translate: There are two apples.</p>
            <input type="text" name="q12" onChange={handleChange} placeholder="Enter your answer here" />
    
            <p>13. Translate: Tengo cinco libros.</p>
            <input type="text" name="q13" onChange={handleChange} placeholder="Enter your answer here" />
    
            <p>14. Translate: I have three oranges.</p>
            <input type="text" name="q14" onChange={handleChange} placeholder="Enter your answer here" />
    
            <p>15. Translate: I have four apples.</p>
            <input type="text" name="q15" onChange={handleChange} placeholder="Enter your answer here" />
          </div>
    
          <button type="submit">Submit</button>
          <button className="back-button" onClick={() => navigate('/lessons')}>
          Back to Lessons
        </button>
        </form>);};
export default NumberTest;
