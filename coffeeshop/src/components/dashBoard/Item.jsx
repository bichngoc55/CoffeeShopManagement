import React from "react";
import { MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
// import "./Item.css"; // Assuming you have a CSS file for custom styles

const Item = ({ title, to, icon, selected, setSelected }) => {
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === to) {
      setSelected(title);
    }
  }, [location, to, title, setSelected]);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: selected === title ? "#412D26" : "#8D817D",
        backgroundColor: selected === title ? "#AA7E6D" : "transparent",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Link to={to}>{title}</Link>
    </MenuItem>
  );
};

export default Item;
