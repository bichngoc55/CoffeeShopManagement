import React, { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import WcIcon from "@mui/icons-material/Wc";
import Button from "@mui/material/Button";
import CakeIcon from "@mui/icons-material/Cake";
import BadgeIcon from "@mui/icons-material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";
import "./addStaff.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/registerService";
import { format } from "date-fns";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
const AddStaffComponent = ({ onCloseUpdate }) => {
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
  const [nameInput, setName] = useState("");
  const [positionInput, setPosition] = useState();
  const [genderInput, setGender] = useState();
  const [emailInput, setEmail] = useState("");
  const [phoneInput, setPhone] = useState("");
  const [dateOfBirthInput, setDateOfBirth] = useState();
  const [passwordInput, setPassword] = useState("");
  const [locationInput, setLocation] = useState("VietNam");
  const [password2Input, setPassword2] = useState("");
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setDateOfBirth(selectedDate);
  };
  const [image, setImage] = useState();
  const [errors, setErrors] = useState({});
  const [isShow, setIsShow] = useState(false);
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validateInputs = () => {
    let tempErrors = {};
    if (!image) tempErrors.image = true;
    if (!nameInput) tempErrors.name = true;
    if (!emailInput) tempErrors.email = true;
    if (!phoneInput) tempErrors.phone = true;
    if (!dateOfBirthInput) tempErrors.dateOfBirth = true;
    if (!genderInput) tempErrors.gender = true;
    if (!positionInput) tempErrors.position = true;
    if (!locationInput) tempErrors.location = true;
    if (!passwordInput) tempErrors.password = true;
    if (!password2Input) tempErrors.password2 = true;
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleUpload = async () => {
    if (validateInputs()) {
      const formdata = new FormData();
      console.log("da vao handle upload");
      formdata.append("file", image);
      formdata.append("upload_preset", "Searn-musicapp");
      formdata.append("cloud_name", "dzdso60ms");
      try {
        const responseCloud = await axios.post(
          "https://api.cloudinary.com/v1_1/dzdso60ms/image/upload",
          formdata,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(responseCloud.data.url);
        if (responseCloud.data.url) {
          try {
            const updatedUserData = {
              Name: nameInput,
              Position: positionInput,
              gender: genderInput,
              email: emailInput,
              Phone: phoneInput,
              dateOfBirth: dateOfBirthInput,
              location: locationInput,
              Ava: responseCloud.data.url,
              password: passwordInput,
            };
            registerUser(updatedUserData, dispatch, navigate);
            handleClick();
          } catch (err) {
            console.log(err);
          }
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };
  const resetAllStates = () => {
    console.log("Resetting all states...");
    setName("");
    setEmail("");
    setPhone("");
    setDateOfBirth(new Date());
    setPassword("");
  };
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%", fontSize: "14px", backgroundColor: "#4BB543" }}
        >
          Add successfully!
        </Alert>
      </Snackbar>
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
                setErrors({ ...errors, image: false });
                setImage(e.target.files[0]);
                setFile(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </Button>
          {errors.image && (
            <label
              style={{ color: "red", margin: "5px 0 0", fontSize: "14px" }}
            >
              *Please pick a image
            </label>
          )}
        </div>
        <div className="infoRight">
          <div
            style={{
              justifyContent: "space-between",
            }}
          >
            <label className="labelUsername">Fullname</label>
            <div className="input-container">
              <AccountCircleIcon className="email-icon" />
              <input
                className={`username ${errors.name ? "error-input" : ""}`}
                type="text"
                value={nameInput}
                placeholder="Enter full name"
                onChange={(event) => {
                  setName(event.target.value);
                  if (errors.name) {
                    setErrors({ ...errors, name: false });
                  }
                }}
              />
            </div>
            {errors.name && (
              <label
                style={{ color: "red", margin: "5px 0 0", fontSize: "14px" }}
              >
                *Please fill out the name
              </label>
            )}
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
                  className={`email ${errors.email ? "error-input" : ""}`}
                  type="text"
                  value={emailInput}
                  placeholder="Nhập email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (errors.email) {
                      setErrors({ ...errors, email: false });
                    }
                  }}
                />
              </div>
              {errors.email && (
                <label
                  style={{ color: "red", margin: "5px 0 0", fontSize: "14px" }}
                >
                  *Please fill out the email
                </label>
              )}
            </div>

            <div>
              <label className="labelUsername">Phone Number</label>
              <div className="input-container">
                <PhoneIphoneIcon className="email-icon" />
                <input
                  className={`phone ${errors.phone ? "error-input" : ""}`}
                  type="text"
                  value={phoneInput}
                  placeholder="Enter phone number"
                  onChange={(event) => {
                    setPhone(event.target.value);
                    if (errors.phone && phoneInput.length >= 9) {
                      setErrors({ ...errors, phone: false });
                    }
                  }}
                />
              </div>
              {errors.phone && (
                <label
                  style={{ color: "red", margin: "5px 0 0", fontSize: "14px" }}
                >
                  *Please fill out the phone number
                </label>
              )}
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
              className={`datePick ${errors.dateOfBirth ? "error-input" : ""}`}
              value={
                dateOfBirthInput ? format(dateOfBirthInput, "yyyy-MM-dd") : ""
              }
              onChange={handleDateChange}
            />
          </div>
          {/* {errors.dateOfBirth && (
            <label
              style={{ color: "red", margin: "5px 0 0", fontSize: "14px" }}
            >
              *Please choose a date
            </label>
          )} */}
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
            onChange={(event) => {
              setGender(event.target.value);
              if (errors.position) {
                setErrors({ ...errors, gender: false });
              }
            }}
            value={genderInput}
            style={{
              height: "35px",
              borderRadius: "10px",
              outline: "none",
              width: "90px",
              border: errors.gender ? "1px solid red" : "none",
            }}
          >
            <MenuItem value={"nam"}>Nam</MenuItem>
            <MenuItem value={"nu"}>Nữ</MenuItem>
          </Select>
          {/* {errors.gender && (
            <label
              style={{ color: "red", margin: "5px 0 0", fontSize: "14px" }}
            >
              *Please choose a gender
            </label>
          )} */}
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
              onChange={(event) => {
                setPosition(event.target.value);
                if (errors.position) {
                  setErrors({ ...errors, position: false });
                }
              }}
              value={positionInput}
              style={{
                height: "35px",
                borderRadius: "10px",
                outline: "none",
                width: "250px",
                border: errors.position ? "1px solid red" : "none",
              }}
            >
              <MenuItem value={"admin"}>Admin</MenuItem>
              <MenuItem value={"staff"}>Nhân viên</MenuItem>
            </Select>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <label className="labelUsername">Location</label>
        <div className="input-container">
          <LocationOnIcon className="email-icon" />
          <input
            className={`address ${errors.location ? "error-input" : ""}`}
            type="text"
            placeholder="Enter Location"
            value={locationInput}
            onChange={(event) => {
              setLocation(event.target.value);
              if (errors.location) {
                setErrors({ ...errors, location: false });
              }
            }}
          />
        </div>
        {errors.location && (
          <label style={{ color: "red", margin: "5px 0 0", fontSize: "14px" }}>
            *Please fill out the location
          </label>
        )}
      </div>

      <div
        style={{
          display: "flex",
          width: "900px",
          justifyContent: "space-between",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <div>
          <label className="labelUsername">Mật khẩu</label>
          <input
            className={`passwordInput ${errors.password ? "error-input" : ""}`}
            type="password"
            placeholder="Nhập mật khẩu"
            //value={passwordInput}
            onChange={(event) => {
              setPassword(event.target.value);
              if (errors.password && passwordInput.length >= 7) {
                setErrors({ ...errors, password: false });
              }
            }}
          />
          {errors.password && (
            <label
              style={{ color: "red", margin: "5px 0 0", fontSize: "14px" }}
            >
              *Please fill out the password at least 8 characters
            </label>
          )}
        </div>
        <div>
          <label className="labelUsername">Xác nhận mật khẩu</label>
          <input
            className={`passwordInput ${errors.password2 ? "error-input" : ""}`}
            type="password"
            placeholder="Nhập mật khẩu"
            onChange={(event) => {
              setPassword2(event.target.value);
              if (errors.password2 && password2Input === passwordInput) {
                setErrors({ ...errors, password2: false });
              }
            }}
            //value={passwordInput}
          />
          {errors.password2 && (
            <label
              style={{ color: "red", margin: "5px 0 0", fontSize: "14px" }}
            >
              *Please fill out the password confirmation
            </label>
          )}
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
