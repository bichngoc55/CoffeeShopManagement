import React, { useState, useEffect } from 'react';
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
import { BorderColorOutlined } from '@mui/icons-material';

ChartJS.register(
  ArcElement,
   Tooltip,
   Legend,
   BarElement,
   CategoryScale,
   LinearScale
);

const analyticsChartData = () => {
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
}

export default analyticsChartData;