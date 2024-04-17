import React from "react";
import DashBoard from "../../components/dashBoard/dashBoard";
import TabStaff from "../../components/TabStaff/TabStaff";
import UserCard from "../../components/userCard/userCard";
import "./stuff.css";
import { Box } from "@mui/material";
const Stuff = () => {
  const items = [
    {
      title: "Employee Profile",
      content: (
        <div>
          <div>
            <UserCard />
          </div>
        </div>
      ),
    },
    {
      title: "Add Employee",
      content: (
        <div>
          <p>
            <strong>Add Employee 1</strong>
          </p>
        </div>
      ),
    },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <DashBoard />
      <div style={{}}>
        <p className="Header">
          <strong>Staff Page</strong>
        </p>
        <TabStaff items={items} />
      </div>
    </Box>
  );
};

export default Stuff;
