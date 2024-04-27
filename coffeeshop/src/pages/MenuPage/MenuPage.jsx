import React from "react";
import DashBoard from "../../components/dashBoard/dashBoard";
import "./Menu.css";
import { Box } from "@mui/material";
const MenuPage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <DashBoard />
    </Box>
  );
};

export default MenuPage;
