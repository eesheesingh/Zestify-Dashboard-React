// ProfileSidebar.jsx
import { useState, useEffect } from "react";
import { FaTimes, FaCamera } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import { motion } from "framer-motion";
import "./ProfileSidebar.css";

const ProfileSidebar = ({ onClose, setProfilePicture }) => {
  const [profilePicture, setLocalProfilePicture] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("john_doe"); // Initial username
  const [editedEmail, setEditedEmail] = useState("user@example.com"); // Initial email

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        setIsEditing(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setLocalProfilePicture(file);
    setProfilePicture(file);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEditedEmail(e.target.value);
  };

  const chatId = "12345";
  const phoneNumber = "123-456-7890";

  return (
    <motion.div
      className={`profile-sidebar ${isActive ? "active" : ""}`}
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
    >
      <div className="profile-heading">
        <h1>Your Profile</h1>
      </div>

      <div className="profile-picture-container mb-4">
        <label htmlFor="profile-picture-input" className="profile-picture-label">
          <img
            src={profilePicture ? URL.createObjectURL(profilePicture) : "default-profile-image.jpg"}
            alt="Profile"
            className="profile-picture"
          />
          <div className="overlay">
            <FaCamera className="upload-icon" />
            <input
              id="profile-picture-input"
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
              className="hidden-input"
            />
          </div>
        </label>
      </div>

      <div className="user-info mb-4">
        <p>
          <strong>
             Chat ID:
          </strong>{" "}
          {chatId}
          <MdLock />
        </p>
        <motion.div
          className="editable-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p>
            <strong>
              Username:{" "}
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={editedName}
                    onChange={handleNameChange}
                    className="editable-input"
                    placeholder="Enter your username"
                  />
                </>
              ) : (
                <>
                  {editedName}
                </>
              )}
            </strong>
          </p>
          <p>
            <strong>
              Email:{" "}
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={editedEmail}
                    onChange={handleEmailChange}
                    className="editable-input"
                    placeholder="Enter your email"
                  />
                </>
              ) : (
                <>
                  {editedEmail}
                </>
              )}
            </strong>
          </p>
        </motion.div>
        <p>
          <strong>
            Phone Number:
          </strong>{" "}
          {phoneNumber}
          <MdLock /> 
        </p>
        <button className="edit-button" onClick={handleEditToggle}>
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      <div className="close-icon" onClick={onClose}>
        <FaTimes />
      </div>
    </motion.div>
  );
};

export default ProfileSidebar;
