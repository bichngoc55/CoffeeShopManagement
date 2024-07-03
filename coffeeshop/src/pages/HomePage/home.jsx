import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import axios from "axios";
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';

import DashBoard from "../../components/dashBoard/dashBoard";
import { Box } from "@mui/material";
import "./home.css";
import WorkScheduleTable from "./WorkSchedule";
import NotificationButton from "./Notification";
import SearchBar from "../../components/searchBar/searchbar";
import { SearchResultsList } from "../../components/searchBar/searchResultList";

const HomePage = () => {
  const { token } = useSelector((state) => state.auths);

  const [isEditing, setIsEditing] = useState([false, false, false]);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isNotificationShown, setNotificationShown] = useState(false);
  const [results, setResults] = useState([]);

  const handleToggleClick = () => {
    setIsContentVisible(!isContentVisible);
  };

  const toggleNotificationList = () => {
    setNotificationShown(!isNotificationShown);
  };

  const toggleIsEditing = (index) => {
    return () => {
      setIsEditing((prevIsEditing) => {
        const newIsEditing = [...prevIsEditing];
        newIsEditing[index] = !newIsEditing[index];
        return newIsEditing;
      });
    };
  };

  const [workSchedule, setWorkSchedule] = useState([
    [["", "", ""], ["", "", ""], ["", "", ""]],
    [["", "", ""], ["", "", ""], ["", "", ""]],
    [["", "", ""], ["", "", ""], ["", "", ""]],
    [["", "", ""], ["", "", ""], ["", "", ""]],
    [["", "", ""], ["", "", ""], ["", "", ""]],
    [["", "", ""], ["", "", ""], ["", "", ""]],
    [["", "", ""], ["", "", ""], ["", "", ""]],
  ]);

  // State để lưu trữ workSchedule gốc
  const [originalWorkSchedule, setOriginalWorkSchedule] = useState([
    [["", "", ""], ["", "", ""], ["", "", ""]],
    [["", "", ""], ["", "", ""], ["", "", ""]],
    [["", "", ""], ["", "", ""], ["", "", ""]],
    [["", "", ""], ["", "", ""], ["", "", ""]],
    [["", "", ""], ["", "", ""], ["", "", ""]],
    [["", "", ""], ["", "", ""], ["", "", ""]],
    [["", "", ""], ["", "", ""], ["", "", ""]],
  ]);

  const handleSaveChanges = () => {
    // Lưu thay đổi vào cơ sở dữ liệu
    // Cập nhật originalWorkSchedule
    setOriginalWorkSchedule(JSON.parse(JSON.stringify(workSchedule))); // Deep copy
    setIsEditing((prevIsEditing) => {
      const newIsEditing = [...prevIsEditing];
      newIsEditing[2] = false;
      return newIsEditing;
    });
    if (token) 
      updateWorkSchedule()
  };

  const handleCancelChanges = () => {
    console.log('Original Work Schedule:', originalWorkSchedule);
    if (originalWorkSchedule && Array.isArray(originalWorkSchedule) && originalWorkSchedule.length > 0) {
      setWorkSchedule(JSON.parse(JSON.stringify(originalWorkSchedule))); // Deep copy
    } else {
      console.error('Original work schedule is not in the expected format');
      // Có thể set một lịch trống ở đây
      setWorkSchedule([
        [["", "", ""], ["", "", ""], ["", "", ""]],
        [["", "", ""], ["", "", ""], ["", "", ""]],
        [["", "", ""], ["", "", ""], ["", "", ""]],
        [["", "", ""], ["", "", ""], ["", "", ""]],
        [["", "", ""], ["", "", ""], ["", "", ""]],
        [["", "", ""], ["", "", ""], ["", "", ""]],
        [["", "", ""], ["", "", ""], ["", "", ""]],
      ]);
    }
    setIsEditing((prevIsEditing) => {
      const newIsEditing = [...prevIsEditing];
      newIsEditing[2] = false;
      return newIsEditing;
    });
  };

  const fetchStaffNameById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3005/staff/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  // Đảm bảo rằng bạn đã có `token` ở đâu đó trong mã của bạn
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.Name;  // Giả sử API trả về đối tượng nhân viên có thuộc tính `name`
      } else {
        console.error("Request failed with status:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Request failed with error:", error);
      return null;
    }
  };

  // Hàm update từ lịch đã lựa chọn thêm nhân viên vào database
  const updateWorkSchedule = async () => {
    try {
      // Lấy dữ liệu lịch làm việc mới từ state `workSchedule`
      const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
      const newWorkSchedule = {};

      daysOfWeek.forEach((day, index) => {
        newWorkSchedule[day] = workSchedule[index];
      });

      // Gửi yêu cầu PATCH đến API để lưu lịch làm việc mới
      const response = await fetch(`http://localhost:3005/workSchedule/668340b96e98e308621d3175/week`, {  // Chú ý: scheduleId là ID của lịch làm việc cần cập nhật
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Đảm bảo rằng bạn đã có `token` ở đâu đó trong mã của bạn
        },
        body: JSON.stringify(newWorkSchedule),
      });

      if (response.ok) {
        console.log('Lịch làm việc đã được cập nhật thành công');
        // Cập nhật lại `originalWorkSchedule` để lưu trữ trạng thái ban đầu
        setOriginalWorkSchedule(JSON.parse(JSON.stringify(newWorkSchedule))); 
      } else {
        console.error('Không thể cập nhật lịch làm việc', response.status);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật lịch làm việc', error);
    }
  };
  
  // Hàm lấy workSchedule từ database và cập nhật với tên nhân viên
  const fetchWorkSchedule = async () => {
    try {
      const response = await axios.get('http://localhost:3005/workSchedule/');
      if (response.data && response.data.length > 0) {
        const schedule = response.data[0];
        const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        const newWorkSchedule = await Promise.all(days.map(async (day) => {
          if (schedule[day])
            if (schedule[day]) {
              return await Promise.all(schedule[day].map(async (shift) => {
                return await Promise.all(shift.map(async (id) => {
                  if (id) {
                    const name = await fetchStaffNameById(id);
                    return name || id;
                  }
                  return "";
                }));
              }));
            }
          return [["", "", ""], ["", "", ""], ["", "", ""]];
        }));
        setWorkSchedule(newWorkSchedule);
        setOriginalWorkSchedule(JSON.parse(JSON.stringify(newWorkSchedule))); // Deep copy
      }
    } catch (error) {
      console.error('Failed to fetch work schedule', error);
    }
  };

  useEffect(() => {
    fetchWorkSchedule();
  }, []);

  return (
    <Box sx={{ display: "flex", maxWidth: "100vw" }}>
      <DashBoard />
      <div className="container">
        <div
          className="flex justify-between "
          style={{ marginTop: "2.15%", flexDirection: "row" }}
        >
          <div className=" font-semibold medium_text">Home Page</div>
          <div className=" bg-white " style={{ width: '27.08%'}}>
            <SearchBar type="text" setResults={setResults} placeholder="Search..." />
            {results && results.length > 0 && (
              <SearchResultsList results={results} />
            )}
          </div>
          <div
            style={{
              width: "10%",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <button
              className="notification-button"
              onClick={toggleNotificationList}
            >
              <div style={{ width: "70%", position: "relative" }}>
                <img
                  alt="profile-user"
                  loading="lazy"
                  src="../../assets/avtUser.png"
                  className="avatar-image"
                />
                <NotificationsNoneRoundedIcon
                  className="notification-icon"
                  style={{ color: isNotificationShown ? "red" : "inherit" }}
                />
              </div>
              {isNotificationShown && (
                <div className="notification-list">
                  <NotificationButton />
                </div>
              )}
            </button>
          </div>
        </div>
        <div className="content">
          <a
            className="large_text font-semibold"
            style={{ marginTop: "4%", textAlign: "left", color: "#714534" }}
          >
            Hello [Name]!
          </a>
          <div className="line" />

          <div className=''>
            {/* <a className='title'> Welcome to JavaJoy! </a> */}
            <div style={{ display: 'flex',flexDirection: 'row', justifyContent: 'space-between'}}>
              <a className='title'> Welcome to JavaJoy! </a>
              <button onClick={toggleIsEditing(0)} className='icon' style={{ justifySelf: 'flex-end' }}>
                {isEditing[0] ? (
                <div>
                  <SaveRoundedIcon style={{  }} />
                  <DisabledByDefaultRoundedIcon />
                </div>
                ) : <EditRoundedIcon/>}
              </button>
            </div>
            <br/>
            <div style={{marginLeft: '2%'}}>
              <a className='small_text'> 
                We have been eagerly awaiting this moment to meet and work together.
                JavaJoy is thrilled to welcome each new member to our family. Let's
                create unforgettable experiences and build an amazing work
                environment together.<br/> Be ready to explore, innovate, and achieve
                remarkable success.Welcome to our team! <br/> Best regards, <br/> JavaJoy
              </a>
            </div>
          </div>
          <div className="line" />

          <div className="">
            {/* Regulations and Terms */}
            <div className='title' style={{ display: 'flex',flexDirection: 'row',}}>
              <div>
                <a > Regulations and Terms  </a>
                <button onClick={handleToggleClick} className='icon'>
                  {isContentVisible ? <ArrowDropDownRoundedIcon /> : <ArrowDropDownRoundedIcon style={{ transform: 'rotate(-90deg)' }}/>}
                </button>
              </div>
              <button onClick={toggleIsEditing(1)} className='icon' style={{ marginLeft: 'auto' }}>
                {isEditing[1] ? (
                <div>
                  <SaveRoundedIcon style={{  }} />
                  <DisabledByDefaultRoundedIcon />
                </div>
                ) : <EditRoundedIcon/>}
              </button>
            </div>
            <br />
            <div
              className={`term&condition ${
                isContentVisible ? "visible" : "hidden"
              }`}
              style={{ marginLeft: "2%" }}
            >
              <a className="small_text">
                Here are some terms and conditions for you and other employees
                in JavaJoy to help us work together better:
              </a>
              <ol
                className="small_text"
                style={{
                  listStyleType: "decimal",
                  marginLeft: "1em",
                  marginTop: "0",
                }}
              >
                <li>
                  Working hours: Employees must adhere to the designated work
                  schedule and ensure punctuality. If there are any changes to
                  the work schedule, employees need to provide advance notice
                  and seek permission from the manager/supervisor.
                </li>
                <li>
                  Professional ethics: Employees must work professionally,
                  honestly, and with a sense of responsibility. They must comply
                  with the café's rules and regulations and avoid causing harm
                  to the café's image and reputation.
                </li>
                <li>
                  Maintain hygiene: Employees must maintain good personal
                  hygiene and adhere to the industry's hygiene regulations. This
                  includes keeping clothing, hair, and nails clean, refraining
                  from smoking in the café area, and following food hygiene
                  regulations.
                </li>
                <li>
                  Occupational safety: Employees must comply with occupational
                  safety rules and regulations. They should use appropriate
                  personal protective equipment, such as masks and gloves when
                  necessary. Immediately report any safety incidents or hazards
                  to the manager/supervisor.
                </li>
                <li>
                  Maintain a respectful attitude: Employees must treat everyone
                  in the café, including colleagues and customers, with respect
                  and a positive attitude. They should not discriminate based on
                  gender, age, race, religion, nationality, or any other
                  factors.
                </li>
                <li>
                  Information security: Employees must protect customer and café
                  information, refraining from unauthorized disclosure or use of
                  information. They should maintain transparency and avoid any
                  misuse of data.
                </li>
                <li>
                  Compliance with regulations: Employees must adhere to all café
                  policies, procedures, and relevant laws and regulations,
                  including labor laws
                </li>
              </ol>
              <a className="small_text">
                These terms and conditions aim to ensure a professional, safe,
                positive, and fair working environment in the café. If there are
                any issues, employees should discuss them with the café
                manager/supervisor.
              </a>
            </div>
          </div>
          <div className="line" />

          <div className=''> 
            <div style={{ display: 'flex',flexDirection: 'row', justifyContent: 'space-between'}}>
              <a className='title'>Work Schedule</a>
              {/* <button onClick={toggleIsEditing(2)} className='icon' style={{ justifySelf: 'flex-end' }}>
                {isEditing[2] ? (
                <div>
                  <SaveRoundedIcon style={{  }} />
                  <DisabledByDefaultRoundedIcon />
                </div>
                ) : <EditRoundedIcon/>}
              </button> */}
              {isEditing[2] ? (
                <div>
                  <button onClick={handleSaveChanges} className='icon' style={{ marginRight: '10px' }}>
                    <SaveRoundedIcon />
                  </button>
                  <button onClick={handleCancelChanges} className='icon'>
                    <DisabledByDefaultRoundedIcon />
                  </button>
                </div>
              ) : (
                <button onClick={toggleIsEditing(2)} className='icon' style={{ justifySelf: 'flex-end' }}>
                  <EditRoundedIcon/>
                </button>
              )}
            </div>
            <div style={{marginTop: '3%',}}>
            <WorkScheduleTable isEditing={isEditing[2]} workSchedule={workSchedule} setWorkSchedule={setWorkSchedule} />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};
export default HomePage;
