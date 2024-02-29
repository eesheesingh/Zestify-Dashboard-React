// Dashboard.jsx
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Dashboard.css";
import { IoFilter } from "react-icons/io5";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { GoEye } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import NotificationPopup from "../NotificationPop/NotificationPopup";
import PageHeader from '../Header/Header';

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
  const [notificationCount, setNotificationCount] = useState(5); // State for notification count
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false); // State to manage notification popup visibility
  const navigate = useNavigate();

  const handleSelect = (ranges) => {
    console.log(ranges); // { selection: { startDate, endDate } }
    setState([ranges.selection]);
    setAnchorEl(null); // Close the popover after selecting the date range
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setNotificationOpen(true); // Open notification popup
    navigate("/explore");
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotificationOpen(false); // Close notification popup
  };

  useEffect(() => {
    // Update notification count whenever hasNotification changes
    setNotificationCount(hasNotification ? 5 : 0);
  }, [hasNotification]);

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
      <PageHeader
        title="Dashboard"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        hasNotification={hasNotification}
        setHasNotification={setHasNotification}
      />

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
      <h3 className="text-xl font-semibold">{channel.channelName}</h3>
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
              <span>Filter</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {channel.linkDetails.map((link, linkIndex) => (
          <tr key={linkIndex}>
            <td>{link.chatLink}</td>
            <td>
              {/* Well-designed dropbox for Agency */}
              <div className="agency-inputs">
                {/* Show the notification bubble for random three rows */}
                {notificationCount > 0 && Math.random() < 0.3 && (
                  <div className="notification-bubble">
                    {notificationCount}
                  </div>
                )}

                {/* Input for agency */}
                <input
                  className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter ID"
                />

                {/* GoEye icon */}
                <span className="eye-icon">
                  {/* Disable the icon if there are no notifications */}
                  <GoEye
                    style={{
                      cursor:
                        notificationCount > 0 ? "pointer" : "not-allowed",
                      opacity: notificationCount > 0 ? 1 : 0.5,
                    }}
                  />
                </span>
              </div>
            </td>
            <td>{link.memberCount + link.leftMemberCount}</td>
            <td>+{link.memberCount}</td>
            <td>-{link.leftMemberCount}</td>
            <td>
              <div style={{ height: "2rem" }} className="mt-2">
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
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
))}
        </div>
      </div>

      {/* Notification Popup */}
      {notificationOpen && (
        <NotificationPopup
          onClose={() => setNotificationOpen(false)}
          notifications={[
            { message: "Notification 1", date: "2024-02-26" },
            { message: "Notification 2", date: "2024-02-27" },
            { message: "Notification 3", date: "2024-02-28" },
          ]}
        />
      )}
    </div>
  );
};

Dashboard.propTypes = {
  chatMembers: PropTypes.any,
};

export default Dashboard;
