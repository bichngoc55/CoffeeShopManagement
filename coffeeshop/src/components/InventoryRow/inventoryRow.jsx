import React, { useState } from "react";
import { useSelector } from "react-redux";
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
    color: "black",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  // Add this line to create a border for each row
  '& td': {
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
  },
}));

const InventoryRow = ({
  data,
  isEditing,
  setEditingId,
  handleEdit,
  handleDelete,
}) => {
  const { Position } = useSelector((state) => state.auths.user);
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
    <StyledTableRow hover>
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
      {/* <StyledTableCell sx={{ fontFamily: "Montserrat" }} align="center">
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
      </StyledTableCell> */}
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
      {Position === 'admin' && (
        <StyledTableCell
          align="center"
          sx={{
            alignItems: "center",
            width: "10%",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <IconButton           aria-label="Edit ingredient"
  sx={{  }} onClick={toggleEdit}>
            {isEditing ? <DoneOutlineOutlinedIcon /> : <EditIcon />}
          </IconButton>
          <IconButton           aria-label="Delete ingredient"
 sx={{  }} onClick={() => handleDelete(data._id)}>
            <DeleteIcon />
          </IconButton>
        </StyledTableCell>
      )}
    </StyledTableRow > 
  );
};

export default InventoryRow;
