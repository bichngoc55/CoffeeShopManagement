import React, { useEffect, useState, useCallback } from "react";
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

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "430px",
    height: "530px",
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

const PopupStaff = ({ isOpen, onClose, id }) => {
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
    location: "",
    password: "",
    Ava: "",
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
          setUser({
            Name: data.Name,
            Position: data.Position,
            gender: data.gender,
            email: data.email,
            Phone: data.Phone,
            dateOfBirth: data.dateOfBirth,
            location: data.location,
            password: data.password,
            Ava: data.Ava,
          });
          setFile(`http://localhost:3005/assets/${data.Ava}`);
        } else {
          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Request failed with error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    return () => URL.revokeObjectURL(file);
  }, [file]);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleUpload = useCallback(
    (event) => {
      const formdata = new FormData();
      formdata.append("file", image);
      axios
        .post("http://localhost:3005/upload", formdata)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    },
    [image]
  );
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles}>
      <div className="sbtnt">
        <label>Thông tin nhân viên</label>
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
                setImage(e.target.files[0]);
                setFile(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </Button>
        </div>
        <div>
          <div className="slabel-input">
            <label className="slabel">Họ tên:</label>
            <div className="sinput-container">
              <AccountCircleIcon className="iconH" />
              <input
                type="text"
                placeholder="Nhập họ tên"
                className="susername"
                defaultValue={user.Name}
              />
            </div>
          </div>

          <div className="slabel-input">
            <label className="slabel">Email:</label>
            <div className="sinput-container">
              <EmailIcon className="iconH" />
              <input
                type="text"
                placeholder="Nhập email"
                className="semail"
                defaultValue={user.email}
              />
            </div>
          </div>

          <div className="slabel-input">
            <label className="slabel">SDT:</label>
            <div className="sinput-container">
              <PhoneIphoneIcon className="iconH" />
              <input
                type="text"
                placeholder="Nhập sdt"
                className="sphonea"
                defaultValue={user.Phone}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="sfirst">
        <div style={{ display: "flex", alignItems: "center" }}>
          <label className="slabel">Ngày sinh:</label>
          <input
            type="date"
            className="sdatepick"
            value={format(parseISO(user.dateOfBirth), "yyyy-MM-dd")}
          />
        </div>
      </div>
      <div className="sfirst" style={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label className="slabelGender">Giới tính</label>
          <Select
            value={user.gender}
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
          <label className="slabelGender">Chức vụ</label>
          <Select
            value={user.Position}
            style={{
              height: "35px",
              borderRadius: "10px",
              outline: "none",
              width: "140px",
            }}
          >
            <MenuItem value={"admin"}>Admin</MenuItem>
            <MenuItem value={"staff"}>Nhân viên</MenuItem>
          </Select>
        </div>
      </div>

      <div
        className="sfirst"
        style={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <label className="slabelLocation">Địa chỉ:</label>
        <div className="sinputlocation">
          <LocationOnIcon className="iconH" />
          <input
            type="text"
            placeholder="Nhập địa chỉ"
            className="slocation"
            defaultValue={user.location}
          />
        </div>
      </div>

      <div
        className="sfirst"
        style={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <label className="slabelLocation">Mật khẩu:</label>
        <div className="sinputpassword">
          <VpnKeyIcon className="iconH" />
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            className="spass1"
          />
        </div>
      </div>

      <div
        className="sfirst"
        style={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <label className="slabelLocation">Xác nhận mật khẩu:</label>
        <div className="sinputpassword">
          <VpnKeyIcon className="iconH" />
          <input
            type="password"
            placeholder="Nhập mật khẩu"
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
        <button className="sbtnCN">Cập nhập</button>
      </div>
    </Modal>
  );
};

export default PopupStaff;
