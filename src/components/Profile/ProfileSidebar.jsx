// ProfileSidebar.jsx
import React, { useState } from "react";
import './ProfileSidebar.css';

const ProfileSidebar = ({ onClose, setProfilePicture }) => {
  const [profilePicture, setLocalProfilePicture] = useState(null);
  const [isActive, setIsActive] = useState(true);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    // Perform any necessary validation before setting the profile picture
    setLocalProfilePicture(file);
    setProfilePicture(file); // Pass the updated picture to the parent component
  };

  // Dummy data for demonstration
  const chatId = "12345";
  const email = "user@example.com";
  const phoneNumber = "123-456-7890";
  const username = "john_doe";

  return (
    <div className={`profile-sidebar ${isActive ? 'active' : ''}`}>
      {/* Profile Picture Section */}
      <div className="profile-picture-container">
        <label htmlFor="profile-picture-input">
          <img
            src={profilePicture ? URL.createObjectURL(profilePicture) : "default-profile-image.jpg"}
            alt="Profile"
            className="profile-picture"
          />
          <div className="upload-icon">
            <i className="fas fa-camera"></i>
          </div>
        </label>
        {/* Input for uploading a new profile picture */}
        <input
          id="profile-picture-input"
          type="file"
          accept="image/*"
          onChange={handlePictureChange}
          style={{ display: "none" }}
        />
      </div>

      {/* User Information Section */}
      <div className="user-info">
        <p><strong>Chat ID:</strong> {chatId}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone Number:</strong> {phoneNumber}</p>
        <p><strong>Username:</strong> {username}</p>
      </div>

      {/* Close button to hide the sidebar */}
      <button onClick={onClose} className="close-button">Close</button>
    </div>
  );
};

export default ProfileSidebar;
