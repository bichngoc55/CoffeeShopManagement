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
    fontFamily: "Arial",
  },
}));

const Inventory = () => {
  const token = useSelector((state) => state.auths.token);
  const [value, setValue] = useState(0);
  const [inventoryData, setInventoryData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [inventoryCount, setInventoryCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState(null);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
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
      fetchInventoryData();
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
      fetchInventoryData();
    } catch (error) {
      console.error("Request failed with error:", error);
    }
  };
  useEffect(() => {
    fetchInventoryData();
  }, []);
  const handleSortAccordingToStorageData = () => {
    const sortedData = [...inventoryData].sort((a, b) => {
      const dateA = new Date(a.NgayNhapKho);
      const dateB = new Date(b.NgayNhapKho);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setInventoryData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortField("NgayNhapKho");
  };
  const handleSortAccordingToExpireDate = () => {
    const sortedData = [...inventoryData].sort((a, b) => {
      const dateA = new Date(a.ExpiryDate);
      const dateB = new Date(b.ExpiryDate);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setInventoryData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortField("ExpiryDate");
  };

  const user = useSelector((state) => state.auths.user);
  const Name = user.Name;
  const handleSubmitModal = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data2 = {
      name: formData.get("name"),
      quantity: formData.get("quantity"),
      BaoQuan: formData.get("description"),
      StaffName: Name,
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
      fetchInventoryData();
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
          paddingLeft: "16px",
          textAlign: "left",
        }}
      >
        <label className="headerBooking">Màn Hình Nhập Kho/Nguyên Liệu</label>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              width: "20%",
              p: 2,
              marginBottom: "0.5%",
              borderRadius: "4px",
            }}
          >
            <Typography
              marginLeft="3%"
              color="#9398A9"
              fontSize="1.2em"
              fontWeight="bold"
            >
              Details
            </Typography>
            <Typography
              marginLeft="3%"
              color="#412D26"
              fontSize="1.2em"
              fontWeight="bold"
            >
              {inventoryCount} nguyên liệu
            </Typography>
          </Box>
          <Box sx={{ display: "flex", marginRight: "4%" }}>
            <Typography
              color="#412D26"
              fontSize="1.2em"
              fontWeight="bold"
              alignItems="center"
              alignContent={"center"}
            >
              Thêm
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
                  Tên Nguyên Liệu
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                    width: "10%",
                  }}
                  align="center"
                >
                  Số Lượng
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                    width: "15%",
                  }}
                  align="center"
                >
                  Miêu Tả Bảo Quản
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  align="center"
                >
                  Đơn vị
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  align="center"
                >
                  Giá tiền
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  align="center"
                >
                  Nhân Viên
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  align="center"
                >
                  <Box sx={{ display: "flex" }}>
                    Ngày Nhập
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
                  <Box sx={{ display: "flex" }}>
                    Ngày Hết Hạn
                    <IconButton onClick={handleSortAccordingToExpireDate}>
                      {sortField === "ExpiryDate" && sortOrder === "asc" ? (
                        <ArrowDropUpOutlinedIcon />
                      ) : (
                        <ArrowDropDownOutlinedIcon />
                      )}
                    </IconButton>{" "}
                  </Box>
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  align="center"
                >
                  Options
                </StyledTableCell>
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
