import React from "react";
import DashBoard from "../../components/dashBoard/dashBoard";
import { Box } from "@mui/material";



const Analytics = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <DashBoard />
      <div style={{ padding: "16px" }}>Analytics</div>
    </Box>
  );
};

export default Analytics;
