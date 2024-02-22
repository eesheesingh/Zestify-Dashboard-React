import  { useState, useEffect } from 'react';
import moment from 'moment';
import 'daterangepicker/daterangepicker.css'; // Import the required CSS for the date range picker

const MyDatePicker = () => {
  const [dateRange, setDateRange] = useState({
    startDate: moment().subtract(29, 'days'),
    endDate: moment(),
  });

  const handleDateChange = (start, end) => {
    // Update the state when the date range changes
    setDateRange({ startDate: start, endDate: end });

    // Update the display
    updateDisplay(start, end);
  };

  const updateDisplay = (start, end) => {
    // Update the display based on the selected date range
    const displayText = `${start.format('MMMM D, YYYY')} - ${end.format('MMMM D, YYYY')}`;
    document.getElementById('reportrange').innerHTML = displayText;
  };

  useEffect(() => {
    // Initialize the date range picker on component mount
    const ranges = {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    };

    const reportRangeElement = document.getElementById('reportrange');

    const picker = new window.DateRangePicker(reportRangeElement, {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      ranges,
    }, (start, end) => handleDateChange(start, end));

    // Update the initial display
    updateDisplay(dateRange.startDate, dateRange.endDate);

    // Clean up on component unmount
    return () => {
      picker.destroy();
    };
  }, [dateRange]);

  return (
    <div>
      <div id="reportrange"></div>
    </div>
  );
};

export default MyDatePicker;
