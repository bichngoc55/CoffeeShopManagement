import React from "react";
import DashBoard from "../../components/dashBoard/dashBoard";
import { Box } from "@mui/material";
const Inventory = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <DashBoard />
      <div className="container">
        <div className="namePage font-semibold medium_text" style={{ marginTop: "2.15%", textAlign: "left" }}>
          <a>Inventory</a>
        </div>
      </div>
    </Box>
  );
};

export default Inventory;
