import React from "react";
import DashBoard from "../../components/dashBoard/dashBoard";
import TabStaff from "../../components/TabStaff/TabStaff";
import userImage from "../../components/userCard/user.jpg";
import AddStaffComponent from "../../components/addStaff/addStaff";
import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../../components/userCard/userCard";
import "./stuff.css";
import { Box } from "@mui/material";
const Stuff = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3005/staff/`)
      .then((response) => setUsers(response.data.staff))
      .catch((err) => console.error(err));
  }, []);

  const items = [
    {
      title: "Employee Profile",
      content: (
        <div>
          {users.map((user) => {
            return (
              <div className="container-card">
                <div className="image-container">
                  <img src={userImage} alt="User" />
                </div>

                <div className="inforContainer">
                  <div className="name">{user.Name}</div>
                  <label className="position">{user.Position}</label>
                  <label className="status">{user.location}</label>
                </div>

                <div className="buttonCon">
                  <button className="buttonE">Edit</button>
                  <button className="buttonD">Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      title: "Add Employee",
      content: (
        <div>
          <AddStaffComponent />
        </div>
      ),
    },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <DashBoard />
      <div style={{ backgroundColor: "#f9f8fb", width: "100%" }}>
        <p className="Header">
          <strong>Staff Page</strong>
        </p>
        <TabStaff items={items} />
      </div>
    </Box>
  );
};

export default Stuff;
