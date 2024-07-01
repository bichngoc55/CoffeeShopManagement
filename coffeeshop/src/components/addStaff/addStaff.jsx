import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import WcIcon from "@mui/icons-material/Wc";
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
import { format, parseISO } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [nameInput, setName] = useState("");
  const [positionInput, setPosition] = useState();
  const [genderInput, setGender] = useState();
  const [emailInput, setEmail] = useState();
  const [phoneInput, setPhone] = useState();
  const [dateOfBirthInput, setDateOfBirth] = useState();
  const [passwordInput, setPassword] = useState();
  const [locationInput, setLocation] = useState("VietNam");

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setDateOfBirth(selectedDate);
  };
  const [image, setImage] = React.useState();
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUpload = async () => {
    const formdata = new FormData();
    console.log("da vao handle upload");
    formdata.append("file", image);
    formdata.append("upload_preset", "Searn-musicapp");
    formdata.append("cloud_name", "dzdso60ms");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dzdso60ms/image/upload",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data.url);
      setImage(response.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    try {
      const updatedUserData = {
        Name: nameInput,
        Position: positionInput,
        gender: genderInput,
        email: emailInput,
        Phone: phoneInput,
        dateOfBirth: dateOfBirthInput,
        location: locationInput,
        Ava: file,
        password: passwordInput,
      };
      showToast();
      registerUser(updatedUserData, dispatch, navigate);
    } catch (err) {
      console.log(err);
    }
  };
  const showToast = () => {
    toast.success("Add successfully!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const resetAllStates = () => {
    console.log("Resetting all states...");
    setName("");
    setPosition();
    setGender();
    setEmail();
    setPhone();
    setDateOfBirth();
    setLocation();
    setImage();
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
      <ToastContainer />
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
                value={nameInput}
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
                  value={emailInput}
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
                  value={phoneInput}
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
              value={
                dateOfBirthInput ? format(dateOfBirthInput, "yyyy-MM-dd") : ""
              }
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
            <WcIcon />
          </div>
          <label className="label">Giới tính: </label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(event) => setGender(event.target.value)}
            value={genderInput}
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
              value={positionInput}
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
            type="password"
            placeholder="Nhập mật khẩu"
            //value={passwordInput}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <label className="labelUsername">Xác nhận mật khẩu</label>
          <input
            className="password"
            type="password"
            placeholder="Nhập mật khẩu"
            //value={passwordInput}
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
        <button className="buttonCancel" onClick={() => resetAllStates()}>
          Quay lại
        </button>
        <button className="buttonAdd" onClick={() => handleUpload()}>
          Thêm
        </button>
      </div>
    </div>
  );
};

export default AddStaffComponent;
