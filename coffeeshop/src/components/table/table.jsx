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
import Gachchan from "./gachchan";
const table = () => {
  return (
    <div className="tableInfoContainer">
      <h1 className="headerTable">Thông tin đặt bàn</h1>

      <div className="customerContainer">
        <div style={{ display: "flex" }}>
          <AccountCircle />
          <label className="labelCustomer">Khách hàng</label>
        </div>
        <label>Lisa</label>
      </div>
      <div className="customerContainer" style={{ marginBottom: "20px" }}>
        <Gachchan />
      </div>

      <div className="customerContainer">
        <div style={{ display: "flex" }}>
          <TableRestaurantIcon />
          <label className="labelCustomer">Mã bàn</label>
        </div>
        <label>11</label>
      </div>
      <div className="customerContainer" style={{ marginBottom: "20px" }}>
        <Gachchan />
      </div>

      <div className="customerContainer">
        <div style={{ display: "flex" }}>
          <CalendarMonthIcon />
          <label className="labelCustomer">Ngày đặt</label>
        </div>
        <label>10/10/2024</label>
      </div>
      <div className="customerContainer" style={{ marginBottom: "20px" }}>
        <Gachchan />
      </div>

      <div className="customerContainer">
        <div style={{ display: "flex" }}>
          <AccessTimeIcon />
          <label className="labelCustomer">Giờ đặt</label>
        </div>
        <label>11:20</label>
      </div>
      <div className="customerContainer" style={{ marginBottom: "20px" }}>
        <Gachchan />
      </div>

      <div className="customerContainer">
        <div style={{ display: "flex" }}>
          <PhoneAndroidIcon />
          <label className="labelCustomer">SĐT</label>
        </div>
        <label>012345677</label>
      </div>
      <div className="customerContainer" style={{ marginBottom: "20px" }}>
        <Gachchan />
      </div>

      <div className="customerContainer">
        <div style={{ display: "flex" }}>
          <GroupAddIcon />
          <label className="labelCustomer">Số lượng khách</label>
        </div>
        <label>4</label>
      </div>
      <div className="customerContainer" style={{ marginBottom: "20px" }}>
        <Gachchan />
      </div>

      <div className="customerContainer">
        <div style={{ display: "flex" }}>
          <MoreVertIcon />
          <label className="labelCustomer">Trạng thái</label>
        </div>
        <label>Đã đặt trước</label>
      </div>
      <div className="customerContainer" style={{ marginBottom: "20px" }}>
        <Gachchan />
      </div>

      <div className="customerContainer">
        <div style={{ display: "flex" }}>
          <EditNoteIcon />
          <label className="labelCustomer">Ghi chú</label>
        </div>
        <label>none</label>
      </div>
      <div className="customerContainer" style={{ marginBottom: "20px" }}></div>

      <button className="btnE">Sửa</button>
    </div>
  );
};

export default table;
