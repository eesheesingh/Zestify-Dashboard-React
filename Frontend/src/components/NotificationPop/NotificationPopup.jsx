// NotificationPopup.js
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import "./NotificationPopup.css";

const notificationsData = [
  "Notification 1 content.",
  "Notification 2 content.",
  "Notification 3 content.",
];

const NotificationPopup = ({ onClose }) => {
  const [notifications, setNotifications] = useState(notificationsData);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      // Close the notification when scrolled down
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onClose]);

  const handleNotificationClose = () => {
    // Close the notification with an animation
    setNotifications([]);
    setTimeout(() => onClose(), 300); // Adjust the timeout based on your animation duration
  };

  return (
    <AnimatePresence>
      {notifications.length > 0 && (
        <motion.div
          className="notification-popup"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="close-icon" onClick={handleNotificationClose}>
            <FaTimes />
          </div>
          <div className="notifications-container">
            {notifications.map((notification, index) => (
              <motion.div
                key={index}
                className="notification"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <p>{notification}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationPopup;
