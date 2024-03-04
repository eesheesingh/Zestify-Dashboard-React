// NotificationPopup.js
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import './NotificationPopup.css'

const notificationsData = [
  "Notification 1 content.",
  "Notification 2 content.",
  "Notification 3 content.",
];

const NotificationPopup = ({ onClose }) => {
  const [notifications, setNotifications] = useState(notificationsData);

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("notification-popup")) {
      onClose();
    }
  };

  const handleNotificationClose = (index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(index, 1);
    setNotifications(updatedNotifications);
  };

  return (
    <div className="notification-popup" onClick={handleClickOutside}>
      <div className="close-icon" onClick={onClose}>
        <FaTimes />
      </div>
      <div className="notifications-container">
        {notifications.map((notification, index) => (
          <div key={index} className="notification">
            <p>{notification}</p>
            <div className="close-icon" onClick={() => handleNotificationClose(index)}>
              <FaTimes />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPopup;
