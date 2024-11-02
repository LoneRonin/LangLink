import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Calendar.css";

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
      );
    }
    return days;
  };

  return (
    <div className="calendar-container">
      <h2>Interactive Calendar</h2>
      <div className="calendar-header">
        <button onClick={previousMonth}>Previous Month</button>
        <div className="month-year">
          {monthsInEnglish[currentMonth]} {currentYear}
        </div>
        <button onClick={nextMonth}>Next Month</button>
      </div>
      <div className="calendar-grid">
        {daysOfWeekInEnglish.map((day, index) => (
          <div className="day-name" key={index}>{day}</div>
        ))}
        {renderCalendarDays()}
      </div>
      {selectedDate && (
        <div className="selected-date">
          <p><strong>Selected Day:</strong></p>
          <p>
            {daysOfWeekInSpanish[selectedDate.getDay()]}, {selectedDate.getDate()} de {monthsInSpanish[selectedDate.getMonth()]} de {selectedDate.getFullYear()}
          </p>
        </div>
      )}
      
      {/* Add a Link button to navigate back to DateDialogue */}
      <Link to='/lesson/datedialouge' className="back-button">Go to Date Dialouge</Link>
    </div>
  );
};

export default CalendarActivity;
