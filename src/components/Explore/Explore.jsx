import { useState } from "react";
import "./Explore.css";
import { UilSearch } from "@iconscout/react-unicons";
import { LuBell, LuLayoutDashboard } from "react-icons/lu";
import { IoFilterOutline } from "react-icons/io5";
import profileImage from "../../assets/an-avatar-of-a-brown-guy-looking-at-you-with-cute-smiles-with-transparent-background-hes-wearing-a-627855248.png";

const Explore = () => {
  const [hasNotification, setHasNotification] = useState(true);

  return (
    <div className="explore-container p-0 sm:ml-60">
      {/* Dashboard Header */}
      <div className="explore-header grid grid-cols-3 gap-4 p-4 bg-fff">
        {/* Left: Dashboard Heading */}
        <div className="col-span-1 flex items-center">
          <h1 className="text-2xl font-bold text-gray-800">Explore</h1>
        </div>

        {/* Middle: Empty div for additional content */}
        <div className="col-span-1"></div>

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

      {/* Search Bar and Buttons */}
      <div className="secondary-div additional-content grid grid-cols-3 gap-4 p-4 bg-[#fff]">
        {/* Left: Search Bar */}
        <div className="col-span-1 items-center relative search-bar bg-white rounded-md">
          {/* Search Bar Input */}
          <input
            type="text"
            placeholder="Search..."
            className="border-none outline-none py-2 px-8 w-full placeholder-gray-500 text-gray-800"
          />
          {/* Search Icon */}
          <span className="absolute right-3 text-2xl text-gray-500 search-icon">
            <UilSearch />
          </span>
        </div>

        {/* Middle: Empty div for spacing */}
        <div className="col-span-1"></div>

        {/* Right: Buttons */}
        <div className="col-span-1 flex items-center justify-end space-x-4">
          <div className="exploreButtons flex items-center">
            {/* Category Button */}
            <button className="exploreButton focus:outline-none flex items-center">
              <LuLayoutDashboard className="text-2xl text-gray-800" />
              <span className="ml-1">Category</span>
            </button>

            {/* Sort By Button */}
            <button className="exploreButton focus:outline-none flex items-center ml-4">
              <IoFilterOutline className="text-2xl" />
              <span className=" ml-1" style={{ paddingRight: "3rem", fontSize:"small"}}>Sort By:</span>
            </button>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Explore;
