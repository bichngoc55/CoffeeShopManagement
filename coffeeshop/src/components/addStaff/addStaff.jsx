import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import userImage from "../userCard/user.jpg";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CakeIcon from "@mui/icons-material/Cake";
import BadgeIcon from "@mui/icons-material/Badge";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import "./addStaff.css";
import { Diversity1Outlined } from "@mui/icons-material";
const AddStaffComponent = () => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
  };
  const [position, setPosition] = React.useState("");
  const [gender, setGender] = React.useState("");
  const handleChange = (event) => {
    setPosition(event.target.value);
  };
  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };
  return (
    <div
      style={{ backgroundColor: "#f9f8fb", width: "100%", paddingLeft: "16px" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div>
          <button className="image-con">
            <img src={userImage} alt="User" />
          </button>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            style={{ backgroundColor: "#704332", marginTop: "10px" }}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </Button>
        </div>
        <div className="infoRight">
          <label className="labelUsername">Họ và tên</label>
          <input className="username" type="text" placeholder="Nhập họ tên" />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <label className="labelUsername">Email</label>
              <input className="email" type="text" placeholder="Nhập email" />
            </div>
            <div>
              <label className="labelUsername">Số điện thoại</label>
              <input
                className="phone"
                type="text"
                placeholder="Nhập số điện thoại"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "20px",
          marginLeft: "16px",
          justifyContent: "space-between",
          width: "900px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="iconContainer">
            <CakeIcon />
          </div>
          <label className="label">Ngày sinh: </label>
          <div className="date-picker">
            <input
              type="date"
              id="date"
              className="datePick"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="iconContainer">
            <BadgeIcon />
          </div>
          <label className="label">Giới tính: </label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={gender}
            onChange={handleChangeGender}
            style={{
              height: "35px",
              borderRadius: "10px",
              outline: "none",
              width: "90px",
            }}
          >
            <MenuItem value={"boy"}>Nam</MenuItem>
            <MenuItem value={"girl"}>Nữ</MenuItem>
          </Select>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="iconContainer">
            <BadgeIcon />
          </div>
          <label className="label">Chức vụ: </label>
          <div
            style={{
              width: "100px",
              height: "35px",
              display: "flex",
            }}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={position}
              onChange={handleChange}
              style={{
                height: "35px",
                borderRadius: "10px",
                outline: "none",
                width: "250px",
              }}
            >
              <MenuItem value={"admin"}>Admin</MenuItem>
              <MenuItem value={"staff"}>Nhân viên</MenuItem>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStaffComponent;
