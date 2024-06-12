import React, { useState } from "react";
import { TableRow, TableCell, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import { tableCellClasses } from "@mui/material/TableCell";

// Define the styles for the table cells
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: "14px",
    color: "#70768C",
  },
}));

const InventoryRow = ({
  data,
  isEditing,
  setEditingId,
  handleEdit,
  handleDelete,
}) => {
  const [editData, setEditData] = useState({ ...data });
  const toggleEdit = () => {
    setEditingId(isEditing ? null : data._id);
    if (isEditing) {
      handleEdit(data._id, editData);
    } else {
      setEditData({ ...data });
    }
  };

  const handleChange = (event) => {
    setEditData({ ...editData, [event.target.name]: event.target.value });
  };

  return (
    <TableRow hover>
      <StyledTableCell align="center" sx={{ fontFamily: "Montserrat" }}>
        {isEditing ? (
          <input
            minRows={3}
            maxRows={6}
            style={{ width: "100%", resize: "vertical" }}
            type="text"
            name="name"
            value={editData.name}
            onChange={handleChange}
          />
        ) : (
          data.name
        )}
      </StyledTableCell>
      <StyledTableCell sx={{ fontFamily: "Montserrat" }} align="center">
        {isEditing ? (
          <input
            type="text"
            style={{ width: "100%", resize: "vertical" }}
            name="quantity"
            value={editData.quantity}
            onChange={handleChange}
          />
        ) : (
          data.quantity
        )}
      </StyledTableCell>
      <StyledTableCell sx={{ fontFamily: "Montserrat" }} align="center">
        {isEditing ? (
          <input
            type="text"
            name="BaoQuan"
            style={{ width: "100%", resize: "vertical" }}
            value={editData.BaoQuan}
            onChange={handleChange}
          />
        ) : (
          data.BaoQuan
        )}
      </StyledTableCell>
      <StyledTableCell sx={{ fontFamily: "Montserrat" }} align="center">
        {isEditing ? (
          <input
            type="text"
            name="unit"
            style={{ width: "100%", resize: "vertical" }}
            value={editData.unit}
            onChange={handleChange}
          />
        ) : (
          data.unit
        )}
      </StyledTableCell>
      <StyledTableCell sx={{ fontFamily: "Montserrat" }} align="center">
        {isEditing ? (
          <input
            type="number"
            name="price"
            style={{ width: "100%", resize: "vertical" }}
            value={editData.price}
            onChange={handleChange}
          />
        ) : (
          data.price
        )}
      </StyledTableCell>
      <StyledTableCell sx={{ fontFamily: "Montserrat" }} align="center">
        {isEditing ? (
          <input
            type="text"
            name="StaffName"
            style={{ width: "100%", resize: "vertical" }}
            value={editData.StaffName}
            onChange={handleChange}
          />
        ) : (
          data.StaffName
        )}
      </StyledTableCell>
      <StyledTableCell sx={{ fontFamily: "Montserrat" }} align="center">
        {isEditing ? (
          <input
            style={{ width: "100%", resize: "vertical" }}
            type="text"
            name="NgayNhapKho"
            value={editData.NgayNhapKho}
            onChange={handleChange}
          />
        ) : (
          new Date(data.NgayNhapKho).toLocaleDateString()
        )}
      </StyledTableCell>
      <StyledTableCell sx={{ fontFamily: "Montserrat" }} align="center">
        {isEditing ? (
          <input
            type="text"
            style={{ width: "100%", resize: "vertical" }}
            name="ExpiryDate"
            value={editData.ExpiryDate}
            onChange={handleChange}
          />
        ) : (
          new Date(data.ExpiryDate).toLocaleDateString()
        )}
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "100%",
          marginTop: "20%",
          justifyContent: "space-between",
        }}
      >
        <IconButton sx={{ flexGrow: 1 }} onClick={toggleEdit}>
          {isEditing ? <DoneOutlineOutlinedIcon /> : <EditIcon />}
        </IconButton>
        <IconButton sx={{ flexGrow: 1 }} onClick={() => handleDelete(data._id)}>
          <DeleteIcon />
        </IconButton>
      </StyledTableCell>
    </TableRow>
  );
};

export default InventoryRow;
