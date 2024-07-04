import React, { useEffect, useState } from "react";
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const WorkScheduleTable = ({ isEditing, workSchedule, setWorkSchedule }) => {
  const [users, setUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [staffSelections, setStaffSelections] = useState([]); // Trạng thái để lưu trữ user được chọn

  useEffect(() => {
    axios
      .get(`http://localhost:3005/staff/`)
      .then((response) => setUsers(response.data.staff))
      .catch((err) => console.error(err));
  }, []);

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
  };

  const getStartOfWeek = (date) => {
    const currentDate = new Date(date);
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(currentDate.setDate(diff));
  };

  const renderDay = () => {
    const dayHeaders = [];
    const startOfWeek = getStartOfWeek(selectedDate);

    for (let i = 0; i < 7; i++) {
      const currentDateObj = new Date(startOfWeek);
      currentDateObj.setDate(startOfWeek.getDate() + i);
      const dayOfMonth = currentDateObj.getDate();
      dayHeaders.push(<th key={i} style={{}}>{dayOfMonth}</th>);
    }

    return dayHeaders;
  };

  const renderWeekdays = () => {
    const dayHeaders = [];
    const startOfWeek = getStartOfWeek(selectedDate);

    for (let i = 0; i < 7; i++) {
      const currentDateObj = new Date(startOfWeek);
      currentDateObj.setDate(startOfWeek.getDate() + i);
      const dayOfWeek = currentDateObj.toLocaleDateString("en-US", {
        weekday: "long",
      });
      dayHeaders.push(<th key={i}>{dayOfWeek}</th>);
    }

    return dayHeaders;
  };

  const handleStaffSelect = (dayIndex, timeIndex, shiftIndex) => (event) => {
    const updatedSchedule = [...workSchedule];
    updatedSchedule[dayIndex][timeIndex][shiftIndex] = event.target.value;
    setWorkSchedule(updatedSchedule);
  };

  const renderStaffOptions = (dayIndex, timeIndex, shiftIndex) => {
    if (isEditing) {
      return (
        <FormControl fullWidth style={{ marginTop: '3.5px', marginBottom: '3.5px' }}>
          <InputLabel id={`select-label-${dayIndex}-${timeIndex}-${shiftIndex}`}>Staff</InputLabel>
          <Select
            labelId={`select-label-${dayIndex}-${timeIndex}-${shiftIndex}`}
            id={`select-${dayIndex}-${timeIndex}-${shiftIndex}`}
            value={workSchedule[dayIndex][timeIndex][shiftIndex] || ""}
            label="Staff"
            onChange={handleStaffSelect(dayIndex, timeIndex, shiftIndex)}
            style={{ width: '100%' }}
          >
            <MenuItem key="" value="">
              <span style={{ fontSize: "14px" }}>Bỏ chọn</span>
            </MenuItem>
            {users.map((user) => (
              <MenuItem key={user.id} value={user.Name}>
                <span style={{ fontSize: '14px', borderBottom: '1px solid #ccc', display: 'block', paddingBottom: '2px' }}>{user.Name}</span>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    } else {
      return (
        <div style={{ paddingBottom: '2px' }}>
          {workSchedule[dayIndex][timeIndex][shiftIndex] ? (
            <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '2px', alignItems:"center" }}>
              {workSchedule[dayIndex][timeIndex][shiftIndex]}
            </div>
          ) : (
            <span>{workSchedule[dayIndex][timeIndex][shiftIndex]}</span>
          )}
        </div>
        
      )
    }
  };

  return (
    <div style={{ display: "block"}}>
      <style>
        {`
          .work-schedule-table {
            border-collapse: collapse;
            alignItems:center
          }

          .work-schedule-table th, .work-schedule-table td {
            border: 1px solid black;
            padding: 3px;
            text-align: center;
            width: 200px
          }

          .work-schedule-table th {
            background-color: #DEB99F;
          }

          .work-schedule-table td {
            background-color: #f2f2f2;
          }

          .work-schedule-table thead {
            background-color: "red";
          }

          .work-schedule-table tbody tr:nth-child(even) {
            background-color: #f9f9f9;
          }

        `}
      </style>

      <table className="work-schedule-table">
        <thead>
          <tr>
            <th style={{}}>
              <div className="date-picker" style={{}}>
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  style={{ width: '90%', borderWidth: '0' }}
                />
              </div>
            </th>
            {selectedDate && renderDay()}
          </tr>
        </thead>
        <tbody>
          <tr className="header-row">
            <th>Thời gian</th>
            {selectedDate && renderWeekdays()}
          </tr>
          {['Sáng', 'Chiều', 'Tối'].map((timePeriod, timeIndex) => (
            <tr key={timePeriod}>
              <td>
                {timePeriod} <br />
                {timeIndex === 0 && '07:30 - 12:30'}
                {timeIndex === 1 && '12:30 - 17:30'}
                {timeIndex === 2 && '17:30 - 22:30'}
              </td>
              {Array.from({ length: 7 }).map((_, dayIndex) => (
                <td key={dayIndex}>
                  {Array.from({ length: 3 }).map((_, shiftIndex) => (
                    <div key={shiftIndex}>
                      {renderStaffOptions(dayIndex, timeIndex, shiftIndex)}
                    </div>
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkScheduleTable;

