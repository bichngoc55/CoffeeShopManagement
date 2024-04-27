import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import "./DrinkType.css";
const DrinkTypeCard = ({ title, icon: Icon }) => {
  return (
    <div className="div">
      <div className="div-2">
        <Icon />
      </div>
      <div className="div-3">{title}</div>
    </div>
  );
};

export default DrinkTypeCard;
