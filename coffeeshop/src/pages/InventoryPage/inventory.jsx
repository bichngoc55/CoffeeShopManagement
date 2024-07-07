import React, { useState, useEffect } from "react";
import DashBoard from "../../components/dashBoard/dashBoard";
import { Box, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import InventoryRow from "../../components/InventoryRow/inventoryRow";
import Table from "@mui/material/Table";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import ModalAddIngredients from "../../components/ModalAddIngredients/ModalAddIngredients";
import { Typography } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#EFF0F6",
    color: "#4F5E74",
    fontSize: "15px",
    fontWeight: "bold",
    fontFamily: "Montserrat",
    padding: "10px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "18px",
    fontWeight: "normal",
    fontFamily: "Montserrat",
  },
}));

const Inventory = () => {
  const token = useSelector((state) => state.auths.token);
  const { Position } = useSelector((state) => state.auths.user);
  const [value, setValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalInventoryData, setOriginalInventoryData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [inventoryCount, setInventoryCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState(null);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (!searchTerm) {
      setInventoryData(originalInventoryData);
      setInventoryCount(originalInventoryData.length);
    } else {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filteredData = originalInventoryData.filter((inventory) =>
        inventory.name.toLowerCase().includes(lowercasedFilter)
      );
      setInventoryData(filteredData);
      setInventoryCount(filteredData.length);
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  //Gọi dữ liệu kho từ db
  const fetchInventoryData = async () => {
    try {
      const response = await fetch("http://localhost:3005/inventory/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const inventory = await response.json();

      setInventoryData(inventory);
      setInventoryCount(inventory.length);
      setOriginalInventoryData(inventory);
    } catch (error) {
      console.error("Failed to fetch bill data:", error);
    }
  };

  const handleEdit = async (id, edittedInfo) => {
    try {
      const response = await fetch(`http://localhost:3005/inventory/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(edittedInfo),
      });
      const data = await response.json();
      console.log(data);
      await fetchInventoryData();
      setSearchTerm(""); // Reset search term after editing
    } catch (error) {
      console.error("Request failed with error:", error);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3005/inventory/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      await fetchInventoryData();
      setSearchTerm(""); // Reset search term after deleting
    } catch (error) {
      console.error("Request failed with error:", error);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const handleSortAccordingToStorageData = () => {
    const sortedData = [...originalInventoryData].sort((a, b) => {
      const dateA = new Date(a.NgayNhapKho);
      const dateB = new Date(b.NgayNhapKho);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setInventoryData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortField("NgayNhapKho");
  };

  const handleSortAccordingToExpireDate = () => {
    const sortedData = [...originalInventoryData].sort((a, b) => {
      const dateA = new Date(a.ExpiryDate);
      const dateB = new Date(b.ExpiryDate);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setInventoryData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortField("ExpiryDate");
  };

  const handleSubmitModal = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data2 = {
      name: formData.get("name"),
      quantity: formData.get("quantity"),
      BaoQuan: formData.get("description"),
      unit: formData.get("unit"),
      price: formData.get("price"),
      ExpiryDate: formData.get("expiryDate"),
      NgayNhapKho: formData.get("storageDate"),
    };
    try {
      const response = await fetch("http://localhost:3005/inventory/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data2),
      });
      const data = await response.json();
      console.log("data2 : " + JSON.stringify(data));
      await fetchInventoryData();
      setSearchTerm(""); // Reset search term after adding new item
    } catch (error) {
      console.error("Request failed with error:", error);
    }
    handleCloseModal();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <DashBoard />
      <div
        style={{
          marginLeft:"2.64%",
          marginRight: "2.64%",
          textAlign: "left",
          marginTop: "2.15%",
          marginBottom:"2.15%"
        }}>
        <div style={{display: "flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginBottom:"1%"}} >
          <label className="medium_text">
            Inventory Page
          </label>
          <div style={{ position: "relative" }}>
            <div className="search-bar-staff">
              <SearchIcon className="fa fa-search" />
              <input
                style={{ height: "80%", fontSize: "12px" }}
                placeholder="Search by ingredient name"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              width: "30%",
              p: 2,
              marginBottom: "0.5%",
            }}
          >
            <Typography
              marginLeft="1%"
              color="#9398A9"
              fontSize="1.2em"
              fontWeight="bold"
              fontFamily={"Montserrat"}
            >
              Details
            </Typography>
            <Typography
              marginLeft="3%"
              color="#412D26"
              fontSize="1.2em"
              fontWeight="bold"
              fontFamily={"Montserrat"}
            >
              {inventoryCount} ingredients
            </Typography>
          </Box>
          {Position === 'admin' && (
            <Box sx={{ display: "flex", marginRight: "1%" }}>
              <Typography
                color="#412D26"
                fontSize="1.2em"
                fontWeight="bold"
                alignItems="center"
                alignContent={"center"}
                fontFamily={"Montserrat"}
              >
                Add New Ingredient
              </Typography>
              <IconButton onClick={handleOpenModal}>
                <AddCircleOutlineOutlinedIcon color="#412D26" />
              </IconButton>
              <ModalAddIngredients
                open={modalOpen}
                handleClose={handleCloseModal}
                handleSubmit={handleSubmitModal}
              />
            </Box>
          )}
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  style={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  align="center"
                >
                  Ingredient Name
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                    width: "10%",
                  }}
                  align="center"
                >
                  Quantity
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                    width: "15%",
                  }}
                  align="center"
                >
                  Product Description
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  align="center"
                >
                  Unit
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  align="center"
                >
                  Price
                </StyledTableCell>
                {/* <StyledTableCell
                  style={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  align="center"
                >
                  Nhân Viên
                </StyledTableCell> */}
                <StyledTableCell
                  style={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  align="center"
                >
                  <Box sx={{ display: "flex", alignItems:"center", justifyContent:"center" }}>
                   Date Received
                    <IconButton onClick={handleSortAccordingToStorageData}>
                      {sortField === "NgayNhapKho" && sortOrder === "asc" ? (
                        <ArrowDropUpOutlinedIcon />
                      ) : (
                        <ArrowDropDownOutlinedIcon />
                      )}
                    </IconButton>
                  </Box>
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  {" "}
                  <Box sx={{ display: "flex" , alignItems:"center", justifyContent:"center"}}>
                   Expiration Date 
                    <IconButton onClick={handleSortAccordingToExpireDate}>
                      {sortField === "ExpiryDate" && sortOrder === "asc" ? (
                        <ArrowDropUpOutlinedIcon />
                      ) : (
                        <ArrowDropDownOutlinedIcon />
                      )}
                    </IconButton>{" "}
                  </Box>
                </StyledTableCell>
                {Position === 'admin' && (
                  <StyledTableCell
                    style={{
                      borderRight: "1px solid rgba(224, 224, 224, 1)",
                    }}
                    align="center"
                  >
                    Options
                  </StyledTableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {inventoryData.map((data) => (
                <InventoryRow
                  key={data._id}
                  data={data}
                  isEditing={editingId === data._id}
                  setEditingId={setEditingId}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Box>
  );
};

export default Inventory;
