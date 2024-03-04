// Dashboard.jsx
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Dashboard.css";
import { IoFilter } from "react-icons/io5";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { BsCalendarDateFill } from "react-icons/bs";
import { GoEye } from "react-icons/go";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PageHeader from "../Header/Header";

const Dashboard = ({ chatMembers }) => {
  const [hasNotification, setHasNotification] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationCount, setNotificationCount] = useState(5);
  const [linkDateRanges, setLinkDateRanges] = useState({});
  const navigate = useNavigate();

  const handleSelect = (linkId, ranges, channelName) => {
    let finalLinkId = linkId;
    if (linkId === "None") {
      finalLinkId = `${channelName}-None`;
    }
    setLinkDateRanges((prevState) => ({
      ...prevState,
      [finalLinkId]: ranges.selection,
    }));
    navigate("/explore", { state: { linkId: finalLinkId, ranges } });
  };

  const handleRequest = (link) => {
    navigate("/requests", {state: { chatLink: link }});
  }

  const handleClick = (event, linkId) => {
    setAnchorEl(event.currentTarget);
    // Update the linkId in the state
    setLinkDateRanges((prevState) => ({
      ...prevState,
      [linkId]: prevState[linkId]
        ? null
        : { startDate: new Date(), endDate: new Date() },
    }));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // Update notification count whenever hasNotification changes
    setNotificationCount(hasNotification ? 5 : 0);
  }, []);

  const getChannelsDetailsByDateRange = () => {
    if (!chatMembers) {
      return [];
    }

    const filteredChannels = chatMembers.filter((channel) =>
      channel.channelName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const channelsDetails = filteredChannels
      .map((channel) => {
        const members = channel.members;

        const linkDetails = members.reduce((acc, member) => {
          const link = member.chatLink || `${channel.channelName}-None`;

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
      .filter(Boolean);

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
                        <div className="agency-inputs">
                          {notificationCount > 0 && Math.random() < 0.3 && (
                            <div className="notification-bubble">
                              {notificationCount}
                            </div>
                          )}
                          <input
                            name={link.chatLink}
                            className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Enter ID"
                          />
                          <button onClick={() => handleRequest(link.chatLink === "None" ? `${channel.channelName}-None`:link.chatLink )}>
                            <span className="eye-icon">
                              <GoEye
                              style={{
                                cursor:
                                  notificationCount > 0 ? "pointer" : "not-allowed", opacity: notificationCount > 0 ? 1 : 0.5,
                              }}
                            />
                            </span>
                          </button>
                        </div>
                      </td>
                      <td>{link.memberCount}</td>
                      <td>+{link.memberCount - link.leftMemberCount}</td>
                      <td>-{link.leftMemberCount}</td>
                      <td>
                        <div style={{ height: "2rem" }} className="mt-2">
                          <Button
                            onClick={(event) =>
                              handleClick(
                                event,
                                link.chatLink === "None"
                                  ? `${channel.channelName}-None`
                                  : link.chatLink
                              )
                            }
                            style={{
                              backgroundColor: "transparent",
                              color: "#4a5568",
                              border: "1px solid #4a5568",
                              borderRadius: "8px",
                            }}
                          >
                            <BsCalendarDateFill />
                            <span
                              style={{
                                marginLeft: "0.5rem",
                                textTransform: "none",
                              }}
                            >
                              Date Range
                            </span>
                            <MdKeyboardArrowDown />
                          </Button>
                          <Popover
                            key={
                              link.chatLink === "None"
                                ? `${channel.channelName}-None`
                                : link.chatLink
                            }
                            open={
                              open &&
                              Boolean(
                                linkDateRanges[
                                  link.chatLink === "None"
                                    ? `${channel.channelName}-None`
                                    : link.chatLink
                                ]
                              )
                            }
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
                              onChange={(range) =>
                                handleSelect(
                                  link.chatLink,
                                  range,
                                  channel.channelName
                                )
                              }
                              showSelectionPreview={true}
                              moveRangeOnFirstSelection={false}
                              months={1}
                              ranges={[
                                {
                                  startDate: new Date(),
                                  endDate: new Date(),
                                  key: "selection",
                                },
                              ]}
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
    </div>
  );
};

Dashboard.propTypes = {
  chatMembers: PropTypes.any,
};

export default Dashboard;
