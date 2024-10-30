//Names: Victor
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons'; // Bell icon import
import React, { useState } from 'react';
import './NotificationsDropdown.css'; // Custom styles for the dropdown

const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Example notifications for now 
  const notifications = [
    "New message from Ethan",
    "Your lesson is available",
    "Daily Quiz Reminder",
  ];

  return (
    <div className="notifications-dropdown">
      <button onClick={toggleDropdown} className="notification-bell">
        <FontAwesomeIcon icon={faBell} /> {/* Use FontAwesomeIcon for the bell icon */}
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div key={index} className="notification-item">
                {notification}
              </div>
            ))
          ) : (
            <div className="notification-item">No new notifications</div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
