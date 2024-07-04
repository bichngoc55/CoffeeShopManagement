import React, { useState, useEffect } from "react";
import "./table.css";
import AccountCircle from "@mui/icons-material/AccountCircle";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditNoteIcon from "@mui/icons-material/EditNote";
import FormTable from "./modalTable";
import { useSelector } from "react-redux";
import Gachchan from "./gachchan";
import { useNavigate } from "react-router-dom";

const TableInfo = ({ selectedTable, update }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const onCloseAndUpdate = () => {
    setIsOpen(false);
    fetchData();
    update();
  };
  const { token } = useSelector((state) => state.auths);
  const [table, setTable] = useState({
    customerName: "",
    tableNumber: 0,
    bookingDate: new Date().toISOString(),
    bookingTime: "",
    numberOfPeople: 0,
    phoneNumberBooking: "",
    note: "",
    status: "",
  });
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      console.log("Fetching data table");
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
        console.log(data);
        let formattedDate = "";
        if (data.bookingDate !== undefined) {
          let dateString = data.bookingDate;
          let parts = dateString.split("T");
          formattedDate = parts[0];
        }
        setTable({
          customerName: data.customerName,
          tableNumber: data.tableNumber,
          bookingDate: formattedDate,
          bookingTime: data.bookingTime,
          numberOfPeople: data.numberOfPeople,
          phoneNumberBooking: data.phoneNumberBooking,
          note: data.note,
          status: data.status,
        });
      } else {
        if (response.status === 500) {
          alert("Lỗi kết nối đến máy chủ");
          navigate("/login");
        }
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Request failed with error:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [selectedTable]);

  return (
    <div className="tableInfoContainer">
      <h1 className="headerTable">Thông tin đặt bàn</h1>

      <div className="customerContainer">
        <div style={{ display: "flex" }}>
          <AccountCircle />
          <label className="labelCustomer">Khách hàng</label>
        </div>
        <label>{table.customerName}</label>
      </div>
      <div className="customerContainer" style={{ marginBottom: "20px" }}>
        <Gachchan />
      </div>

      <div className="customerContainer">
        <div style={{ display: "flex" }}>
          <TableRestaurantIcon />
          <label className="labelCustomer">Mã bàn</label>
        </div>
        <label>{table.tableNumber}</label>
      </div>
      <div className="customerContainer" style={{ marginBottom: "20px" }}>
        <Gachchan />
      </div>

      <div className="customerContainer">
        <div style={{ display: "flex" }}>
          <CalendarMonthIcon />
          <label className="labelCustomer">Ngày đặt</label>
        </div>
        <label>{table.bookingDate}</label>
      </div>
      <div className="customerContainer" style={{ marginBottom: "20px" }}>
        <Gachchan />
      </div>

      <div className="customerContainer">
        <div style={{ display: "flex" }}>
          <AccessTimeIcon />
          <label className="labelCustomer">Giờ đặt</label>
        </div>
        <label>{table.bookingTime}</label>
      </div>
      <div className="customerContainer" style={{ marginBottom: "20px" }}>
        <Gachchan />
      </div>

      <div className="customerContainer">
        <div style={{ display: "flex" }}>
          <PhoneAndroidIcon />
          <label className="labelCustomer">SĐT</label>
        </div>
        <label>{table.phoneNumberBooking}</label>
      </div>
      <div className="customerContainer" style={{ marginBottom: "20px" }}>
        <Gachchan />
      </div>

      <div className="customerContainer">
        <div style={{ display: "flex" }}>
          <GroupAddIcon />
          <label className="labelCustomer">Số lượng khách</label>
        </div>
        <label>{table.numberOfPeople}</label>
      </div>
      <div className="customerContainer" style={{ marginBottom: "20px" }}>
        <Gachchan />
      </div>

      <div className="customerContainer">
        <div style={{ display: "flex" }}>
          <MoreVertIcon />
          <label className="labelCustomer">Trạng thái</label>
        </div>
        <label>{table.status}</label>
      </div>
      <div className="customerContainer" style={{ marginBottom: "20px" }}>
        <Gachchan />
      </div>

      <div className="customerContainer">
        <div style={{ display: "flex" }}>
          <EditNoteIcon />
          <label className="labelCustomer">Ghi chú</label>
        </div>
        <label>{table.note}</label>
      </div>
      <div className="customerContainer" style={{ marginBottom: "20px" }}></div>

      <button className="btnE" onClick={openModal}>
        Sửa
      </button>
      <FormTable
        isOpen={isOpen}
        onClose={closeModal}
        id={selectedTable}
        onCloseAndUpdate={onCloseAndUpdate}
      />
    </div>
  );
};

export default TableInfo;
