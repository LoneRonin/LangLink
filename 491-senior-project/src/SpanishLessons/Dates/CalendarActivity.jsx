import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Calendar.css";
import { useNavigate } from 'react-router-dom';
// Spanish translations
const monthsInSpanish = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const daysOfWeekInSpanish = [
  "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
];

const monthsInEnglish = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const daysOfWeekInEnglish = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

const CalendarActivity = () => {
     const navigate = useNavigate();
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Generate days for the current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handleDateClick = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    setSelectedDate(date);
  };

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prevYear) => prevYear - 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
    setSelectedDate(null); // Reset selected date on month change
  };
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prevYear) => prevYear + 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    }
    setSelectedDate(null); // Reset selected date on month change
  };

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div className="calendar-day empty" key={`empty-${i}`}></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          key={day}
          className="calendar-day clickable"
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      ); } return days; };
  return (
    <div className="calendar-container">
      <h1>Interactive Calendar</h1>
      <div className="calendar-header">
        <btn onClick={previousMonth}>{"<<"}</btn>
        <h1>
          {monthsInEnglish[currentMonth]} {currentYear}
        </h1>
        <btn onClick={nextMonth}>{">>"}</btn>
      </div>
      <div className="calendar-grid">
        {daysOfWeekInEnglish.map((day, index) => (
          <div className="day-name" key={index}>{day}</div>
        ))}
        {renderCalendarDays()}
      </div>
      {selectedDate && (
        <div className="selected-date">
          <h1><strong>Selected Day:</strong></h1>
          <h1>
            {daysOfWeekInSpanish[selectedDate.getDay()]}, {selectedDate.getDate()} de {monthsInSpanish[selectedDate.getMonth()]} de {selectedDate.getFullYear()}
          </h1>
        </div>
      )}
      
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate('/lessons')}>
          Back to Lessons
        </button>
        <button className="numlesson-button" onClick={() => navigate("/date")}>
          Do Flashcards
        </button>
        <button className="numlesson-button" onClick={() => navigate("/lesson/datedialouge")}>
          Learn Vocabulary
        </button>
        <button className="numlesson-button" onClick={() => navigate("/lesson/datetest")}>
          Take Test
        </button>
      </div>
      </div>
  );
};

export default CalendarActivity;
