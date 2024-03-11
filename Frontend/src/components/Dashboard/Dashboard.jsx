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
import { ToastContainer, toast } from "react-toastify";

const Dashboard = ({ chatMembers }) => {
  const [hasNotification, setHasNotification] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationCount, setNotificationCount] = useState(5);
  const [linkDateRanges, setLinkDateRanges] = useState({});

  const [inputValues, setInputValues] = useState({});

  const [open, setOpen] = useState(false); // Added open state

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
    navigate("/requests", { state: { chatLink: link } });
  };

  const handleClick = (event, linkId) => {
    setAnchorEl(event.currentTarget);

    setOpen(true); // Update: Set open to true when opening the Popover

    setLinkDateRanges((prevState) => ({
      ...prevState,
      [linkId]: prevState[linkId]
        ? null
        : { startDate: new Date(), endDate: new Date() },
    }));
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleInputValue = (e, linkId) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [linkId]: e.target.value,
    }));
  };

  const handleError = (err) =>
    toast.info(err, {
      position: "bottom-left",
    });
  const handleSuccess = (message) =>
    toast.success(message, {
      position: "bottom-left",
    });

    const handleInputSubmit = async (e, linkId) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const chatId = inputValues[linkId];
    
        try {
          const response = await fetch("http://localhost:5000/api/chatMembers/requestId", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ linkId, chatId }),
          });
          const data = await response.json();
    
          if (!response.ok) {
            throw new Error(data.message);
          }
    
          handleSuccess(data.message || "Chat ID submitted successfully!");
    
          setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [linkId]: "",
          }));
        } catch (error) {
          handleError(error.message);
        }
      }
    };

  useEffect(() => {
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
            <div className="my-8 table-list-mb" key={index}>
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
                            value={
                              inputValues[
                                link.chatLink === "None"
                                  ? `${channel.channelName}-None`
                                  : link.chatLink
                              ] || ""
                            }
                            onChange={(e) =>
                              handleInputValue(
                                e,
                                link.chatLink === "None"
                                  ? `${channel.channelName}-None`
                                  : link.chatLink
                              )
                            }
                            onKeyDown={(e) =>
                              handleInputSubmit(
                                e,
                                link.chatLink === "None"
                                  ? `${channel.channelName}-None`
                                  : link.chatLink
                              )
                            }
                          />
                          <button
                            onClick={() =>
                              handleRequest(
                                link.chatLink === "None"
                                  ? `${channel.channelName}-None`
                                  : link.chatLink
                              )
                            }
                          >
                            <span className="eye-icon">
                              <GoEye
                                style={{
                                  cursor:
                                    notificationCount > 0
                                      ? "pointer"
                                      : "not-allowed",
                                  opacity: notificationCount > 0 ? 1 : 0.5,
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
                          <Button className="date-button"
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
                              paddingRight: "0.8rem",
                            }}
                          >
                            <BsCalendarDateFill className="date-icons" />
                            <span
                              style={{
                                marginLeft: "0.5rem",
                                textTransform: "none",
                              }}
                            >
                              Date <span className="range-text">Range</span>
                            </span>
                            <MdKeyboardArrowDown className="date-icons" />
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
      <ToastContainer />
    </div>
  );
};

Dashboard.propTypes = {
  chatMembers: PropTypes.any,
};

export default Dashboard;
