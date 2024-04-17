import React from "react";
import DashBoard from "../../components/dashBoard/dashBoard";
import { Box } from "@mui/material";
const Booking = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <DashBoard />
      <div style={{ padding: "16px" }}>Booking</div>
    </Box>
  );
};

export default Booking;
