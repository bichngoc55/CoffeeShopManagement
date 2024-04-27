import React from "react";
import DashBoard from "../../components/dashBoard/dashBoard";
import TabStaff from "../../components/TabStaff/TabStaff";
import userImage from "../../asset/user.jpg";
import AddStaffComponent from "../../components/addStaff/addStaff";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import StaffInfo from "../../components/StaffInfo/StaffInfo";
import "./staff.css";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../services/deleteStaffService";
const Stuff = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3005/staff/`)
      .then((response) => setUsers(response.data.staff))
      .catch((err) => console.error(err));
  }, []);

  const deleteStaff = useCallback((user) => {
    console.log("delete staff");
    try {
      deleteUser(user.token, dispatch, user._id, navigate);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const items = [
    {
      title: "Hồ sơ nhân viên",
      content: (
        <div>
          {users.map((user) => {
            return (
              <div className="container-card">
                <div className="image-container">
                  <img
                    src={`http://localhost:3005/assets/${user.Ava}`}
                    alt="User"
                  />
                </div>

                <div className="inforContainer">
                  <div className="name">{user.Name}</div>
                  <label className="position">{user.Position}</label>
                  <label className="status">{user.location}</label>
                </div>

                <div className="buttonCon">
                  <button
                    className="buttonE"
                    onClick={() => console.log("edit staff")}
                  >
                    Edit
                  </button>
                  <button
                    className="buttonD"
                    onClick={() => {
                      console.log("delete staff");
                      deleteStaff(user);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      title: "Thêm nhân viên",
      content: (
        <div>
          <AddStaffComponent />
        </div>
      ),
    },
    {
      title: "Thông tin cá nhân",
      content: (
        <div>
          <StaffInfo></StaffInfo>
        </div>
      ),
    },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <DashBoard />
      <div style={{ backgroundColor: "#f9f8fb", width: "100%" }}>
        <p className="Header">
          <strong>Quản lý nhân viên</strong>
        </p>
        <TabStaff items={items} />
      </div>
    </Box>
  );
};

export default Stuff;
