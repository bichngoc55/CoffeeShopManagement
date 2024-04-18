import React, {useEffect, useState} from 'react';
import axios from 'axios';

const WorkScheduleTable = () => {

  const[staffs, setStaffs]=useState([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    axios.get(`http://localhost:3005/staff/`)
         .then((staffs) => setStaffs(staffs.data))
         .catch((err) => console.error(err));
  }, [])

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
  };

  const renderDay = () => {
    const dayHeaders = [];
    const selectedDateObj = new Date(selectedDate);

    for (let i = 0; i < 7; i++) {
      const currentDateObj = new Date(selectedDateObj);
      currentDateObj.setDate(selectedDateObj.getDate() + i);
      const dayOfMonth = currentDateObj.getDate();
      dayHeaders.push(<th key={i}>{dayOfMonth}</th>);
    }

    return dayHeaders;
  };

  const renderWeekdays = () => {
      const dayHeaders = [];
      const selectedDateObj = new Date(selectedDate);
  
      for (let i = 0; i < 7; i++) {
        const currentDateObj = new Date(selectedDateObj);
        currentDateObj.setDate(selectedDateObj.getDate() + i);
        const dayOfWeek = currentDateObj.toLocaleDateString('en-US', { weekday: 'long' });
        dayHeaders.push(<th key={i}>{dayOfWeek}</th>);
      }
  
      return dayHeaders;
  };

  return (
    <div style={{display: 'flex'}}>
      <style>
        {`
          .work-schedule-table {
            width: 100%;
            border-collapse: collapse;
          }

          .work-schedule-table th, .work-schedule-table td {
            border: 1px solid black;
            padding: 8px;
            text-align: center;
          }

          .work-schedule-table th {
            background-color: #f2f2f2;
          }

          .work-schedule-table tbody tr:nth-child(even) {
            background-color: #f9f9f9;
          }
        `}
      </style>


      <table className="work-schedule-table">
        <thead>
          <tr>
            <th>
                <div className="date-picker">
                    <label htmlFor="date">Chọn ngày: </label>
                    <input type="date" id="date" value={selectedDate} onChange={handleDateChange} />
                </div>
            </th>
            {selectedDate && renderDay()}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Thời gian</th>
            {selectedDate && renderWeekdays()}
          </tr>
          <tr>
            <td>Sáng <br/>07:30 - 12:30</td>
            <td>{staffs.map((staff, index) => (
  <td key={index}>{staff.name}</td>
))}</td>
            <td></td>
            <td>Làm việc</td>
            <td>Làm việc</td>
            <td>Làm việc</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Chiều <br/> 12:30 - 17:30</td>
            <td>Làm việc</td>
            <td></td>
            <td>Làm việc</td>
            <td>Làm việc</td>
            <td>Làm việc</td>
            <td></td>
            <td></td>
          </tr>
            <td>Tối <br/> 17:30 - 22:30</td>
            <td>Làm việc</td>
            <td></td>
            <td>Làm việc</td>
            <td>Làm việc</td>
            <td>Làm việc</td>
            <td></td>
            <td></td>
        </tbody>
      </table>
    </div>
  );
};

export default WorkScheduleTable;