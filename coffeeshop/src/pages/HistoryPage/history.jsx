import React from "react";
import DashBoard from "../../components/dashBoard/dashBoard";
import { Box } from "@mui/material";
import "";
const History = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <DashBoard />
      <div style={{ padding: "16px" }}>History</div>
    </Box>
  );
};

export default History;
