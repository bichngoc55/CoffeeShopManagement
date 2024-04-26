import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import userImage from "../../asset/user.jpg";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CakeIcon from "@mui/icons-material/Cake";
import BadgeIcon from "@mui/icons-material/Badge";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";
import "./addStaff.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/registerService";
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

  // const [nameInput, setName] = React.useState();
  // const [positionInput, setPosition] = React.useState();
  // const [genderInput, setGender] = React.useState();
  // const [emailInput, setEmail] = React.useState();
  // const [phoneInput, setPhone] = React.useState();
  // const [dateOfBirthInput, setDateOfBirth] = React.useState();
  // const [passwordInput, setPassword] = React.useState();
  // const [locationInput, setLocation] = React.useState();
  const [nameInput, setName] = React.useState("");
  const [positionInput, setPosition] = React.useState("");
  const [genderInput, setGender] = React.useState("");
  const [emailInput, setEmail] = React.useState("");
  const [phoneInput, setPhone] = React.useState("");
  const [dateOfBirthInput, setDateOfBirth] = React.useState("");
  const [passwordInput, setPassword] = React.useState("");
  const [locationInput, setLocation] = React.useState("");
  const [newUser, setNewUser] = React.useState({
    Name: "",
    Position: "",
    gender: "",
    email: "",
    Phone: "",
    dateOfBirth: "",
    location: "",
    password: "",
    Ava: "",
  });
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setDateOfBirth(selectedDate);
  };
  const [image, setImage] = React.useState();
  const [file, setFile] = React.useState(userImage);
  useEffect(() => {
    // Cleanup function to revoke the object URL
    return () => URL.revokeObjectURL(file);
  }, [file]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUpload = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("file", image);

    axios
      .post("http://localhost:3005/upload", formdata)
      .then((res) => {
        console.log(res);
        setNewUser({
          Name: nameInput,
          Position: positionInput,
          gender: genderInput,
          email: emailInput,
          Phone: phoneInput,
          dateOfBirth: dateOfBirthInput,
          location: locationInput,
          password: passwordInput,
          Ava: res.data.originalname,
        });
        registerUser(newUser, dispatch, navigate);
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
            <img src={file} alt="User" />
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
                setImage(e.target.files[0]);
                setFile(URL.createObjectURL(e.target.files[0]));
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
            onChange={(event) => setGender(event.target.value)}
            style={{
              height: "35px",
              borderRadius: "10px",
              outline: "none",
              width: "90px",
            }}
          >
            <MenuItem value={"nam"}>Nam</MenuItem>
            <MenuItem value={"nu"}>Nữ</MenuItem>
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
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <label className="labelUsername">Xác nhận mật khẩu</label>
          <input className="password" type="text" placeholder="Nhập mật khẩu" />
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
        <button className="buttonCancel">Quay lại</button>
        <button className="buttonAdd" onClick={handleUpload}>
          Thêm
        </button>
      </div>
    </div>
  );
};

export default AddStaffComponent;
