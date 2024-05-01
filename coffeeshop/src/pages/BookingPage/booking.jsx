import React, { useState, useEffect } from "react";
import DashBoard from "../../components/dashBoard/dashBoard";
import { Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import { useSelector } from "react-redux";
import Table from "../../components/table/table";
import "./booking.css";

const Booking = () => {
  const [table, setTable] = useState([]);
<<<<<<< Updated upstream
  const [selectedTable, setSelectedTable] = useState("");
  const handleCellClick = (cellValue) => {
    setSelectedTable(cellValue);
  };
=======
  const [selectedTable, setSelectedTable] = useState(
    "661ffb050f8b90fbff1b40ce"
  );
>>>>>>> Stashed changes
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
            <label>Bàn trống: 06</label>
          </div>
          <div className="workheader">
            <LocalCafeIcon />
            <label>Bàn có khách: 06</label>
          </div>
          <div className="bookheader">
            <CalendarMonthIcon />
            <label>Bàn đã đặt: 06</label>
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
<<<<<<< Updated upstream
        <Table />
=======
        <TableInfo selectedTable={selectedTable} />
>>>>>>> Stashed changes
      </div>
    </Box>
  );
};

export default Booking;
