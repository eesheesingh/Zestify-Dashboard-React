// Overview.jsx
import { useEffect, useState } from "react";
import PageHeader from "../Header/Header";
import { DateRangePicker } from "react-date-range";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import Loading from "../Loading/Loading";
import "./Overview.css";

const Overview = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasNotification, setHasNotification] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [overviewData, setOverviewData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSelect = (ranges) => {
    console.log(ranges); // { selection: { startDate, endDate } }
    setState([ranges.selection]);
    setAnchorEl(null); // Close the popover after selecting the date range
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  useEffect(() => {
    const sessionChatId = sessionStorage.getItem("chatId");
    try {
      const fetchData = async () => {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/chatMembers/overview?sessionChatId=${sessionChatId}`
        );
        if (!response.ok) {
          setLoading(false);
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOverviewData(data);
        setLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const chatLinkCounts = overviewData.map((channel) => ({
    channelName: channel.channelName,
    chatLinks: [
      ...new Set(channel.chatMembers.map((member) => member.chatLink)),
    ],
    joinCounts: channel.chatMembers.reduce((counts, member) => {
      if (member.joinedAt) {
        counts[member.chatLink] = (counts[member.chatLink] || 0) + 1;
      }
      return counts;
    }, {}),
    leaveCounts: channel.chatMembers.reduce((counts, member) => {
      if (member.leftAt) {
        counts[member.chatLink] = (counts[member.chatLink] || 0) + 1;
      }
      return counts;
    }, {}),
  }));

  chatLinkCounts.sort((a, b) => a.channelName.localeCompare(b.channelName));

  if (loading) {
    return (
      <div className="p-0 sm:ml-60">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-0 sm:ml-60">
      <PageHeader
        title="Overview"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        hasNotification={hasNotification}
        setHasNotification={setHasNotification}
      />

      <div className="overview-heading text-2xl font-bold p-4 ml-2">
        <h2>Channel Listing</h2>
      </div>
      {chatLinkCounts.length > 0 ? (
        <div className="overview-table-container mx-5 bg-[#fff]">
          <div className="overviewResult px-5 pb-3">
            <table className="overview-table">
              <thead>
                <tr className="overview-channels">
                  <th className="left-headings">Channel Name</th>
                  <th className="left-headings">Chat Links</th>
                  <th className="centered-table">Members Joined</th>
                  <th className="centered-table">Members Left</th>
                  <th className="filter-header">
                    <div className="filterIcon">
                      <IoFilter />
                      <span>Filter</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {chatLinkCounts.map((channel, index) => (
                  <tr className="overview-numbers" key={index}>
                    <td>
                      <ul>
                        <li>{channel.channelName}</li>
                      </ul>
                    </td>
                    <td>
                      <ul>
                        {channel.chatLinks.map((chatLink, subIndex) => (
                          <li key={`${index}-${subIndex}`}>{chatLink}</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <ul>
                        {channel.chatLinks.map((chatLink, subIndex) => (
                          <li key={`${index}-${subIndex}-join`}>
                            {channel.joinCounts[chatLink] || 0}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <ul>
                        {channel.chatLinks.map((chatLink, subIndex) => (
                          <li key={`${index}-${subIndex}-leave`}>
                            {channel.leaveCounts[chatLink] || 0}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <ul>
                        {channel.chatLinks.map((chatLink, subIndex) => (
                          <li
                            key={`${index}-${subIndex}`}
                            style={{ height: "2rem" }}
                          >
                            <Button
                              onClick={handleClick}
                              style={{
                                padding: "0.3rem",
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
                              key={`${index}-${subIndex}`}
                              open={open}
                              anchorEl={anchorEl}
                              onClose={handleClose}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
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
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <img
            className="mx-auto mt-14 w-1/4 mb-7"
            src="/undraw_no_data_re_kwbl 1.png"
          />
          <h1 style={{ color: "#87878e" }} className="text-2xl font-bold">
            No Data
          </h1>
        </div>
      )}
    </div>
  );
};

export default Overview;
