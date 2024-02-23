import { useState } from "react";
import "./Explore.css";
import { UilSearch } from "@iconscout/react-unicons";
import { LuBell, LuLayoutDashboard } from "react-icons/lu";
import { IoFilterOutline } from "react-icons/io5";
import { FaAngleLeft } from "react-icons/fa6";
import { addDays } from "date-fns";
import { IoFilter } from "react-icons/io5";
import { DateRangePicker } from "react-date-range";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";

import profileImage from "../../assets/an-avatar-of-a-brown-guy-looking-at-you-with-cute-smiles-with-transparent-background-hes-wearing-a-627855248.png";
import { useNavigate } from "react-router-dom";

const CustomButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      style={{
        backgroundColor: "transparent",
        color: "#4a5568",
        border: "1px solid #4a5568",
        borderRadius: "8px",
      }}
    >
      <BsCalendarDateFill />
      <span style={{ marginLeft: "0.5rem", textTransform: "none" }}>
        Date Range
      </span>
      <MdKeyboardArrowDown />
    </Button>
  );
};

const Explore = () => {
  const navigate = useNavigate();
  const [hasNotification, setHasNotification] = useState(true);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleSelect = (ranges) => {
    console.log(ranges); // { selection: { startDate, endDate } }
    setState([ranges.selection]);
    setAnchorEl(null); // Close the popover after selecting the date range
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
              <span className="ml-1" style={{ fontSize: "small" }}>
                Category
              </span>
            </button>

            {/* Sort By Button */}
            <button className="exploreButton focus:outline-none flex items-center ml-4">
              <IoFilterOutline className="text-2xl" />
              <span
                className=" ml-1"
                style={{ paddingRight: "3rem", fontSize: "small" }}
              >
                Sort By:
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="back-button flex items-center text-2xl font-bold p-6">
        <button onClick={() => navigate("/dashboard")}><FaAngleLeft /></button>
        <span className="ml-1">Back</span>
      </div>

      {/* Additional Divs below Eagle View */}
      <div className="exploreContainer mx-5 bg-[#fff]">
        <div className="exploreHeading text-2xl font-bold p-4">
          <h2>Eagle View</h2>
        </div>
        <div className="channelOptions flex place-content-between pt-5 px-6">
          <div className="chatLinks flex">
            <h3 className="mr-2 channel-heads">Chat Links:</h3> <p>https://t.me/+qCJbGLeN</p>
          </div>

          <div className="AgencyOptions flex text-neutral-600">
            <h3 className="mr-2 channel-heads ">Agency:</h3>
            <p>
              <select className="agency-dropdown" defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                <option value="Agency A">Agency A</option>
                <option value="Agency B">Agency B</option>
                <option value="Agency C">Agency C</option>
              </select>
            </p>
          </div>
          <div className="filterOptions flex">
          <div className="filterIcon channel-heads mr-2">
            <IoFilter />
            Filter:
          </div>
          <div className="date-range px-1">
                      <CustomButton onClick={handleClick} />
                      <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <DateRangePicker
                          onChange={handleSelect}
                          showSelectionPreview={true}
                          moveRangeOnFirstSelection={false}
                          months={1}
                          ranges={state}
                          direction="horizontal"
                        />
                      </Popover>
                    </div>
          </div>
        </div>
        <div className="channelResult px-5 pb-3">
  <table className="channel-table">
    <thead>
      <tr className="exploreChannels">
        <th>Date</th>
        <th>Total Members</th>
        <th>Members Join</th>
        <th>Members Left</th>
      </tr>
    </thead>
    <tbody>
        <tr className="channel-numbers">
          <td>12/02/2024</td>
          <td>1000</td>
          <td>+100</td>
          <td>-10</td>
        </tr>

        <tr className="channel-numbers">
          <td>13/02/2024</td>
          <td>1000</td>
          <td>+100</td>
          <td>-10</td>
        </tr>

        <tr className="channel-numbers">
          <td>14/02/2024</td>
          <td>1000</td>
          <td>+100</td>
          <td>-10</td>
        </tr>

        <tr className="channel-numbers">
          <td>15/02/2024</td>
          <td>1000</td>
          <td>+100</td>
          <td>-10</td>
        </tr>

        <tr className="channel-numbers">
          <td>16/02/2024</td>
          <td>1000</td>
          <td>+100</td>
          <td>-10</td>
        </tr>
    </tbody>
  </table>
</div>
      </div>
    </div>
  );
};

export default Explore;
