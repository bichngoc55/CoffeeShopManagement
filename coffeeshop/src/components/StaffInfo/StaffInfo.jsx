import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import userImage from "../../asset/user.jpg";
import WcIcon from "@mui/icons-material/Wc";
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
import { format, parseISO } from "date-fns";
import { updateUser } from "../../services/updateUserService";
import axios from "axios";
import "./StaffInfo.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateAccessToken } from "../../redux/authSlice";

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
    _id,
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
  const [nameInput, setName] = React.useState(Name);
  const [positionInput, setPosition] = React.useState(Position);
  const [genderInput, setGender] = React.useState(gender);
  const [emailInput, setEmail] = React.useState(email);
  const [phoneInput, setPhone] = React.useState(Phone);
  const [isUpdateAva, setIsUpdateAva] = useState(false);
  const [dateOfBirthInput, setDateOfBirth] = React.useState(
    parseISO(dateOfBirth)
  );
  const [locationInput, setLocation] = React.useState(location);
  const [passwordInput, setPassword] = useState(password);
  const [password2Input, setPassword2] = useState(password);
  const [image, setImage] = React.useState(Ava);
  const [file, setFile] = useState(Ava);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(typeof dateOfBirth);
  const handleUpload = async () => {
    if (validateInputs()) {
      if (password2Input === passwordInput) {
        showToast();
        if (isUpdateAva) {
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
            if (response.data.url) {
              try {
                if (isUpdateAva) {
                  const updatedUserData = {
                    Name: nameInput,
                    Position: positionInput,
                    gender: genderInput,
                    email: emailInput,
                    Phone: phoneInput,
                    dateOfBirth: dateOfBirthInput,
                    location: locationInput,
                    Ava: response.data.url,
                  };
                  console.log(updatedUserData);
                  await updateUser(updatedUserData, _id, navigate, dispatch);
                }
              } catch (err) {
                console.log(err);
              }
            }
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        } else {
          const updatedUserData = {
            Name: nameInput,
            Position: positionInput,
            gender: genderInput,
            email: emailInput,
            Phone: phoneInput,
            dateOfBirth: dateOfBirthInput,
            location: locationInput,
          };
          console.log(updatedUserData);
          await updateUser(updatedUserData, _id, navigate, dispatch);
        }
      } else {
        setErrors({ ...errors, password2: true });
      }
    }
  };
  const showToast = () => {
    toast.success("Update successfully!", {
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
    setName(Name);
    setPosition(Position);
    setGender(gender);
    setEmail(email);
    setPhone(Phone);
    setDateOfBirth(parseISO(dateOfBirth));
    setLocation(location);
    setImage(Ava);
  };
  const validateInputs = () => {
    let tempErrors = {};
    if (!nameInput) tempErrors.name = true;
    if (!emailInput) tempErrors.email = true;
    if (!phoneInput && phoneInput < 8) tempErrors.phone = true;
    if (!dateOfBirthInput) tempErrors.dateOfBirth = true;
    if (!genderInput) tempErrors.gender = true;
    if (!positionInput) tempErrors.position = true;
    if (!locationInput) tempErrors.location = true;
    if (!passwordInput) tempErrors.password = true;
    if (!password2Input) tempErrors.password2 = true;
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
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
                // setImage(e.target.files[0]);
                setIsUpdateAva(true);
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
            <label className="labelUsername">Full name</label>
            <div className="input-container">
              <AccountCircleIcon className="email-icon" />
              <input
                className={`username ${errors.name ? "error-input" : ""}`}
                type="text"
                placeholder="Enter your username"
                value={nameInput}
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
                  placeholder="Enter your email"
                  value={emailInput}
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
                  placeholder="Enter your phone number"
                  value={phoneInput}
                  onChange={(event) => {
                    const input = event.target.value;

                    // Kiểm tra nếu input chỉ chứa số
                    if (/^\d*$/.test(input)) {
                      setPhone(input.toString());

                      // Kiểm tra nếu input có ít nhất 10 chữ số
                      if (input.length >= 10) {
                        console.log("hihi" + input.length);
                        setErrors({ ...errors, phone: false });
                      } else {
                        console.log(input.length);
                        setErrors({ ...errors, phone: true });
                      }
                    } else {
                      // Nếu có ký tự không phải số, đặt lỗi
                      setErrors({ ...errors, phone: true });
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
          <label className="label">Birthday: </label>
          <div className="date-picker">
            <input
              type="date"
              id="date"
              className={`datePick ${errors.dateOfBirth ? "error-input" : ""}`}
              value={format(dateOfBirthInput, "yyyy-MM-dd")}
              onChange={(event) => setDateOfBirth(parseISO(event.target.value))}
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
          <label className="label">Gender: </label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={genderInput}
            onChange={(event) => {
              setGender(event.target.value);
              if (errors.position) {
                setErrors({ ...errors, gender: false });
              }
            }}
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
          <label className="label">Position: </label>
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
              onChange={(event) => {
                setPosition(event.target.value);
                if (errors.position) {
                  setErrors({ ...errors, position: false });
                }
              }}
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
        }}
      >
        <div>
          <label className="labelUsername">Password</label>
          <input
            className={`password ${errors.password ? "error-input" : ""}`}
            type="password"
            placeholder="Enter your password"
            value={passwordInput}
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
          <label className="labelUsername">Confirm Password</label>
          <input
            className={`password ${errors.password2 ? "error-input" : ""}`}
            type="password"
            placeholder="Enter password"
            value={password2Input}
            onChange={(event) => {
              setPassword2(event.target.value);
              if (password2Input === passwordInput) {
                setErrors({ ...errors, password2: false });
              }
            }}
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
          marginTop: "30px",
        }}
      >
        <button className="buttonCancel" onClick={() => resetAllStates()}>
          Dismiss changes
        </button>
        <button className="buttonAdd" onClick={() => handleUpload()}>
          Save changes
        </button>
      </div>
    </div>
  );
};

export default StaffInfoComponent;
