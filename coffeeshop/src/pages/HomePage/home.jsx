import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import axios from "axios";
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';

import DashBoard from "../../components/dashBoard/dashBoard";
import { Box, TextField, Button, Typography } from "@mui/material";
import "./home.css";
import WorkScheduleTable from "./WorkSchedule";
import NotificationButton from "./Notification";
import SearchBar from "../../components/searchBar/searchbar";
import { SearchResultsList } from "../../components/searchBar/searchResultList";

const HomePage = () => {
  const { token } = useSelector((state) => state.auths);
  const { Ava, Name, Position } = useSelector((state) => state.auths.user);

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


  const [welcomeContent, setWelcomeContent] = useState("");
  const [newWelcomeContent, setNewWelcomeContent] = useState("");
  const [termsContent, setTermsContent] = useState("");
  const [newTermsContent, setNewTermsContent] = useState("");

  const formatContent = (content) => {
    let listNumber = 0;
    const formattedLines = content.split('\n').map((line, index) => {
      if (line.trim().startsWith('-')) {
        listNumber++;
        return <li key={index}>{`${listNumber}. ${line.trim().substring(1).trim()}`}</li>;
      }
      return <p key={index}>{line}</p>;
    });

    return (
      <>
        {formattedLines.map((line, index) => 
          line.type === 'li' ? <ul key={index}>{line}</ul> : line
        )}
      </>
    );
  };

  const handleSave = (index) => {
    return async () => {
      await updateHomeContent();
      (index === 0) ? setNewWelcomeContent(welcomeContent) : setNewTermsContent(termsContent)
      setIsEditing((prevIsEditing) => {
        const newIsEditing = [...prevIsEditing];
        newIsEditing[index] = false;
        return newIsEditing;
      });
    };
  };

  const handleCancel = (index) => {
    return () => {
      (index === 0) ? setWelcomeContent(newWelcomeContent) : setTermsContent(newTermsContent)
      // Reset the content to what it was before editing
      setIsEditing((prevIsEditing) => {
        const newIsEditing = [...prevIsEditing];
        newIsEditing[index] = false;
        return newIsEditing;
      });
    }
  };

  const fetchWelcome = async () => {
    try {
      const response = await fetch(`http://localhost:3005/homeContent/6687249e21a8e565ceae8ad9`, {
        method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,  // Đảm bảo rằng bạn đã có `token` ở đâu đó trong mã của bạn
          },
      });
      if (response.ok) {
        const data = await response.json();
        setWelcomeContent(data.Welcome)
        setNewWelcomeContent(data.Welcome)
        setTermsContent(data.RegulationsAndTerms)
        setNewTermsContent(data.RegulationsAndTerms)
      } else {
        console.error("Request get welcome's text failed with status:", response.status);
      }
    }
    catch (error) {
      console.error('Failed to fetch welcome', error);
    }
  }

  const updateHomeContent = async () => {
    try {
      // Tạo một đối tượng chứa các thay đổi cần cập nhật
      const updatedContent = {
        Welcome: welcomeContent,
        RegulationsAndTerms: termsContent,
      };
  
      // Gửi yêu cầu PATCH đến API để lưu lịch làm việc mới
      const response = await fetch(`http://localhost:3005/homeContent/6687249e21a8e565ceae8ad9/content`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Đảm bảo rằng bạn đã có `token` ở đâu đó trong mã của bạn
        },
        body: JSON.stringify(updatedContent),
      });
  
      if (response.ok) {
        console.log('Content đã được cập nhật thành công');
      } else {
        console.error('Không thể cập nhật Content', response.status);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật Content', error);
    }
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

  const handleSaveWorkScheduleChanges = () => {
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

  const handleCancelWorkScheduleChanges = () => {
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
    fetchWelcome();
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
              <div style={{ width: "70%", position: "relative",  aspectRatio: "1/1", overflow: "hidden", }}>
                <div style={{aspectRatio: "1/1", overflow: "hidden", borderRadius:"100%"}}>
                  <img
                    alt="profile-user"
                    // loading="lazy"
                    src={Ava}
                    className="avatar-image"
                  />
                </div>
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
            Hello {Name}!
          </a>
          <div className="line" />

          <div className=''>
            {/* <a className='title'> Welcome to JavaJoy! </a> */}
            <div style={{ display: 'flex',flexDirection: 'row', justifyContent: 'space-between', justifyContent: 'space-between', alignItems:'center'}}>
              <a className='title'> Welcome to JavaJoy! </a>
              {Position === 'admin' && (
                <div>
                  {isEditing[0] ? (
                    <div>
                      <button onClick={handleSave(0)} className='icon' style={{ marginRight: '10px' }}>
                        <SaveRoundedIcon />
                      </button>
                      <button onClick={handleCancel(0)} className='icon'>
                        <DisabledByDefaultRoundedIcon />
                      </button>
                    </div>
                  ) : (
                    <button onClick={toggleIsEditing(0)} className='icon' style={{ justifySelf: 'flex-end' }}>
                      <EditRoundedIcon/>
                    </button>
                  )}
                </div>
              )}
            </div>
            <br/>
            <div style={{marginLeft: '2%'}}>
              {isEditing[0] ? (
                <TextField
                  variant="outlined"
                  value={welcomeContent}
                  onChange={(e) => setWelcomeContent(e.target.value)}
                  multiline
                  rows={10}
                  fullWidth
                />
              ) : (
                <div className='small_text'>
                  {formatContent(welcomeContent)}
                </div>
              )}
            </div>
          </div>
          <div className="line" />

          <div className="">
            {/* Regulations and Terms */}
            <div className='title' style={{ display: 'flex',flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
              <div>
                <a > Regulations and Terms  </a>
                <button onClick={handleToggleClick} className='icon'>
                  {isContentVisible ? <ArrowDropDownRoundedIcon /> : <ArrowDropDownRoundedIcon style={{ transform: 'rotate(-90deg)' }}/>}
                </button>
              </div>
              {Position === 'admin' && (
                <div>
                  {isEditing[1] ? (
                    <div>
                      <button onClick={handleSave(1)} className='icon' style={{ marginRight: '10px' }}>
                        <SaveRoundedIcon />
                      </button>
                      <button onClick={handleCancel(1)} className='icon'>
                        <DisabledByDefaultRoundedIcon />
                      </button>
                    </div>
                  ) : (
                    <button onClick={toggleIsEditing(1)} className='icon' style={{ justifySelf: 'flex-end' }}>
                      <EditRoundedIcon/>
                    </button>
                  )}
                </div>
              )}
            </div>
            <br />
            <div
              className={`term&condition ${
                isContentVisible ? "visible" : "hidden"
              }`}
              style={{ marginLeft: "2%" }}
            >
              {isEditing[1] ? (
                <TextField
                  variant="outlined"
                  value={termsContent}
                  onChange={(e) => setTermsContent(e.target.value)}
                  multiline
                  rows={10}
                  fullWidth
                />
              ) : (
                <div className='small_text'>
                  {formatContent(termsContent)}
                </div>
              )}
            </div>
          </div>
          <div className="line" />

          <div className=''> 
            <div style={{ display: 'flex',flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
              <a className='title'>Work Schedule</a>
              {Position === 'admin' && (
                <div>
                  {isEditing[2] ? (
                    <div>
                      <button onClick={handleSaveWorkScheduleChanges} className='icon' style={{ marginRight: '10px' }}>
                        <SaveRoundedIcon />
                      </button>
                      <button onClick={handleCancelWorkScheduleChanges} className='icon'>
                        <DisabledByDefaultRoundedIcon />
                      </button>
                    </div>
                  ) : (
                    <button onClick={toggleIsEditing(2)} className='icon' style={{ justifySelf: 'flex-end' }}>
                      <EditRoundedIcon/>
                    </button>
                  )}
                </div>
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
