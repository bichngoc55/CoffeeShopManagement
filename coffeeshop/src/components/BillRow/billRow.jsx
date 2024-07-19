import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
} from "@mui/material";
import { Menu, MenuItem, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

const StyledTableRow = styled(TableRow)(({ theme, index }) => ({
  backgroundColor: index % 2 === 0 ? "#F5F5DC" : "white",
  "&:hover": {
    backgroundColor: "#F9F8FB",
    color: "#70768C",
  },
  "&:last-child td, &:last-child th": {
    borderBottom: 0,
  },
}));

const StyledCollapseBox = styled(Box)(({ theme }) => ({
  margin: 1,
  borderRadius: "8px",
  marginTop: "2%",
  marginBottom: "2%",
  overflow: "hidden",
  boxShadow: theme.shadows[1],
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#B49D96",
    color: "#70768C",
    fontSize: "10px",
    fontWeight: "bold",
    fontFamily: "Montserrat",
    padding: "10px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "15px",
    color: "#70768C",
    fontWeight: "normal",
    fontFamily: "Montserrat",
  },
}));

const StyledCollapse = styled(Collapse)({
  borderRadius: "18px",
});

const BillRow = ({ data, handleDelete, handleEdit }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open2 = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <StyledTableRow
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer" }}
        index={data.index}
      >
        <StyledTableCell align="center">{data._id}</StyledTableCell>
        <StyledTableCell align="center">{data.items.length}</StyledTableCell>
        <StyledTableCell align="center">
          {data.TableNo?.tableNumber || ""}
        </StyledTableCell>
        <StyledTableCell align="center">
          {data.Staff?.Name || "N/A"}
        </StyledTableCell>
        <StyledTableCell align="center">{data.totalAmount}</StyledTableCell>
        <StyledTableCell align="center">{data.PaymentMethod}</StyledTableCell>
        <StyledTableCell align="center">
          {new Date(data.createdAt).toLocaleString()}
        </StyledTableCell>
        <StyledTableCell align="center">
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                aria-label="delete"
                onClick={(event) => {
                  event.stopPropagation();
                  handleClose();
                  handleDelete(data._id);
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          </IconButton>
        </StyledTableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <StyledCollapse in={open} timeout="auto" unmountOnExit>
            <StyledCollapseBox margin={1}>
              <Typography
                marginLeft="3%"
                color="#9398A9"
                fontSize="1.7em"
                fontWeight="bold"
              >
                Drink Details
              </Typography>
              <Table size="small" aria-label="drinks ">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Price</StyledTableCell>
                    <StyledTableCell align="center">Quantity</StyledTableCell>
                    <StyledTableCell align="center">Size</StyledTableCell>
                    <StyledTableCell align="center">
                      Percent of Sugar
                    </StyledTableCell>
                    <StyledTableCell align="center">Hot/Cold</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.items.map((item, index) => (
                    <StyledTableRow key={item._id} index={index}>
                      <StyledTableCell
                        align="center"
                        style={{
                          borderRight: "1px solid rgba(224, 224, 224, 1)",
                        }}
                      >
                        {item.drink.Name}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        style={{
                          borderRight: "1px solid rgba(224, 224, 224, 1)",
                        }}
                      >
                        {item.drink.Price}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        style={{
                          borderRight: "1px solid rgba(224, 224, 224, 1)",
                        }}
                      >
                        {item.quantity}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        style={{
                          borderRight: "1px solid rgba(224, 224, 224, 1)",
                        }}
                      >
                        {item.size}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        style={{
                          borderRight: "1px solid rgba(224, 224, 224, 1)",
                        }}
                      >
                        {item.percentOfSugar}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        style={{
                          borderRight: "1px solid rgba(224, 224, 224, 1)",
                        }}
                      >
                        {item.hotOrCold}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledCollapseBox>
          </StyledCollapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default BillRow;
