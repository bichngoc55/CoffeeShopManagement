import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const DescriptionText = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedDescription = `${description.slice(0, 50)}...`;

  return (
    <div className="description-text">
      <span
        className={`description-text-content ${isExpanded ? "expanded" : ""}`}
      >
        {isExpanded ? description : truncatedDescription}
      </span>
      {description.length > 50 && (
        <span className="toggle-icon" onClick={handleToggle}>
          {isExpanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </span>
      )}
    </div>
  );
};

export default DescriptionText;
