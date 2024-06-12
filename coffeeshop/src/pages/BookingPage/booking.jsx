import React, { useState, useEffect } from "react";
import DashBoard from "../../components/dashBoard/dashBoard";
import { Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import { useSelector } from "react-redux";
import TableInfo from "../../components/table/TableInfo";
import "./booking.css";

const Booking = () => {
  const [table, setTable] = useState([]);
  const [availableTables, setAvailableTables] = useState(0);
  const [occupiedTables, setOccupiedTables] = useState(0);
  const [bookedTables, setBookedTables] = useState(0);

  const [selectedTable, setSelectedTable] = useState(
    "661ffb050f8b90fbff1b40ce"
  );

  const { token } = useSelector((state) => state.auths);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3005/booking/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTable(data);
          const statusCount = data.reduce((count, item) => {
            count[item.status] = (count[item.status] || 0) + 1;
            return count;
          }, {});

          setAvailableTables(statusCount.available || 0);
          setOccupiedTables(statusCount.occupied || 0);
          setBookedTables(statusCount.booked || 0);
        } else {
          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Request failed with error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ display: "flex", backgroundColor: "#f9f8fb" }}>
      <DashBoard />

      <div
        style={{
          paddingLeft: "16px",
          textAlign: "left",
        }}
      >
        <label className="headerBooking">Quản lý đặt bàn</label>

        <div className="number">
          <div className="emptyheader">
            <CheckCircleIcon />
            <label>Bàn trống: {availableTables}</label>
          </div>
          <div className="workheader">
            <LocalCafeIcon />
            <label>Bàn có khách: {occupiedTables}</label>
          </div>
          <div className="bookheader">
            <CalendarMonthIcon />
            <label>Bàn đã đặt: {bookedTables}</label>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="containerGrid">
            {table.map((item) => {
              let containerColor = "";
              let iconComponent;
              if (item.status === "available") {
                containerColor = "#38cf36";
                iconComponent = <CheckCircleIcon />;
              } else if (item.status === "occupied") {
                containerColor = "#d63c3c";
                iconComponent = <LocalCafeIcon />;
              } else if (item.status === "booked") {
                containerColor = "black";
                iconComponent = <CalendarMonthIcon />;
              }

              return (
                <button
                  className="containercard"
                  key={item._id}
                  style={{ color: containerColor }}
                  onClick={() => {
                    console.log("table click");
                    setSelectedTable(item._id);
                  }}
                >
                  <TableRestaurantIcon />
                  <label className="tableNumber">Bàn {item.tableNumber}</label>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <TableInfo selectedTable={selectedTable} />
      </div>
    </Box>
  );
};

export default Booking;
