import { useEffect, useState } from "react";
import "./Request.css";
import { FaAngleLeft } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import PageHeader from "../Header/Header";
import { DateRangePicker } from "react-date-range";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { useLocation, useNavigate } from "react-router-dom";

const Request = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [requests, setRequests] = useState([]);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
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

  const handleRemove = async (requestId, chatId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/chatMembers/removeChatId`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestId, chatId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove chatId");
      }
      fetchData();
    } catch (error) {
      console.error("Failed to remove chatId:", error);
    }
  };

  const open = Boolean(anchorEl);
  const { chatLink } = location.state;

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/chatMembers/requests?chatLink=${encodeURIComponent(
          chatLink
        )}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    if (chatLink) {
      fetchData();
    }
  }, []);

  function formatDate(date) {
    let d = new Date(date),
      day = "" + d.getDate(),
      month = "" + (d.getMonth() + 1), // Month is 0-indexed
      year = d.getFullYear();

    if (day.length < 2) day = "0" + day;
    if (month.length < 2) month = "0" + month;

    return [day, month, year].join("/");
  }

  return (
    <div className="dashboard-container p-0 sm:ml-60">
      {/* Page Header */}
      <PageHeader
        title="Dashboard"
        searchQuery=""
        setSearchQuery={() => {}}
        hasNotification={false} // Adjust as needed
        setHasNotification={() => {}} // Adjust as needed
      />

      {/* Back Button */}
      <div className="back-button flex items-center text-2xl font-bold p-6">
        <button
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => navigate("/")}
        >
          <FaAngleLeft />
          <span className="ml-1">Back</span>
        </button>
      </div>

      {/* Additional Divs below Request Page */}
      <div className="requestContainer mx-5 bg-[#fff]">
        <div className="requestHeading text-2xl font-bold p-4">
          <h2>Overview Request</h2>
        </div>
        {/* Similar Channel Options from Explore Page */}
        <div className="channelOptions flex place-content-between pt-5 px-6">
          <div className="chatLinks flex">
            <h3 className="mr-2 channel-heads">Chat Links:</h3>{" "}
            <p>{chatLink}</p>
          </div>

          <div className="AgencyOptions flex text-neutral-600">
            <h3 className="mr-2 channel-heads">Overview Request:</h3>
            {requests.map((request, index) => (
              <span key={index} className="requests-num font-bold">
                {request.chatIds.length || 0}
              </span>
            ))}
          </div>

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

        {/* Table Layout */}
        <div className="requestTable px-5 pb-3">
          <table className="request-table">
            <thead>
              <tr className="requestColumns">
                <th className="text-left">Date</th>
                <th className="text-left">ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) =>
                request.chatIds.map((chat, chatIndex) => (
                  <tr className="request-numbers" key={`${index}-${chatIndex}`}>
                    <td>{formatDate(chat.createdAt)}</td>
                    <td>{chat.chatId}</td>
                    <td>
                      <button
                        onClick={() => handleRemove(request._id, chat.chatId)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Request;
