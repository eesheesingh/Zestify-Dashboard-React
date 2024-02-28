import { useState } from "react";
import PropTypes from "prop-types";
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
import { useLocation, useNavigate } from "react-router-dom";
import NotificationPopup from "../NotificationPop/NotificationPopup";

const Explore = ({ chatMembers }) => {
  const navigate = useNavigate();
  const [hasNotification, setHasNotification] = useState(true);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const handleNotificationClick = () => {
    setHasNotification(false);
    setShowNotificationPopup(true);
  };

  const closeNotificationPopup = () => {
    setShowNotificationPopup(false);
  };

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

  const getChannelsDetailsByDateRange = (linkId, ranges) => {
    // Function to filter channels based on the search query
    const filteredChannels = chatMembers.filter((channel) =>
      channel.channelName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const channelsDetails = filteredChannels.map((channel) => {
      // Filter members based on the chat link and date range
      const membersInDateRange = channel.members.filter((member) => {
        const joinedDate = new Date(member.joinedAt);
        return (
          member.chatLink === linkId &&
          joinedDate >= ranges.selection.startDate &&
          joinedDate <= ranges.selection.endDate
        );
      });

      // Initialize an object to store members grouped by join date
      const membersByJoinDate = {};

      // Group members by join date
      membersInDateRange.forEach((member) => {
        const joinedDate = new Date(member.joinedAt).toLocaleDateString(); // Get the join date
        if (!membersByJoinDate[joinedDate]) {
          membersByJoinDate[joinedDate] = {
            total: 0,
            joined: 0,
            left: 0,
          };
        }
        membersByJoinDate[joinedDate].total++;
        if (!member.leftAt) {
          membersByJoinDate[joinedDate].joined++;
        } else {
          membersByJoinDate[joinedDate].left++;
        }
      });

      // Convert the object into an array of objects for easier rendering
      const data = Object.entries(membersByJoinDate).map(([date, counts]) => ({
        date,
        total: counts.total,
        joined: counts.joined,
        left: counts.left,
      }));

      return {
        channelName: channel.channelName,
        data,
      };
    });

    return channelsDetails;
  };
  const { linkId, ranges } = location.state;
  const channelsDetails = getChannelsDetailsByDateRange(linkId, ranges);

  return (
    <div className="explore-container p-0 sm:ml-60">
      <div className="explore-header grid grid-cols-3 gap-4 p-4 bg-fff">
        <div className="col-span-1 flex items-center">
          <h1 className="text-2xl font-bold text-gray-800">Explore</h1>
        </div>

        <div className="col-span-1"></div>

        <div className="col-span-1 flex items-center justify-end space-x-4">
          <div className="col-span-1 relative text-gray-800">
            <button
              className="focus:outline-none"
              onClick={handleNotificationClick}
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
            {showNotificationPopup && (
              <NotificationPopup onClose={closeNotificationPopup} />
            )}
          </div>

          <div
            className="profile-image-container"
            style={{ cursor: "pointer" }}
          >
            <img
              src={profileImage}
              alt="Profile"
              className="profile-image"
              onClick={() => navigate("/profile")}
            />
          </div>
        </div>
      </div>

      <div className="secondary-div additional-content grid grid-cols-3 gap-4 p-4 bg-[#fff]">
        <div className="col-span-1 items-center relative search-bar bg-white rounded-md">
          <input
            type="text"
            placeholder="Search..."
            className="border-none outline-none py-2 px-8 w-full placeholder-gray-500 text-gray-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute right-3 text-2xl text-gray-500 search-icon">
            <UilSearch />
          </span>
        </div>

        <div className="col-span-1"></div>

        <div className="col-span-1 flex items-center justify-end space-x-4">
          <div className="exploreButtons flex items-center">
            <button className="exploreButton focus:outline-none flex items-center">
              <LuLayoutDashboard className="text-2xl text-gray-800" />
              <span className="ml-1" style={{ fontSize: "small" }}>
                Category
              </span>
            </button>

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

      <div className="back-button flex items-center text-2xl font-bold p-6">
        <button
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => navigate("/")}
        >
          <FaAngleLeft />
          <span className="ml-1">Back</span>
        </button>
      </div>
      {channelsDetails.map((channelDetail, index) => (
        <div key={index} className="exploreContainer mx-5 bg-[#fff]">
          <div className="exploreHeading text-2xl font-bold p-4">
            <h2>{channelDetail.channelName}</h2>
          </div>
          <div className="channelOptions flex place-content-between pt-5 px-6">
            {channelDetail.linkDetails &&
              channelDetail.linkDetails.map((linkDetail, linkIndex) => (
                <div key={linkIndex} className="chatLinks flex">
                  <h3 className="mr-2 channel-heads">Chat Links:</h3>{" "}
                  <p>{linkDetail.chatLink}</p>
                </div>
              ))}
            <div className="filterOptions flex">
              <div className="filterIcon channel-heads mr-2">
                <IoFilter />
                Filter:
              </div>
              <div className="date-range px-1">
                <Button
                  onClick={handleClick}
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
                {channelDetail.data &&
                  channelDetail.data.map((item, index) => (
                    <tr key={index} className="channel-numbers">
                      <td>{item.date}</td>
                      <td>{item.total}</td>
                      <td>{item.joined}</td>
                      <td>{item.left}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

Explore.propTypes = {
  chatMembers: PropTypes.any,
};

export default Explore;
