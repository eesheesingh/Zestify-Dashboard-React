// Dashboard.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import "./Dashboard.css";
import { UilSearch } from "@iconscout/react-unicons";
import { LuBell } from "react-icons/lu";
import { IoFilter } from "react-icons/io5";
import profileImage from "../../assets/an-avatar-of-a-brown-guy-looking-at-you-with-cute-smiles-with-transparent-background-hes-wearing-a-627855248.png";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
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

const Dashboard = ({ chatMembers }) => {
  const [hasNotification, setHasNotification] = useState(true);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (ranges) => {
    console.log(ranges); // { selection: { startDate, endDate } }
    setState([ranges.selection]);
    setAnchorEl(null); // Close the popover after selecting the date range
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    navigate("/explore");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const getChannelsDetailsByDateRange = () => {
    // Function to filter channels based on the search query
    const filteredChannels = chatMembers.filter((channel) =>
      channel.channelName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const channelsDetails = filteredChannels
      .map((channel) => {
        // Directly use channel.members as we're not filtering by date range
        const members = channel.members;

        const linkDetails = members.reduce((acc, member) => {
          const link = member.chatLink || "None";

          if (!acc[link]) {
            acc[link] = {
              chatLink: link,
              memberCount: 0,
              leftMemberCount: 0,
              uniqueMembers: new Set(),
            };
          }

          if (member.leftAt) {
            acc[link].leftMemberCount++;
          }

          if (!acc[link].uniqueMembers.has(member.memberId)) {
            acc[link].memberCount++;
            acc[link].uniqueMembers.add(member.memberId);
          }

          return acc;
        }, {});

        return {
          channelName: channel.channelName,
          linkDetails: Object.values(linkDetails),
        };
      })
      .filter(Boolean); // Filter out null values to ensure we only return channels with members

    return channelsDetails;
  };

  return (
    <div className="dashboard-container p-0 sm:ml-60">
      {/* Dashboard Header */}
      <div className="dashboard-header grid grid-cols-3 gap-4 mb-4">
        {/* Left: Dashboard Heading */}
        <div className="col-span-1 flex items-center">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
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

      <div className="dashboard-container p-4">
        <h2
          style={{ marginBottom: "1.5rem", marginLeft: "0.5rem" }}
          className="text-2xl font-bold"
        >
          Channel Listing
        </h2>

        {/* Eagle View 1 */}
        <div className="dashboard-view-section mb-4">
          {getChannelsDetailsByDateRange().map((channel, index) => (
            <div className="my-8" key={index}>
              <div key={index} className="channel-heading">
                <h3 className="text-xl font-semibold">
                  {channel.channelName}
                </h3>
              </div>
              <table className="table-list">
                <thead>
                  <tr>
                    <th>Chat Links</th>
                    <th>Request ID</th>
                    <th>Total Member</th>
                    <th>Member Join</th>
                    <th>Member Left</th>
                    <th className="filter-header">
                      <div className="filterIcon">
                        <IoFilter />
                        Filter
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <ul>
                        {channel.linkDetails.map((link, linkIndex) => (
                          <li className="mt-7" key={linkIndex}>
                            {link.chatLink}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      {/* Well-designed dropbox for Agency */}
                      <ul className="agency-dropdown-container">
                        {channel.linkDetails.map((link, linkIndex) => (
                          <li className="mt-4" key={linkIndex}>
                            <input style={{padding: "0.6rem 0 0.3rem 0"}} className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="enter" />
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <ul>
                        {channel.linkDetails.map((link, linkIndex) => (
                          <li className="mt-7" key={linkIndex}>
                            {link.memberCount + link.leftMemberCount}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <ul>
                        {channel.linkDetails.map((link, linkIndex) => (
                          <li className="mt-7" key={linkIndex}>
                            +{link.memberCount}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <ul>
                        {channel.linkDetails.map((link, linkIndex) => (
                          <li className="mt-7" key={linkIndex}>
                            -{link.leftMemberCount}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>
                        {channel.linkDetails.map((link, linkIndex) => (
                      <ul key={linkIndex}>
                          <div style={{height: "2rem"}} className="mt-4">
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
                        </ul>
                           ))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  chatMembers: PropTypes.any,
};

export default Dashboard;
