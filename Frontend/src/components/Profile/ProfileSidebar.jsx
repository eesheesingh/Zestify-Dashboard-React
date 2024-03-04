// ProfileSidebar.jsx
import { useState } from "react";
import { FaTimes } from 'react-icons/fa';
import "./ProfileSidebar.css"; // Import your Tailwind CSS file

const ProfileSidebar = ({ onClose, setProfilePicture }) => {
  const [profilePicture, setLocalProfilePicture] = useState(null);
  const [isActive, setIsActive] = useState(true);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setLocalProfilePicture(file);
    setProfilePicture(file);
  };

  const chatId = "12345";
  const email = "user@example.com";
  const phoneNumber = "123-456-7890";
  const username = "john_doe";

  return (
    <div className={`profile-sidebar ${isActive ? "active" : ""} bg-white p-4 fixed top-0 right-0 h-full w-64 shadow-md z-50 transition-transform duration-300 ease-in-out transform`}>
      <div className="profile-picture-container mb-4">
        <h1 className="Profile-heading">Your Profile</h1>
        <label htmlFor="profile-picture-input" className="profile-picture-label relative cursor-pointer">
          <img
            src={profilePicture ? URL.createObjectURL(profilePicture) : "default-profile-image.jpg"}
            alt="Profile"
            className="profile-picture rounded-full w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-105"
          />
          <div className="overlay absolute top-0 left-0 w-full h-full bg-opacity-60 bg-black flex justify-center items-center opacity-0 transition-opacity duration-300 ease-in-out rounded-full">
            <div className="upload-icon text-white text-xl cursor-pointer">
              <i className="fas fa-camera"></i>
            </div>
            <input
              id="profile-picture-input"
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
              className="hidden-input absolute w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </label>
      </div>

      <div className="user-info text-center mb-4">
        <p className="mb-2">
          <strong>Chat ID:</strong> {chatId}
        </p>
        <p>
          <strong>Username:</strong> {username}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {email}
        </p>
        <p className="mb-2">
          <strong>Phone Number:</strong> {phoneNumber}
        </p>
      </div>

      <div className="close-icon absolute top-4 right-4 cursor-pointer" onClick={onClose}>
        <FaTimes className="text-red-500 text-2xl hover:text-red-600" />
      </div>
    </div>
  );
};

export default ProfileSidebar;
