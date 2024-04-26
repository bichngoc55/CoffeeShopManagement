import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userImage from "../../asset/user.jpg";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CakeIcon from "@mui/icons-material/Cake";
import BadgeIcon from "@mui/icons-material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { format } from "date-fns";
import axios from "axios";
import "./StaffInfo.css";

const StaffInfoComponent = () => {
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
  const {
    Ava,
    Name,
    Position,
    password,
    email,
    Phone,
    dateOfBirth,
    location,
    gender,
  } = useSelector((state) => state.auths.user);
  const formattedDate = format(new Date(dateOfBirth), "dd/MM/yyyy");
  const [nameInput, setName] = React.useState(Name);
  const [positionInput, setPosition] = React.useState(Position);
  const [genderInput, setGender] = React.useState(gender);
  const [emailInput, setEmail] = React.useState(email);
  const [phoneInput, setPhone] = React.useState(Phone);
  const [dateOfBirthInput, setDateOfBirth] = React.useState(formattedDate);
  const [locationInput, setLocation] = React.useState(location);
  const [file, setFile] = React.useState();

  const handleUpload = (event) => {
    const formdata = new FormData();
    formdata.append("file", file);
    axios
      .post("http://localhost:3005/upload", formdata)
      .then((res) => {
        const baseUrl = "http://localhost:3005"; // Thay thế bằng URL thực tế của máy chủ
        const imageUrl = `${baseUrl}/${res.data.path.replace("\\", "/")}`;
        setFile(imageUrl);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div
      style={{
        backgroundColor: "#f9f8fb",
        width: "100%",
        paddingLeft: "16px",
        textAlign: "left",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <button className="image-con">
            <img src={`http://localhost:3005/assets/${Ava}`} alt="User" />
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
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                setFile(selectedFile);
              }}
            />
          </Button>
        </div>
        <div className="infoRight">
          <div
            style={{
              justifyContent: "space-between",
            }}
          >
            <label className="labelUsername">Họ và tên</label>
            <div className="input-container">
              <AccountCircleIcon className="email-icon" />
              <input
                className="username"
                type="text"
                placeholder="Nhập họ tên"
                value={nameInput}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "30px",
            }}
          >
            <div>
              <label className="labelUsername">Email</label>
              <div className="input-container">
                <EmailIcon className="email-icon" />
                <input
                  className="email"
                  type="text"
                  placeholder="Nhập email"
                  value={emailInput}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="labelUsername">Số điện thoại</label>
              <div className="input-container">
                <PhoneIphoneIcon className="email-icon" />
                <input
                  className="phone"
                  type="text"
                  placeholder="Nhập số điện thoại"
                  value={phoneInput}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "30px",
          marginBottom: "20px",
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
              value={dateOfBirthInput}
              onChange={(event) => setDateOfBirth(event.target.value)}
              format="dd/MM/yyyy"
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
            value={genderInput}
            onChange={(event) => setGender(event.target.value)}
            style={{
              height: "35px",
              borderRadius: "10px",
              outline: "none",
              width: "90px",
            }}
          >
            <MenuItem value={"Nam"}>Nam</MenuItem>
            <MenuItem value={"Nữ"}>Nữ</MenuItem>
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
              value={positionInput}
              onChange={(event) => setPosition(event.target.value)}
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

      <div style={{ marginTop: "30px" }}>
        <label className="labelUsername">Địa chỉ</label>
        <div className="input-container">
          <LocationOnIcon className="email-icon" />
          <input
            className="address"
            type="text"
            placeholder="Nhập địa chỉ"
            value={locationInput}
            onChange={(event) => setLocation(event.target.value)}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          width: "900px",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >
        <div>
          <label className="labelUsername">Mật khẩu</label>
          <input
            className="password"
            type="text"
            placeholder="Nhập mật khẩu"
            value={password}
          />
        </div>
        <div>
          <label className="labelUsername">Xác nhận mật khẩu</label>
          <input
            className="password"
            type="text"
            placeholder="Nhập mật khẩu"
            value={password}
          />
        </div>
      </div>

      <div
        style={{
          width: "900px",
          marginBottom: "50px",
          display: "flex",
          textAlign: "right",
          justifyContent: "flex-end",
        }}
      >
        <button className="buttonCancel">Hủy thay đổi</button>
        <button className="buttonAdd" onClick={handleUpload}>
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
};

export default StaffInfoComponent;
