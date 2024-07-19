import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import "./DrinkType.css";

const DrinkTypeCard = ({ title, onClick, icon: Icon, iconSize = "60%" }) => {
  return (
    <div className="div">
      <div className="div-2" onClick={() => onClick({ title })}>
        <Icon size={iconSize} /> {/* Set the icon size here */}
      </div>
      <div className="div-3">{title}</div>
    </div>
  );
};

export default DrinkTypeCard;