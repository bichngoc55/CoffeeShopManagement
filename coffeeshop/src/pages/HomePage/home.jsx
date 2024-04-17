import React from "react";
import DashBoard from "../../components/dashBoard/dashBoard";
import { Box } from "@mui/material";
const Home = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <DashBoard />
      <div style={{ padding: "16px" }}>Home</div>
    </Box>
  );
};

export default Home;
