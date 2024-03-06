// PageHeader.jsx
import { useState } from "react";
import './Header.css'
import { UilSearch } from "@iconscout/react-unicons";
import { LuBell } from "react-icons/lu";
import { motion } from "framer-motion";
import profileImage from "../../assets/an-avatar-of-a-brown-guy-looking-at-you-with-cute-smiles-with-transparent-background-hes-wearing-a-627855248.png";
import PropTypes from "prop-types";
import ProfileSidebar from "../Profile/ProfileSidebar";
import NotificationPopup from "../NotificationPop/NotificationPopup";

const PageHeader = ({ title, searchQuery, setSearchQuery }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [isProfileSidebarOpen, setProfileSidebarOpen] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  // Simplified notification click handling
  const handleNotificationClick = () => {
    setShowNotificationPopup(true);
  };

  return (
    <motion.div  className="dashboard-header grid grid-cols-3 gap-4 mb-4"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}>
      {/* Left: Dashboard Heading */}
      <div className="col-span-1 flex items-center">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </div>

      {/* Middle: Search Bar with Search Icon */}
      <div className="col-span-1 flex items-center relative search-bar bg-white rounded-md">
        {/* Search Bar Input */}
        <input
          type="text"
          placeholder="Search..."
          className="border-none outline-none py-2 px-8 w-full placeholder-gray-500 text-gray-800"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* Search Icon */}
        <span className="absolute right-3 text-2xl text-gray-500 search-icon">
          <UilSearch />
        </span>
      </div>

      {/* Right: Bell Icon and Circular Profile Image */}
      <div className="col-span-1 flex items-center justify-end space-x-4">
        <div className="relative text-gray-800">
          {/* Bell Icon with notification dot */}
          <button
            className="focus:outline-none"
            onClick={handleNotificationClick}
          >
            <div
              className={`text-2xl bell-icon has-notification`}
              title="Notification"
            >
              <LuBell className="bell" />
            </div>
          </button>
          {showNotificationPopup && (
            <NotificationPopup
              onClose={() => setShowNotificationPopup(false)}
            />
          )}
        </div>

        <div className="profile-image-container">
          {/* Circular Profile Image with onClick to open the sidebar */}
          <button title="Profile" onClick={() => setProfileSidebarOpen(true)}>
            <img
              src={
                profilePicture
                  ? URL.createObjectURL(profilePicture)
                  : profileImage
              }
              alt="Profile"
              className="profile-image"
            />
          </button>
        </div>
      </div>

      {/* Render the ProfileSidebar when isProfileSidebarOpen is true */}
      {isProfileSidebarOpen && (
        <ProfileSidebar
          onClose={() => setProfileSidebarOpen(false)}
          setProfilePicture={setProfilePicture}
        />
      )}
    </motion.div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  setHasNotification: PropTypes.func.isRequired,
};

export default PageHeader;