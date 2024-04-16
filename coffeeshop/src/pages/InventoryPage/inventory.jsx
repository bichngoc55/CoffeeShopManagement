import React from "react";
import DashBoard from "../../components/dashBoard/dashBoard";
import { Box } from "@mui/material";
const Inventory = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <DashBoard />
      <div style={{ padding: "16px" }}>Inventory</div>
    </Box>
  );
};

export default Inventory;
