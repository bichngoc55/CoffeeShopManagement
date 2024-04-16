import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { themeSettings } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import FreeBreakfastOutlinedIcon from "@mui/icons-material/FreeBreakfastOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import { useState } from "react";
import TableBarOutlinedIcon from "@mui/icons-material/TableBarOutlined";
import { BreakfastDiningOutlined } from "@mui/icons-material";
import { Switch } from "@mui/material";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      //   style={{
      //     color: "#553528",
      //   }}
      style={{
        color: selected === title ? "#412D26" : "#8D817D",
        backgroundColor: selected === title ? "#AA7E6D" : "transparent",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Link to={to}>{title}</Link>.
    </MenuItem>
  );
};

const DashBoard = ({ handleChange, mode }) => {
  const theme = useTheme();
  const colors = themeSettings(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Trang Chủ");
  return (
    <Sidebar
      collapsed={isCollapsed}
      style={{
        height: "100vh",
      }}
    >
      <Menu
        menuItemStyles={{
          button: {
            "&.active": {
              backgroundColor: `${colors.palette.primary.main} !important`,
              color: "#6870fa !important",
            },
            "&:hover": {
              color: "#714534 !important",
            },
          },
          display: "flex",
          alignItems: "center",
          padding: "8px 16px",
        }}
      >
        {/* LOGO AND MENU ICON */}
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
          style={{
            margin: "10px 0 20px 0",
          }}
        >
          {!isCollapsed && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
            >
              <Typography fontSize={24}>JAVA JOY</Typography>
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <MenuOutlinedIcon />
              </IconButton>
            </Box>
          )}
        </MenuItem>

        {!isCollapsed && (
          <Box mb="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                alt="profile-user"
                width="100px"
                height="100px"
                src={`../../assets/image.png`}
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
            </Box>
            <Box textAlign="center">
              <Typography
                //color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              >
                TUN PHAM
              </Typography>
              <Typography>Admin</Typography>
            </Box>
          </Box>
        )}
        <Box paddingLeft={isCollapsed ? undefined : "10%"}>
          <Item
            title="Trang Chủ"
            to="/home"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Menu"
            to="/menu"
            icon={<BreakfastDiningOutlined />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Lịch Sử"
            to="/history"
            icon={<HistoryOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Nhân Viên"
            to="/stuff"
            icon={<PeopleOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Kho Hàng"
            to="/inventory"
            icon={<PieChartOutlineOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Cài Đặt"
            to="/settings"
            icon={<SettingsOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Đặt Bàn"
            to="/booking"
            icon={<TableBarOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Thống Kê"
            to="/statistics"
            icon={<PieChartOutlineOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
        </Box>
        <Box mt="30px" paddingLeft={isCollapsed ? undefined : "10%"}>
          <Item
            title="Đăng Xuất"
            to="/login"
            icon={<LogoutOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
        </Box>
      </Menu>
    </Sidebar>
  );
};

export default DashBoard;
