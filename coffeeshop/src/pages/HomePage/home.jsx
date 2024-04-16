import React from 'react';

import DashBoard from '../../components/dashBoard/dashBoard';
import {Box} from "@mui/material";
import './home.css'

const HomePage = () => {
    return (
      <Box sx={{display: "flex", maxWidth: "100vw", }}>
        <DashBoard/>
        <div className='container'>
          <div className='flex justify-between ' style={{ marginTop: '2.14%',marginLeft: '2.64%', marginRight: '2.64%', flexDirection: 'row' }}>
            <div className=" font-bold medium_text">Home Page</div>
            <div className=" text-base whitespace-nowrap bg-white rounded-xl max-md:pl-5">
              {/* <div className="my-auto">Search...</div> */}
              <input type="text" className="search-input" style={{ fontSize: '16px' }} placeholder="Search..." />
              <div className="shrink-0 rounded-2xl bg-zinc-300 h-[52px] w-[55px]" />
            </div>
            <img
              alt="profile-user"
              width="50px"
              height="50px"
              loading="lazy"
              src={`../../assets/avtUser.png`}
              style={{ cursor: "pointer", borderRadius: "100%" }}
              
            />
          </div>
          <a style={{marginTop: '4%'}}>
            Hello [Name]!
          </a>
        </div>
      </Box>
    );
};

export default HomePage;