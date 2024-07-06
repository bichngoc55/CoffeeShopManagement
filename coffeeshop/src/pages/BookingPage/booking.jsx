import React, { useState, useEffect } from "react";
import DashBoard from "../../components/dashBoard/dashBoard";
import { Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import { useSelector } from "react-redux";
import TableInfo from "../../components/table/TableInfo";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./booking.css";
import CalendarTable from "../../components/table/calendar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import TableAdd from "../../components/table/tableAdd";
import FormTable from "../../components/table/modalTable";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Booking = () => {
  const [table, setTable] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [deleteSchedule, setDeleteSchedule] = useState();

  const [availableTables, setAvailableTables] = useState(0);
  const [occupiedTables, setOccupiedTables] = useState(0);
  const [bookedTables, setBookedTables] = useState(1);
  const [selectedTable, setSelectedTable] = useState(
    "6686b13771a3ca0ad2ed537c"
  );
  const [selectedTableBookings, setSelectedTableBookings] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(1);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auths);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const openModalAdd = () => {
    setIsOpenAdd(true);
  };

  const closeModalAdd = () => {
    setIsOpenAdd(false);
  };
  const onCloseAndUpdate = () => {
    setIsOpenAdd(false);
    setEditingBooking(null);
    fetchData();
    fetchBookings();
  };
  //const [isOpenEdit, setIsOpenEdit] = useState(false);

  const [editingBooking, setEditingBooking] = useState(null);

  const openModalEdit = (booking) => {
    setEditingBooking(booking);
  };

  const closeModalEdit = () => {
    setEditingBooking(null);
  };
  const AddTable = async () => {
    const newTable = {
      tableNumber: table.length + 1,
    };
    const response = await fetch("http://localhost:3005/booking/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTable),
    });
    if (!response.ok) {
      throw new Error(`Error add table: ${response}`);
    } else fetchData();
  };

  const DeleteTable = async (id) => {
    const response = await fetch(`http://localhost:3005/booking/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error delete table: ${response}`);
    } else fetchData();
  };
  const deleteBooking = async (booking) => {
    const response = await fetch(
      `http://localhost:3005/booking/${selectedNumber}/${booking._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error delete table: ${response}`);
    } else {
      fetchData();
      fetchBookings();
    }
  };

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
        console.log("goi fetch data trong booking");
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
        if (response.status === 500) {
          alert("Lỗi kết nối đến máy chủ");
          navigate("/login");
        }
      }
    } catch (error) {
      console.error("Request failed with error:", error);
    }
  };
  const fetchBookings = async () => {
    if (selectedTable) {
      try {
        const response = await fetch(
          `http://localhost:3005/booking/${selectedTable}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setSelectedTableBookings(data.Booking || []);
        } else {
          console.error("Failed to fetch bookings");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
    if (selectedTable) {
      fetchBookings();
    }
  }, [selectedTable]);
  const ClickTable = (item) => {
    setSelectedTable(item._id);
    setSelectedNumber(item.tableNumber);
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#f9f8fb" }}>
      <DashBoard />

      <div
        style={{
          //paddingLeft: "16px",
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
                    ClickTable(item);
                  }}
                >
                  <TableRestaurantIcon />
                  <label className="tableNumber">Bàn {item.tableNumber}</label>
                </button>
              );
            })}
          </div>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "40px",
            paddingRight: "40px",
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          <Button
            sx={{
              color: "#704332",
              fontSize: 14,
              fontWeight: 600,
              width: "30%",
              borderRadius: "20px",
              borderColor: "#704332",
            }}
            variant="outlined"
            onClick={() => AddTable()}
          >
            Add Table
          </Button>
          <Button
            sx={{
              color: "white",
              backgroundColor: "#704332",
              fontSize: 14,
              fontWeight: 600,
              width: "30%",
              borderRadius: "20px",
              borderColor: "#704332",
            }}
            variant="filled"
            onClick={() => DeleteTable(table[table.length - 1]._id)}
          >
            Delete Table
          </Button>
          <Button
            sx={{
              color: "#704332",
              fontSize: 14,
              fontWeight: 600,
              width: "30%",
              borderRadius: "20px",
              borderColor: "#704332",
            }}
            variant="outlined"
            onClick={() => openModal()}
          >
            View Calendar
          </Button>
        </div>
        <CalendarTable isOpen={isOpen} onClose={closeModal} />
      </div>

      <div
        style={{
          flex: 1,
          backgroundColor: "white",
          borderRadius: "20px",
          marginTop: "20px",
          marginBottom: "20px",
          marginRight: "20px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="bookinglist">
          <label style={{ fontSize: "14px", fontWeight: "bold" }}>
            Table {selectedNumber}
          </label>
          <Button
            sx={{ fontSize: "14px", fontWeight: "bold" }}
            onClick={openModalAdd}
          >
            <AddIcon fontSize="small" sx={{ marginRight: "5px" }} />
            Add
          </Button>
          <TableAdd
            isOpenAdd={isOpenAdd}
            onCloseAdd={closeModalAdd}
            onCloseAndUpdateAdd={onCloseAndUpdate}
            tableNumber={selectedNumber}
          />
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#BBE9FF" }}>
                <TableCell sx={{ fontSize: "14px", fontWeight: "bold" }}>
                  NO
                </TableCell>
                <TableCell sx={{ fontSize: "14px", fontWeight: "bold" }}>
                  Date
                </TableCell>
                <TableCell sx={{ fontSize: "14px", fontWeight: "bold" }}>
                  Time
                </TableCell>
                <TableCell sx={{ fontSize: "14px", fontWeight: "bold" }}>
                  Customer
                </TableCell>
                <TableCell sx={{ fontSize: "14px", fontWeight: "bold" }}>
                  Option
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedTableBookings.map((booking, index) => (
                <TableRow
                  key={booking._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontSize: "12px" }}
                    align="center"
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px" }} align="center">
                    {new Date(booking.bookingDate).toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px" }} align="center">
                    {booking.bookingTime}
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px" }} align="center">
                    {booking.customerName}
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>
                    <Button onClick={() => openModalEdit(booking)}>
                      <EditIcon fontSize="small" sx={{ marginRight: "5px" }} />
                      Edit
                    </Button>
                    <Button
                      onClick={(e) => {
                        handleClick(e);
                        setDeleteSchedule(booking);
                      }}
                    >
                      <DeleteIcon
                        fontSize="small"
                        sx={{ marginRight: "5px" }}
                      />
                      Delete
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={() => deleteBooking(deleteSchedule)}>
                        Sure
                      </MenuItem>
                      <MenuItem onClick={handleClose}>Cancel</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {editingBooking && (
            <FormTable
              isOpen={Boolean(editingBooking)}
              onClose={closeModalEdit}
              data={editingBooking}
              onCloseAndUpdate={onCloseAndUpdate}
              tableNumber={selectedNumber}
            />
          )}
        </TableContainer>
      </div>
    </Box>
  );
};

export default Booking;
