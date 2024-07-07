import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import EmailIcon from "@mui/icons-material/Email";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useSelector } from "react-redux";
import { format, parseISO } from "date-fns";
import "./popupEdit.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "35%",
    height: "90%",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: " 20px",
    background: "#fff",
    padding: "15px",
    fontFamily: "Montserrat, sans-serif",
  },
  overlay: {
    position: "fixed",
    zIndex: "6",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Đặt màu nền cho phần bị che phủ
  },
};

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

const PopupStaff = ({ isOpen, onClose, onCloseUpdate, id }) => {
  const navigate = useNavigate();
  const [updateAva, setUpdateAva] = useState(false);
  const [image, setImage] = useState();
  const [file, setFile] = useState("");
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("noscroll");
    } else {
      document.body.classList.remove("noscroll");
    }
  }, [isOpen]);

  const { token } = useSelector((state) => state.auths);
  const [user, setUser] = useState({
    Name: "",
    Position: "",
    gender: "",
    email: "",
    Phone: "",
    dateOfBirth: new Date().toISOString(),
    location: "Ho Chi Minh",
    password: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data");
        const response = await fetch(`http://localhost:3005/staff/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Fecth data" + data.Ava);
          setUser({
            Name: data.Name,
            Position: data.Position,
            gender: data.gender,
            email: data.email,
            Phone: data.Phone,
            dateOfBirth: data.dateOfBirth,
            location: data.location,
            password: data.password,
          });
          setFile(data.Ava);
          console.log("user.location" + user);
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

    fetchData();
  }, []);

  useEffect(() => {
    console.log("user.Ava updated:", user.Ava);
  }, [user.Ava]);

  const handleChange = (event) => {
    console.log("handleChange called", event.target.name, event.target.value);
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleDateChange = (event) => {
    console.log("handleChange called", event.target.name, event.target.value);
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: new Date(value).toISOString(),
    }));
  };
  const handleUpload = async () => {
    if (updateAva) {
      const formdata = new FormData();
      formdata.append("file", image);
      formdata.append("upload_preset", "Searn-musicapp");
      formdata.append("cloud_name", "dzdso60ms");
      const responseCloud = await axios.post(
        "https://api.cloudinary.com/v1_1/dzdso60ms/image/upload",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const avanew = { Ava: responseCloud.data.url };
      const response1 = await fetch(`http://localhost:3005/staff/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(avanew),
      });
      if (!response1.ok) {
        console.log("Lỗi up Ava" + response1);
      }
    }
    try {
      const response = await fetch(`http://localhost:3005/staff/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        if (response.status === 500) {
          alert("Lỗi kết nối đến máy chủ");
          navigate("/login");
        }
        throw new Error("Failed to update user info");
      } else {
        console.log(user);
        onCloseUpdate();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const showToast = () => {
    toast.success("Update successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles}>
      <div className="sbtnt">
        <label>Staff information</label>
        <button onClick={onClose} className="sbtnx">
          x
        </button>
      </div>

      <div className="sfirst">
        <div>
          <div className="simage-con">
            <img src={file} alt="User" />
          </div>
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
                setUpdateAva(true);
                setImage(e.target.files[0]);
                setFile(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </Button>
        </div>
        <div>
          <div className="slabel-input">
            <label className="slabel">Full Name:</label>
            <div className="sinput-container">
              <AccountCircleIcon className="iconH" />
              <input
                type="text"
                placeholder="Enter staff's full name"
                name="Name"
                className="susername"
                defaultValue={user.Name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="slabel-input">
            <label className="slabel">Email:</label>
            <div className="sinput-container">
              <EmailIcon className="iconH" />
              <input
                type="text"
                placeholder="Enter email"
                className="semail"
                name="email"
                defaultValue={user.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="slabel-input">
            <label className="slabel">Phone:</label>
            <div className="sinput-container">
              <PhoneIphoneIcon className="iconH" />
              <input
                type="text"
                placeholder="Enter phone number"
                className="sphonea"
                name="Phone"
                defaultValue={user.Phone}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="sfirst">
        <div style={{ display: "flex", alignItems: "center" }}>
          <label className="slabel">Date of Birth:</label>
          <input
            type="date"
            className="sdatepick"
            name="dateOfBirth"
            onChange={handleDateChange}
            defaultValue={format(parseISO(user.dateOfBirth), "yyyy-MM-dd")}
          />
        </div>
      </div>
      <div className="sfirst" style={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label className="slabelGender">Gender</label>
          <Select
            value={user.gender}
            name="gender"
            onChange={(e) =>
              handleChange({
                target: { name: "gender", value: e.target.value },
              })
            }
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

        <div style={{ display: "flex", alignItems: "center" }}>
          <label className="slabelGender">Position</label>
          <Select
            name="Position"
            value={user.Position}
            onChange={(e) =>
              handleChange({
                target: { name: "Position", value: e.target.value },
              })
            }
            style={{
              height: "35px",
              borderRadius: "10px",
              outline: "none",
              width: "140px",
            }}
          >
            <MenuItem value={"admin"}>Admin</MenuItem>
            <MenuItem value={"staff"}>Staff</MenuItem>
          </Select>
        </div>
      </div>

      <div
        className="sfirst"
        style={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <label className="slabelLocation">Address:</label>
        <div className="sinputlocation">
          <LocationOnIcon className="iconH" />
          <input
            type="text"
            placeholder="Enter address"
            name="location"
            className="slocation"
            value={user.location || "unknown"}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      <div
        className="sfirst"
        style={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <label className="slabelLocation">Password:</label>
        <div className="sinputpassword">
          <VpnKeyIcon className="iconH" />
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            className="spass1"
            onChange={handleChange}
          />
        </div>
      </div>

      <div
        className="sfirst"
        style={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <label className="slabelLocation">Confirm Password:</label>
        <div className="sinputpassword">
          <VpnKeyIcon className="iconH" />
          <input
            type="password"
            placeholder="Enter password"
            className="spass1"
          />
        </div>
      </div>

      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "395px",
          display: "flex",
          marginTop: "30px",
        }}
      >
        <button className="sbtnCN" onClick={() => handleUpload()}>
          Update
        </button>
      </div>
    </Modal>
  );
};

export default PopupStaff;
