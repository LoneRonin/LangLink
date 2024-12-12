import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import './NotificationsDropDown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const NotificationsDropdown = () => {
    const [notifications, setNotifications] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const auth = getAuth();
    const user = auth.currentUser;

    // Fetch Notifications
    useEffect(() => {
        const fetchNotifications = async () => {
            if (user) {
                try {
                    const notifCollection = collection(db, "users", user.uid, "notifications");
                    const notifQuery = query(notifCollection);
                    const querySnapshot = await getDocs(notifQuery);

                    const notifList = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    // Sort notifications by timestamp (most recent first)
                    notifList.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);

                    setNotifications(notifList);
                    console.log("Fetched notifications:", notifList); // Debug log

                } catch (error) {
                    console.error("Error fetching notifications:", error);
                }
            }
        };

        fetchNotifications();
    }, [user]);

    // Toggle Dropdown
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <div className="notificationsDropdown">
            <button onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faBell} />
                {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
            </button>

            {dropdownVisible && (
                <div className="dropdownMenu">
                    <h4>Notifications</h4>
                    <ul>
                        {notifications.length === 0 ? (
                            <li>No notifications</li>
                        ) : (
                            notifications.map((notif) => (
                                <li key={notif.id} className="notificationItem">
                                    <p>{notif.message}</p>
                                    <span>{new Date(notif.timestamp.seconds * 1000).toLocaleString()}</span>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NotificationsDropdown;