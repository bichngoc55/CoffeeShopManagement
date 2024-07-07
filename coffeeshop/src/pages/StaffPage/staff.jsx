import React from "react";
import DashBoard from "../../components/dashBoard/dashBoard";
import TabStaff from "../../components/TabStaff/TabStaff";
import AddStaffComponent from "../../components/addStaff/addStaff";
import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import StaffInfo from "../../components/StaffInfo/StaffInfo";
import "./staff.css";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import PopupStaff from "../../components/table/popupEdit";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
function useFocus() {
  const ref = useRef(null);

  const setFocus = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  return [ref, setFocus];
}
const Stuff = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setCurrentUserId(userId);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { token } = useSelector((state) => state.auths);
  const [users, setUsers] = useState([]);
  const [inputRef, setInputFocus] = useFocus();
  const [openPopupId, setOpenPopupId] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const openModal = (index) => {
    setOpenPopupId(index);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setSearchResult([]); // Nếu không có giá trị tìm kiếm, đặt kết quả tìm kiếm là mảng rỗng
    } else {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filteredData = users.filter((user) => {
        return user.Name.toLowerCase().includes(lowercasedFilter);
      });
      setSearchResult(filteredData); 
    }
  };
  const handleClickSearch = (result) => {
    const drinkId = result._id;
    const element = document.getElementById(drinkId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      console.log("tim thay r");
      element.style.borderBottom = "2px solid black";
      setTimeout(() => {
        element.style.borderBottom = ""; // Trả lại viền ban đầu
      }, 5000);
    } else console.log("no scrool");
  };

  const closeModalAndUpdate = () => {
    setOpenPopupId(null);
    console.log("update hehe");
    axios
      .get(`http://localhost:3005/staff/`)
      .then((response) => setUsers(response.data.staff))
      .catch((err) => console.error(err));
  };
  const closeModal = () => {
    setOpenPopupId(null);
  };

  useEffect(() => {
    setInputFocus();
    console.log("setInputFocus");
    axios
      .get(`http://localhost:3005/staff/`)
      .then((response) => setUsers(response.data.staff))
      .catch((err) => console.error(err));
  }, []);

  const deleteStaff = async (id) => {
    console.log("delete staff");
    handleClose();
    try {
      const response = await fetch(`http://localhost:3005/staff/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        axios
          .get(`http://localhost:3005/staff/`)
          .then((response) => setUsers(response.data.staff))
          .catch((err) => console.error(err));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const items = [
    {
      title: "Staff profile",
      content: (
        <div style={{  }}>
          {users.map((user, index) => {
            return (
              <div id={user._id} className="container-card">
                <div className="image-container">
                  <img src={user.Ava} alt="User" />
                </div>

                <div className="inforContainer">
                  <div className="name">{user.Name}</div>
                  <label className="position">{user.Position}</label>
                  <label className="status">{user.location}</label>
                </div>

                <div className="buttonCon">
                  <button className="buttonE" onClick={() => openModal(index)}>
                    Edit
                  </button>
                  {openPopupId === index && (
                    <PopupStaff
                      isOpen={true}
                      onClose={() => closeModal()}
                      onCloseUpdate={() => closeModalAndUpdate()}
                      id={user._id}
                    />
                  )}

                  <div>
                    <button
                      className="buttonD"
                      onClick={(e) => handleClick(e, user._id)}
                    >
                      Delete
                    </button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                      sx={{
                        "& .MuiPaper-root": {
                          color: "black",
                          borderRadius: 2,
                          minWidth: "150px",
                          marginTop: "10px",
                        },
                      }}
                    >
                      <MenuItem
                        onClick={() => deleteStaff(currentUserId)}
                        sx={{ fontSize: "15px" }}
                      >
                        Sure
                      </MenuItem>
                      <MenuItem onClick={handleClose} sx={{ fontSize: "15px" }}>
                        Cancel
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      title: "Add staff",
      content: (
        <div>
          <AddStaffComponent onCloseUpdate={closeModalAndUpdate} />
        </div>
      ),
    },
    {
      title: "Personal information",
      content: (
        <div>
          <StaffInfo></StaffInfo>
        </div>
      ),
    },
  ];
  return (
    <Box ref={inputRef} sx={{ display: "flex" }}>
      <DashBoard />
      <div style={{ backgroundColor: "#f9f8fb", width: "100%" , paddingLeft:"2.64%", paddingRight: "2.64%", paddingTop:"2.15%"}}>
        <p className="Header">
          <label className="medium_text">Staff Management</label>
          <div style={{ position: "relative" }}>
            <div className="search-bar-staff">
              <input
                style={{ height: "80%", fontSize: "12px" }}
                placeholder="Search by name"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <IconButton className="search-icon">
                <SearchIcon className="fa fa-search" />
              </IconButton>
            </div>
            {searchResult.length > 0 && (
              <div className="searchListContainer">
                {searchResult.map((user) => (
                  <div key={user._id}>
                    <button
                      className="searchitem"
                      onClick={() => handleClickSearch(user)}
                    >
                      {user.Name}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </p>

        <TabStaff items={items} />
      </div>
    </Box>
  );
};

export default Stuff;
