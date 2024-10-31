import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Lessons.css';

const languageMap = {
  es: 'Spanish',
  jp: 'Japanese',
};

const Lesson = ({ language }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const languageName = languageMap[language] || 'Language';
    document.title = `Start Learning ${languageName}`;
  }, [language]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="circles-container">
      <h1>Start Learning {languageMap[language] || 'Language'}!</h1>
      <button className="circle-button" style={{ top: '120px', left: '-50px' }} onClick={() => handleNavigation('/alpha')}>Alphabet</button>
      <button className="circle-button" style={{ top: '120px', left: '450px' }} onClick={() => handleNavigation('/grammar')}>Grammar</button>
      <button className="circle-button" style={{ top: '280px', left: '250px' }} onClick={() => handleNavigation('/color')}>Colors</button>
      <button className="circle-button" style={{ top: '370px', left: '-75px' }} onClick={() => handleNavigation('/number')}>Numbers</button>
      <button className="circle-button" style={{ top: '390px', left: '500px' }} onClick={() => handleNavigation('/grammar/conjugate-es')}>Date</button>
    </div>
  );
};

export default Lesson;
