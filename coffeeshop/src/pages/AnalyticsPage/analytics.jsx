import React, { useState, useEffect } from 'react';
import { Box, Tab, Tabs, Typography } from "@mui/material";
import DashBoard from '../../components/dashBoard/dashBoard';
import { useSelector } from "react-redux";
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

import axios from 'axios';
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
  const { token } = useSelector((state) => state.auths);

  const [value, setValue] = useState(0);

  //tổng khách hàng
  const [todayCustomers, setTodayCustomers] = useState();
  const [currentMonthCustomers, setCurrentMonthCustomers] = useState();
  const [currentYearCustomers, setCurrentYearCustomers] = useState();

  //tổng doanh thu
  const [todayRevenue, setTodayRevenue] =useState()
  const [currentMonthRevenue, setCurrentMonthRevenue] =useState()
  const [currentYearRevenue, setCurrentYearRevenue] =useState()

  //tổng loại hình thanh toán
  const [todayPaymentMethods, setTodayPaymentMethods] = useState({ Cash: 0, Digital: 0, Card: 0 });
  const [monthPaymentMethods, setMonthPaymentMethods] = useState({ Cash: 0, Digital: 0, Card: 0 });
  const [yearPaymentMethods, setYearPaymentMethods] = useState({ Cash: 0, Digital: 0, Card: 0 });

  //tròn số lượng từng món nước
  const [todayDrinksQuantity, setTodayDrinksQuantity] = useState({});
  const [currentMonthDrinksQuantity, setCurrentMonthDrinksQuantity] = useState({});
  const [currentYearDrinksQuantity, setCurrentYearDrinksQuantity] = useState({});
  const [drinkNames, setDrinkNames] = useState({});

  //Cột doanh thu
  const [todayRevenueData, setTodayRevenueData] = useState([]);
  const [monthRevenueData, setMonthRevenueData] = useState([]);
  const [yearRevenueData, setYearRevenueData] = useState([]);

  //
  const [todayRevenuePerDrink, setTodayRevenuePerDrink] = useState({});
  const [monthRevenuePerDrink, setMonthRevenuePerDrink] = useState({});
  const [yearRevenuePerDrink, setYearRevenuePerDrink] = useState({});

  //cột peak hours 
  const [todayPeakHours, setTodayPeakHours] = useState([0, 0, 0, 0]);
  const [monthPeakHours, setMonthPeakHours] = useState([0, 0, 0, 0]);
  const [yearPeakHours, setYearPeakHours] = useState([0, 0, 0, 0]);
   // Hàm lấy tất cả các hóa đơn từ database 
  const getAllOrder = async (startDate = '', endDate = '') => {
    try {
      const response = await axios.get('http://localhost:3005/history/', {
        params: { startDate, endDate }
      });
      if (response.data && response.data.length > 0) {
        return response.data;
      }
      return [];
    } catch (error) {
      console.error('Failed to fetch all orders', error);
      return [];
    }
  };

  const fetchAnalyticsData = async () => {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0)).toISOString();
    const endOfToday = new Date(today.setHours(23, 59, 59, 999)).toISOString();

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999).toISOString();

    const startOfYear = new Date(today.getFullYear(), 0, 1).toISOString();
    const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999).toISOString();

    const todayOrders = await getAllOrder(startOfToday, endOfToday);
    const monthOrders = await getAllOrder(startOfMonth, endOfMonth);
    const yearOrders = await getAllOrder(startOfYear, endOfYear);

    //lấy số lượng của top5 món bán chạy nhất  
    const getTop5Drinks = (drinksQuantity) => {
      return Object.entries(drinksQuantity)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});
    };

    const getTop5RevenuePerDrink = (revenuePerDrink) => {
      return Object.entries(revenuePerDrink)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});
    };

    //tính toán biểu đồ
    const calculateMetrics = (orders) => {
      const customers = orders.length;
      const revenue = orders.reduce((total, order) => total + order.totalAmount, 0);
      
      const drinksQuantity = {};
      const paymentMethods = { Cash: 0, Digital: 0, Card: 0 };
      const revenuePerDrink = {};
      const peakHours = [0, 0, 0, 0]; 
    
      orders.forEach(order => {
        const orderHour = new Date(order.createdAt).getHours() + (new Date(order.createdAt).getMinutes() / 60);
        if (orderHour >= 0 && orderHour < 12) {
          peakHours[0]++;
        } else if (orderHour >= 12 && orderHour < 17) {
          peakHours[1]++;
        } else if (orderHour >= 17 && orderHour < 20) {
          peakHours[2]++;
        } else if (orderHour >= 20 && orderHour < 24) {
          peakHours[3]++;
        }
    
        // Tính toán số lượng đồ uống
        order.items.forEach(item => {
          const drinkId = item.drink.toString();
          if (drinksQuantity[drinkId]) {
            drinksQuantity[drinkId] += item.quantity;
          } else {
            drinksQuantity[drinkId] = item.quantity;
          }
    
          // Tính toán doanh thu cho từng loại đồ uống
          const drinkRevenue = item.quantity * item.price;
          if (revenuePerDrink[drinkId]) {
            revenuePerDrink[drinkId] += drinkRevenue;
          } else {
            revenuePerDrink[drinkId] = drinkRevenue;
          }
        });
    
        // Tính toán phương thức thanh toán
        paymentMethods[order.PaymentMethod] = (paymentMethods[order.PaymentMethod] || 0) + 1;
      });
    
      return { 
        customers, 
        revenue, 
        drinksQuantity, 
        paymentMethods, 
        revenuePerDrink, 
        peakHours,
        orders 
      };
    };

    const todayMetrics = calculateMetrics(todayOrders);
    const monthMetrics = calculateMetrics(monthOrders);
    const yearMetrics = calculateMetrics(yearOrders);

    setTodayCustomers(todayMetrics.customers);
    setTodayRevenue(todayMetrics.revenue);
    setTodayPaymentMethods(todayMetrics.paymentMethods);
    setTodayDrinksQuantity(getTop5Drinks(todayMetrics.drinksQuantity));
    setTodayRevenuePerDrink(getTop5RevenuePerDrink(todayMetrics.revenuePerDrink));

    setCurrentMonthCustomers(monthMetrics.customers);
    setCurrentMonthRevenue(monthMetrics.revenue);
    setMonthPaymentMethods(monthMetrics.paymentMethods);
    setCurrentMonthDrinksQuantity(getTop5Drinks(monthMetrics.drinksQuantity));
    setMonthRevenuePerDrink(getTop5RevenuePerDrink(monthMetrics.revenuePerDrink));

    setCurrentYearCustomers(yearMetrics.customers);
    setCurrentYearRevenue(yearMetrics.revenue);
    setYearPaymentMethods(yearMetrics.paymentMethods);
    setCurrentYearDrinksQuantity(getTop5Drinks(yearMetrics.drinksQuantity));
    setYearRevenuePerDrink(getTop5RevenuePerDrink(yearMetrics.revenuePerDrink));

    // Fetch names for today's drinks 
    await fetchAllDrinkNames(Object.keys(todayMetrics.drinksQuantity));
    await fetchAllDrinkNames(Object.keys(monthMetrics.drinksQuantity));
    await fetchAllDrinkNames(Object.keys(yearMetrics.drinksQuantity));
    
    // Calculate revenue data for different time periods
    setTodayRevenueData(calculateRevenueByTime(todayMetrics.orders, 'day'));
    setMonthRevenueData(calculateRevenueByTime(monthMetrics.orders, 'month'));
    setYearRevenueData(calculateRevenueByTime(yearMetrics.orders, 'year'));

    //set peak hours
    setTodayPeakHours(todayMetrics.peakHours);
    setMonthPeakHours(monthMetrics.peakHours);
    setYearPeakHours(yearMetrics.peakHours);
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const calculateRevenueByTime = (orders, period) => {
    const revenueData = [];
    if (period === 'day') {
      const intervals = [
        { label: '07:30 - 12:30', start: 7.5, end: 12.5 },
        { label: '12:30 - 17:30', start: 12.5, end: 17.5 },
        { label: '17:30 - 22:30', start: 17.5, end: 22.5 }
      ];
  
      intervals.forEach(interval => {
        const revenue = orders.reduce((total, order) => {
          const orderTime = new Date(order.createdAt).getHours() + 7 + (new Date(order.createdAt).getMinutes() / 60);
          if (orderTime >= interval.start && orderTime < interval.end) {
            total += order.totalAmount;
          }
          return total;
        }, 0);
        revenueData.push(revenue);
      });
    } else if (period === 'month') {
      const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      const startOfWeek = [1, 8, 15, 22];
  
      for (let i = 0; i < weeks.length; i++) {
        const revenue = orders.reduce((total, order) => {
          const orderDate = new Date(order.createdAt).getDate();
          if (orderDate >= startOfWeek[i] && orderDate < startOfWeek[i] + 7) {
            total += order.totalAmount;
          }
          return total;
        }, 0);
        revenueData.push(revenue);
      }
    } else if (period === 'year') {
      for (let i = 0; i < 12; i++) {
        const revenue = orders.reduce((total, order) => {
          const orderMonth = new Date(order.createdAt).getMonth();
          if (orderMonth === i) {
            total += order.totalAmount;
          }
          return total;
        }, 0);
        revenueData.push(revenue);
      }
    }
    return revenueData;
  };
  
  const getDrinkName = (id) => drinkNames[id] || id;

  const todayDrinksLabels = Object.keys(todayDrinksQuantity).map(getDrinkName);
  const todayDrinksData = Object.values(todayDrinksQuantity);

  const monthDrinksLabels = Object.keys(currentMonthDrinksQuantity).map(getDrinkName);
  const monthDrinksData = Object.values(currentMonthDrinksQuantity);

  const yearDrinksLabels = Object.keys(currentYearDrinksQuantity).map(getDrinkName);
  const yearDrinksData = Object.values(currentYearDrinksQuantity);


  const fetchDrinkNameById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3005/menu/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  // Đảm bảo rằng bạn đã có `token` ở đâu đó trong mã của bạn
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.Name;  
      } else {
        console.error("Request failed with status:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Request failed with error:", error);
      return null;
    }
  };

  const fetchAllDrinkNames = async (drinkIds) => {
    const names = {};
    for (const id of drinkIds) {
      const name = await fetchDrinkNameById(id);
      if (name) names[id] = name;
    }
    setDrinkNames(names);
  };

  const todayRevenueBarData = {
    labels: ['07:30 - 12:30', '12:30 - 17:30', '17:30 - 22:30'],
    datasets: [
      {
        label: 'Revenue',
        data: todayRevenueData,
        backgroundColor: ['#DEB99F'],
        borderWidth: 1,
        borderColor: 'black'
      },
    ]
  };
  
  const monthRevenueBarData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Revenue',
        data: monthRevenueData,
        backgroundColor: ['#DEB99F'],
        borderWidth: 1,
        borderColor: 'black'
      },
    ]
  };
  
  const yearRevenueBarData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: yearRevenueData,
        backgroundColor: ['#DEB99F'],
        borderWidth: 1,
        borderColor: 'black'
      },
    ]
  };

  const createPeakHoursChartData = (data) => ({
    labels: ['07:00 - 12:00', '12:00 - 17:00', '17:00 - 20:00', '20:00 - 23:00'],
    datasets: [
      {
        label: 'Peak hours',
        data: data,
        backgroundColor: '#006D5B',
        borderWidth: 1,
        borderColor: 'black',
      },
    ],
  });
  
  const todayPeakHoursChartData = createPeakHoursChartData(todayPeakHours);
  const monthPeakHoursChartData = createPeakHoursChartData(monthPeakHours);
  const yearPeakHoursChartData = createPeakHoursChartData(yearPeakHours);
  
  const barOptions = {
    scales: {
      y: {
        ticks: {
          callback: function(value, index, ticks) {
            return value + 'k VND';
          }
        }
      }
    }
  }

  const barOptions1 = {
    scales: {
      y: {
        ticks: {
          callback: function(value, index, ticks) {
            return value + ' Orders';
          }
        }
      }
    }
  };
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
              <Tab label="Today" sx={{textTransform: 'none', fontSize: '14px'}}/>
              <Tab label="Month" sx={{textTransform: 'none', fontSize: '14px'}}/>
              <Tab label="Year"  sx={{textTransform: 'none', fontSize: '14px'}}/>
            </Tabs>
          </Box>
          <TabPanel value={value} index={0} className='content'>
            <div className='justify-between' style={{display: 'flex' ,flexDirection: 'row'}}>
              <div className='squareCard card'>
                <a className='label_text' style={{alignSelf: 'flex-start', marginLeft: "2px"}}>Top 5 Quantity of drinks</a>
                <Pie 
                  data={{
                    labels: todayDrinksLabels,
                    datasets: [
                      {
                        data: todayDrinksData,
                        backgroundColor: ['#659839', '#395632', '#A3AF9E'],
                      }
                    ]
                  }}
                  options={options}
                />
              </div>
              <div className='squareCard card'>
                <a className='label_text' style={{alignSelf: 'flex-start', marginLeft: "2px"}}>Top 5 Price per drink</a>
                <Pie 
                  data={{
                    labels: Object.keys(todayRevenuePerDrink).map(getDrinkName),
                    datasets: [
                      {
                        data: Object.values(todayRevenuePerDrink),
                        backgroundColor: ['#704332', '#9F8170','#DEB99F', '#4B3621', '#6F4E37']
                      }
                    ]}}   
                  options={options2}   
                />
              </div>
              <div className='flex' style={{ flexDirection: 'column', justifyContent: 'space-between', width:  '25%'}}>
                <div className='smallRectangleCard card'> 
                  <a className='label_text' style={{alignSelf: 'flex-start', position:"absolute", marginLeft: "2px", top: "2px"}}>Revenue</a>
                  <a className='normal_text' >{todayRevenue}.000 VND</a>
                </div>
                <div className='smallRectangleCard card'> 
                  <a className='label_text' style={{alignSelf: 'flex-start', position:"absolute", top: "0"}}>Customers</a>
                  <a className='normal_text' style={{  }}>{todayCustomers}</a>
                </div>
                <div className='smallRectangleCard card'> 
                  <a className='label_text' style={{alignSelf: 'flex-start', textAlign:"left", position:"absolute", top: "0"}}>Payment Method (Cash/Digital/Card): </a>
                  <a className='normal_text' style={{  }}>{todayPaymentMethods.Cash}/{todayPaymentMethods.Digital}/{todayPaymentMethods.Card}</a>
                </div>
              </div>
            </div>
            <div className='justify-between' style={{display: 'flex' ,flexDirection: 'row', marginTop: '10px',}}>
              <div className='bigRectangleCard card'>
                <Bar data={todayRevenueBarData} options={barOptions} />
              </div>
              <div className='bigRectangleCard card'>
                <Bar data={todayPeakHoursChartData} options={barOptions1} />
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1} className='content'>
            <div className='justify-between' style={{display: 'flex' ,flexDirection: 'row'}}>
              <div className='squareCard card'>
                <a className='label_text' style={{alignSelf: 'flex-start', marginLeft: "2px"}}>Top 5 Quantity of drinks</a>
                <Pie 
                  data={{
                    labels: monthDrinksLabels,
                    datasets: [
                      {
                        data: monthDrinksData,
                        backgroundColor: [ '#659839', '#A3AF9E', '#708238', '#8A9A5B', '#395632', '#0B6623', '#8F9779', '#3B7A57', '#317873', '#50C878', '#043927', '#9DC183', '#C7EA46', '#D0F0C0', '#50C878'],
                      }
                    ]
                  }}
                  options={options}
                />
              </div>
              <div className='squareCard card'>
                <a className='label_text' style={{alignSelf: 'flex-start', marginLeft: "2px" }}>Top 5 Price per drink</a>
                <Pie 
                  data={{
                    labels: Object.keys(monthRevenuePerDrink).map(getDrinkName),
                    datasets: [
                      {
                        data: Object.values(monthRevenuePerDrink),
                        backgroundColor:  ['#704332', '#9F8170','#DEB99F', '#4B3621', '#6F4E37']
                      }
                    ]}}   
                  options={options2}    
                />
              </div>
              <div className='flex' style={{ flexDirection: 'column', justifyContent: 'space-between', width:  '20%'}}>
                <div className='smallRectangleCard card'> 
                  <a className='label_text' style={{alignSelf: 'flex-start', position:"absolute", marginLeft: "2px", top: "2px"}}>Revenue</a>
                  <a className='normal_text' >{currentMonthRevenue}.000 VND</a>
                </div>
                <div className='smallRectangleCard card'> 
                  <a className='label_text' style={{alignSelf: 'flex-start', position:"absolute", marginLeft: "2px", top: "2px"}}>Customers</a>
                  <a className='normal_text' style={{  }}>{currentMonthCustomers}</a>
                </div>
                <div className='smallRectangleCard card'> 
                  <a className='label_text' style={{alignSelf: 'flex-start', position:"absolute", marginLeft: "2px", top: "2px", textAlign:"left"}}>Payment Method (Cash/Digital/Card): </a>
                  <a className='normal_text' style={{  }}>{monthPaymentMethods.Cash}/{monthPaymentMethods.Digital}/{monthPaymentMethods.Card}</a>
                </div>
              </div>
            </div>
            <div className='justify-between' style={{display: 'flex' ,flexDirection: 'row', marginTop: '10px',}}>
              <div className='bigRectangleCard card'>
                <Bar data={monthRevenueBarData} options={barOptions} />
              </div>
              <div className='bigRectangleCard card'>
                <Bar data={monthPeakHoursChartData} options={barOptions1} />
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={2} className='content'>
            <div className='justify-between' style={{display: 'flex' ,flexDirection: 'row'}}>
              <div className='squareCard card'>
                <a className='label_text' style={{alignSelf: 'flex-start', marginLeft: "2px" }}>Top 5 Quantity of drinks</a>
                <Pie 
                  data={{
                    labels: yearDrinksLabels,
                    datasets: [
                      {
                        data: Object.values(currentYearDrinksQuantity),
                        backgroundColor: [ '#A3AF9E', '#708238', '#8A9A5B', '#659839', '#395632', '#0B6623', '#8F9779', '#3B7A57', '#317873', '#50C878', '#043927', '#9DC183', '#C7EA46', '#D0F0C0', '#50C878'],
                      }
                    ]
                  }}
                  options={options}
                />
              </div>
              <div className='squareCard card'>
                <a className='label_text' style={{alignSelf: 'flex-start', marginLeft: "2px" }}>Top 5 Price per drink</a>
                <Pie 
                  data={{
                    labels: Object.keys(yearRevenuePerDrink).map(getDrinkName),
                    datasets: [
                      {
                        data: Object.values(yearRevenuePerDrink),
                        backgroundColor:  ['#704332', '#9F8170','#DEB99F', '#4B3621', '#6F4E37']
                      }
                    ]}}   
                  options={options2}    
                />
              </div> 
              <div className='flex' style={{ flexDirection: 'column', justifyContent: 'space-between', width:  '20%'}}>
                <div className='smallRectangleCard card'> 
                  <a className='label_text' style={{alignSelf: 'flex-start', position:"absolute", marginLeft: "2px", top: "2px"}}>Revenue</a>
                  <a className='normal_text' >{currentYearRevenue}.000 VND</a>
                </div>
                <div className='smallRectangleCard card'> 
                  <a className='label_text' style={{alignSelf: 'flex-start', position:"absolute", marginLeft: "2px", top: "2px"}}>Customers</a>
                  <a className='normal_text' style={{  }}>{currentYearCustomers}</a>
                </div>
                <div className='smallRectangleCard card'> 
                  <a className='label_text' style={{alignSelf: 'flex-start', position:"absolute", marginLeft: "2px", top: "2px", textAlign:"left"}}>Payment Method (Cash/Digital/Card): </a>
                  <a className='normal_text' style={{  }}>{yearPaymentMethods.Cash}/{yearPaymentMethods.Digital}/{yearPaymentMethods.Card}</a>
                </div>
              </div>
            </div>
            <div className='justify-between' style={{display: 'flex' ,flexDirection: 'row', marginTop: '10px',}}>
              <div className='bigRectangleCard card'>
                <Bar data={yearRevenueBarData} options={barOptions} />
              </div>
              <div className='bigRectangleCard card'>
                <Bar data={yearPeakHoursChartData} options={barOptions1} />
              </div>
            </div>
          </TabPanel>
        </div>
      </div>
    </Box>
  );
};

export default Analytics;