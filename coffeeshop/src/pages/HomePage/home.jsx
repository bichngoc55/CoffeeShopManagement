import React, {useState} from 'react';

import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';

import DashBoard from '../../components/dashBoard/dashBoard';
import {Box} from "@mui/material";
import './home.css'
import WorkScheduleTable from './WorkSchedule';
import NotificationButton from './Notification';
import SearchBar from "../../components/searchBar/searchbar";
import { SearchResultsList } from "../../components/searchBar/searchResultList";

const HomePage = () => {
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

  
  


  return (
    <Box sx={{display: "flex", maxWidth: "100vw", }}>
      <DashBoard/>
      <div className='container'>
        <div className='flex justify-between ' style={{ marginTop: '2.15%', flexDirection: 'row' }}>
          <div className=" font-semibold medium_text">Home Page</div>
          <div className=" bg-white " style={{ width: '27.08%'}}>
            <SearchBar type="text" setResults={setResults} placeholder="Search..." />
            {results && results.length > 0 && (
              <SearchResultsList results={results} />
            )}
          </div>
          <div style={{width: "10%", justifyItems: 'center', alignItems: 'center'}}>
            <button className="notification-button" onClick={toggleNotificationList}>
              <div style={{width: "70%", position: 'relative'}}>
              <img
                alt="profile-user"
                loading="lazy"
                src="../../assets/avtUser.png"
                className="avatar-image" 
              />
              <NotificationsNoneRoundedIcon className="notification-icon"
                style={{ color: isNotificationShown ? 'red' : 'inherit' }}
              />
              </div>
                {isNotificationShown && (
                  <div className="notification-list">
                    <NotificationButton/>
                  </div>
                )}
            </button>
            
          </div>
        </div>
        <div className='content'>
          <a className='large_text font-semibold' style={{marginTop: '4%', textAlign: 'left', color: "#714534" }}>
            Hello [Name]!
          </a>
          <div className='line'/>

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
          <div className='line'/>
          
          <div className=''>
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
            <br/>
            <div className={`term&condition ${isContentVisible ? 'visible' : 'hidden'}`} style={{marginLeft: '2%'}}>
              <a className='small_text'> 
                Here are some terms and conditions for you and other employees
                in JavaJoy to help us work together better:
              </a>
              <ol className='small_text' style={{ listStyleType: 'decimal', marginLeft: '1em', marginTop: '0'}}>
                <li>
                  Working hours: Employees must adhere to the designated work
                  schedule and ensure punctuality. If there are any changes to the
                  work schedule, employees need to provide advance notice and seek
                  permission from the manager/supervisor.</li>
                <li>
                  Professional ethics: Employees must work professionally,
                  honestly, and with a sense of responsibility. They must comply
                  with the café's rules and regulations and avoid causing harm to
                  the café's image and reputation.
                </li>
                <li>
                  Maintain hygiene: Employees must maintain good personal hygiene
                  and adhere to the industry's hygiene regulations. This includes
                  keeping clothing, hair, and nails clean, refraining from smoking
                  in the café area, and following food hygiene regulations.
                </li>
                <li>
                  Occupational safety: Employees must comply with occupational
                  safety rules and regulations. They should use appropriate
                  personal protective equipment, such as masks and gloves when
                  necessary. Immediately report any safety incidents or hazards to
                  the manager/supervisor.</li>
                <li>
                  Maintain a respectful attitude: Employees must treat everyone in
                  the café, including colleagues and customers, with respect and a
                  positive attitude. They should not discriminate based on gender,
                  age, race, religion, nationality, or any other factors.
                </li>
                <li>
                  Information security: Employees must protect customer and café
                  information, refraining from unauthorized disclosure or use of
                  information. They should maintain transparency and avoid any misuse of data.
                </li>
                <li>
                  Compliance with regulations: Employees must adhere to all café policies, 
                  procedures, and relevant laws and regulations, including labor laws</li>
              </ol>
              <a className='small_text'> 
                These terms and conditions aim to ensure a professional, safe, positive, 
                and fair working environment in the café. If there are any issues, employees 
                should discuss them with the café manager/supervisor.</a>
            </div>
          </div>
          <div className='line'/>

          <div className=''> 
            <div style={{ display: 'flex',flexDirection: 'row', justifyContent: 'space-between'}}>
              <a className='title'>Work Schedule</a>
              <button onClick={toggleIsEditing(2)} className='icon' style={{ justifySelf: 'flex-end' }}>
                {isEditing[2] ? (
                <div>
                  <SaveRoundedIcon style={{  }} />
                  <DisabledByDefaultRoundedIcon />
                </div>
                ) : <EditRoundedIcon/>}
              </button>
            </div>
            <div style={{marginTop: '3%',}}>
              <WorkScheduleTable/>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};
export default HomePage;


