import React, { useState, useEffect } from 'react';
import { Box, Tab, Tabs, Typography } from "@mui/material";
import DashBoard from '../../components/dashBoard/dashBoard';
import './analytics.css';
import { Chart as ChartJS,
   ArcElement,
   Tooltip,
   Legend,
   BarElement,
   CategoryScale,
   LinearScale
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
   Tooltip,
   Legend,
   BarElement,
   CategoryScale,
   LinearScale
);

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index} className=''>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const Analytics = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const data = {
    labels: ['One', 'Two', 'Three'],
    datasets: [
      {
        data: [3, 6, 9],
        backgroundColor: ['#659839', '#395632', '#A3AF9E'],
      }
    ]
  }

  const data2 = {
    labels: ['One', 'Two', 'Three'],
    datasets: [
      {
        data: [2, 6, 4],
        backgroundColor: ['#704332', '#DEB99F', '#55433C'],
      }
    ]
  }

  const barData = {
    labels: ['One', 'Two', 'Three'],
    datasets: [
      {
        label: 'Revenue',
        data: [19, 6, 9],
        backgroundColor: ['#DEB99F'],
        borderWidth: 1,
        BorderColor: 'black'
      },
    ]
  }

  const barData1 = {
    labels: ['One', 'Two', 'Three'],
    datasets: [
      {
        label: 'Staffs',
        data: [19, 6, 9],
        backgroundColor: ['#698761'],
        borderWidth: 1,
        BorderColor: 'black'
      },
    ]
  }

  const barOptions = {

  }

  const barOptions1={}
  const options ={

  }

  const options2 ={
    
  }

  return (
    <Box sx={{ display: "flex" }}>
      <DashBoard />
      <div className="container">
        <div className="namePage font-semibold medium_text" style={{ marginTop: "2.15%", textAlign: "left" }}>
          <a>Analytics</a>
        </div>
        <div className='time_analyticsTabs' >
         <Box className="time_tabs" sx={{ }}>
            <Tabs value={value} onChange={handleChange} label="basic tabs example"
                  indicatorColor="transparent" centered>
              <Tab label="Today" sx={{textTransform: 'none', fontSize: '14px'}} />
              <Tab label="Month" sx={{textTransform: 'none', fontSize: '14px'}} />
              <Tab label="Year"  sx={{textTransform: 'none', fontSize: '14px'}} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0} className='content'>
            <div className='justify-between' style={{display: 'flex' ,flexDirection: 'row'}}>
              <div className='squareCard card'>
                <a className='small_text' style={{alignSelf: 'flex-start', justifySelf: 'flex-start'}}>Quantity of drinks</a>
                <Pie 
                  data={data}
                  options= {options}
                />
              </div>
              <div className='squareCard card'>
                <a className='small_text' style={{alignSelf: 'flex-start', justifySelf: 'flex-start'}}>Price per drink</a>
                <Pie 
                  data={data2}   
                  options={options2}   
                />
              </div>
              <div className='flex' style={{ flexDirection: 'column', justifyContent: 'space-between', width:  '20%'}}>
                <div className='smallRectangleCard card'> 
                  <a className='small_text' style={{alignSelf: 'flex-start', justifySelf: ''}}>Revenue</a>
                  <a className='normal_text' >10.000.000</a>
                </div>
                <div className='smallRectangleCard card'> 
                  <a className='small_text' style={{alignSelf: 'flex-start', justifySelf: 'flex-start'}}>Customers</a>
                  <a className='normal_text' style={{  }}>100</a>
                </div>
                <div className='smallRectangleCard card'> 
                  <a className='small_text' style={{alignSelf: 'flex-start', justifySelf: 'flex-start'}}>Chưa biết</a>
                  <a className='normal_text' style={{  }}>100</a>
                </div>
              </div>
            </div>
            <div className='justify-between' style={{display: 'flex' ,flexDirection: 'row', marginTop: '10px',}}>
              <div className='bigRectangleCard card'>
                <Bar data={barData} options={barOptions} />
              </div>
              <div className='bigRectangleCard card'>
                <Bar data={barData1} options={barOptions1} />
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1} className='content'>
          <div className='justify-between' style={{display: 'flex' ,flexDirection: 'row'}}>
              <div className='squareCard card'>
                <a className='small_text' style={{alignSelf: 'flex-start', justifySelf: 'flex-start'}}>Quantity of drinks</a>
                <Pie 
                  data={data}
                  options= {options}
                />
              </div>
              <div className='squareCard card'>
                <a className='small_text' style={{alignSelf: 'flex-start', justifySelf: 'flex-start'}}>Price per drink</a>
                <Pie 
                  data={data2}   
                  options={options2}   
                />
              </div>
              <div className='flex' style={{ flexDirection: 'column', justifyContent: 'space-between', width:  '20%'}}>
                <div className='smallRectangleCard card'> 
                  <a className='small_text' style={{alignSelf: 'flex-start', justifySelf: ''}}>Revenue</a>
                  <a className='normal_text' >10.000.000</a>
                </div>
                <div className='smallRectangleCard card'> 
                  <a className='small_text' style={{alignSelf: 'flex-start', justifySelf: 'flex-start'}}>Customers</a>
                  <a className='normal_text' style={{  }}>100</a>
                </div>
                <div className='smallRectangleCard card'> 
                  <a className='small_text' style={{alignSelf: 'flex-start', justifySelf: 'flex-start'}}>Chưa biết</a>
                  <a className='normal_text' style={{  }}>100</a>
                </div>
              </div>
            </div>
            <div className='justify-between' style={{display: 'flex' ,flexDirection: 'row', marginTop: '10px',}}>
              <div className='bigRectangleCard card'>
                <Bar data={barData} options={barOptions} />
              </div>
              <div className='bigRectangleCard card'>
                <Bar data={barData1} options={barOptions1} />
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={2} className='content'>
          <div className='justify-between' style={{display: 'flex' ,flexDirection: 'row'}}>
              <div className='squareCard card'>
                <a className='small_text' style={{alignSelf: 'flex-start', justifySelf: 'flex-start'}}>Quantity of drinks</a>
                <Pie 
                  data={data}
                  options= {options}
                />
              </div>
              <div className='squareCard card'>
                <a className='small_text' style={{alignSelf: 'flex-start', justifySelf: 'flex-start'}}>Price per drink</a>
                <Pie 
                  data={data2}   
                  options={options2}   
                />
              </div>
              <div className='flex' style={{ flexDirection: 'column', justifyContent: 'space-between', width:  '20%'}}>
                <div className='smallRectangleCard card'> 
                  <a className='small_text' style={{alignSelf: 'flex-start', justifySelf: ''}}>Revenue</a>
                  <a className='normal_text' >10.000.000</a>
                </div>
                <div className='smallRectangleCard card'> 
                  <a className='small_text' style={{alignSelf: 'flex-start', justifySelf: 'flex-start'}}>Customers</a>
                  <a className='normal_text' style={{  }}>100</a>
                </div>
                <div className='smallRectangleCard card'> 
                  <a className='small_text' style={{alignSelf: 'flex-start', justifySelf: 'flex-start'}}>Chưa biết</a>
                  <a className='normal_text' style={{  }}>100</a>
                </div>
              </div>
            </div>
            <div className='justify-between' style={{display: 'flex' ,flexDirection: 'row', marginTop: '10px',}}>
              <div className='bigRectangleCard card'>
                <Bar data={barData} options={barOptions} />
              </div>
              <div className='bigRectangleCard card'>
                <Bar data={barData1} options={barOptions1} />
              </div>
            </div>
          </TabPanel>
        </div>
      </div>
    </Box>
  );
};

export default Analytics;