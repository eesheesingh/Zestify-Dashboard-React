// PageHeader.jsx
import { UilSearch } from "@iconscout/react-unicons";
import { LuBell } from "react-icons/lu";
import profileImage from "../../assets/an-avatar-of-a-brown-guy-looking-at-you-with-cute-smiles-with-transparent-background-hes-wearing-a-627855248.png";
import PropTypes from "prop-types";

const PageHeader = ({ title, searchQuery, setSearchQuery, hasNotification, setHasNotification }) => {
  return (
    <div className="dashboard-header grid grid-cols-3 gap-4 mb-4">
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
            onClick={() => setHasNotification(!hasNotification)}
          >
            <div
              className={`text-2xl bell-icon ${
                hasNotification ? "has-notification" : ""
              }`}
            >
              <LuBell className="bell" />
            </div>
            {hasNotification && <div className="notification-dot"></div>}
          </button>
        </div>

        <div className="profile-image-container">
          {/* Circular Profile Image */}
          <img src={profileImage} alt="Profile" className="profile-image" />
        </div>
      </div>
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  hasNotification: PropTypes.bool.isRequired,
  setHasNotification: PropTypes.func.isRequired,
};

export default PageHeader;
