import React, {useState} from 'react';

import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';

import DashBoard from '../../components/dashBoard/dashBoard';
import {Box} from "@mui/material";
import './home.css'
import WorkScheduleTable from './WorkSchedule';
import NotificationButton from './Notification';

const HomePage = () => {

  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isNotificationShown, setNotificationShown] = useState(false);


  const handleToggleClick = () => {
    setIsContentVisible(!isContentVisible);
  };

  const toggleNotificationList = () => {
    setNotificationShown(!isNotificationShown);
  };

  
  return (
    <Box sx={{display: "flex", maxWidth: "100vw", }}>
      <DashBoard/>
      <div className='container'>
        <div className='flex justify-between ' style={{ marginTop: '2.15%',marginLeft: '2.64%', marginRight: '2.64%', flexDirection: 'row' }}>
          <div className=" font-semibold medium_text">Home Page</div>
          <div className=" bg-white " style={{ width: '27.08%'}}>
            <input type="text" className="search-input" placeholder="Search..." />
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
          <a className='large_text font-semibold' style={{marginTop: '4%', textAlign: 'left', display: 'block', color: "#714534" }}>
            Hello [Name]!
          </a>
          <div className='line'/>

          <div className=''>
            <a className='title'> Welcome to JavaJoy! </a>
            <br/>
            <a className='small_text'> 
              We have been eagerly awaiting this moment to meet and work together.
              JavaJoy is thrilled to welcome each new member to our family. Let's
              create unforgettable experiences and build an amazing work
              environment together.<br/> Be ready to explore, innovate, and achieve
              remarkable success.Welcome to our team! <br/> Best regards, <br/> JavaJoy
            </a>
          </div>
          <div className='line'/>
          
          <div className=''>
            {/* Regulations and Terms */}
            <div className='title' style={{flexDirection: 'row'}}>
              <a > Regulations and Terms  </a>
              <button onClick={handleToggleClick} className='icon'>
                {isContentVisible ? <ArrowDropDownRoundedIcon /> : <ArrowDropDownRoundedIcon style={{ transform: 'rotate(-90deg)' }}/>}
              </button>
            </div>
            <br/>
            <div className={`term&condition ${isContentVisible ? 'visible' : 'hidden'}`}>
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

          <div className='WorkSchedule'> 
            <a className='title'>Work Schedule</a>
            <div style={{marginTop: '5%',}}>
              <WorkScheduleTable/>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};
export default HomePage;


