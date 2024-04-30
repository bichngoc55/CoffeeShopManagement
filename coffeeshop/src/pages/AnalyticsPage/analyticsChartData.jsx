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

}

export default analyticsChartData;