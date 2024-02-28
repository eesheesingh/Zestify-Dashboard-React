// Overview.jsx
import { useState } from "react";
import PageHeader from "../Header/Header";
import { DateRangePicker } from "react-date-range";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import './Overview.css'

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
              {/* Example data, replace it with your actual data */}
              <tr className="overview-numbers">
                <td>Channel 1</td>
                <td>https://t.me/channel1</td>
                <td>+100</td>
                <td>-10</td>
                <td>
                  <div style={{ height: "2rem" }}>
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
              <tr className="overview-numbers">
                <td>Channel 2</td>
                <td>https://t.me/channel2</td>
                <td>+150</td>
                <td>-20</td>
                <td>
                  <div style={{ height: "2rem" }}>
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

              <tr className="overview-numbers">
                <td>Channel 3</td>
                <td>https://t.me/channel3</td>
                <td>+150</td>
                <td>-20</td>
                <td>
                  <div style={{ height: "2rem" }}>
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
              
              
              <tr className="overview-numbers">
                <td>Channel 4</td>
                <td>https://t.me/channel4</td>
                <td>+150</td>
                <td>-20</td>
                <td>
                  <div style={{ height: "2rem" }}>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
