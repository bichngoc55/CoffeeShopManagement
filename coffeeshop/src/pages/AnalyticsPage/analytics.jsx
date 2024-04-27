import React, {useState} from 'react';

import { Box, Tab, Tabs, Typography } from "@mui/material";
import DashBoard from '../../components/dashBoard/dashBoard';
import './analytics.css'

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={4}>{children}</Box>}
    </div>
  );
};

const Analytics = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <DashBoard />
      <div className="container">
        <div className="namePage font-semibold medium_text" style={{ marginTop: "2.15%", textAlign: "left" }}>
          <a>Analytics</a>
        </div>
        <div className='time_analyticsTabs'>
         <Box className="time_tabs" sx={{ }}>
            <Tabs value={value} onChange={handleChange} label="basic tabs example" sx={{  }}
                  indicatorColor="transparent" centered>
              <Tab label="Today" className='small_text' sx={{}}/>
              <Tab label="Week" className='small_text'/>  
              <Tab label="Month"className='small_text'/>
              <Tab label="Year" className='small_text'/>
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Typography>Item One Content</Typography>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography>Item Two Content</Typography>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Typography>Item Three Content</Typography>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Typography>Item Four Content</Typography>
          </TabPanel>
        </div>
      </div>
    </Box>
  );
};

export default Analytics;
