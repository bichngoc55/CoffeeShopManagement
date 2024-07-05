import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// const textFieldStyles = {
//   "& .MuiOutlinedInput-root": {
//     "& fieldset": {
//       borderColor: "grey", // Default border color
//     },
//     "&:hover fieldset": {
//       borderColor: "#9398A8", // Border color on hover
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#9398A9", // Border color when focused
//     },
//   },
// };
const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "grey", // Default border color
    },
    "&:hover fieldset": {
      borderColor: "#9398A8", // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#9398A9", // Border color when focused
    },
  },
  width: "300px",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ModalAddIngredients = ({ open, handleClose, handleSubmit }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            sx={{
              fontFamily: "Montserrat",
              marginLeft: "5%",
            }}
            id="modal-modal-title"
            variant="h4"
            component="h1"
          >
            Add New Ingredient
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{
                alignContent: "center",
                fontFamily: "Montserrat",
                width: "40%",
              }}
            >
              Nhập tên nguyên liệu
            </Typography>
            <TextField
              required
              label="Ingredient Name"
              name="name"
              sx={{ ...textFieldStyles, width: "500px" }}
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{
                alignContent: "center",
                fontFamily: "Montserrat",
                width: "40%",
              }}
            >
              Nhập số lượng
            </Typography>
            <TextField
              required
              label="Quantity"
              sx={textFieldStyles}
              name="quantity"
              type="number"
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{
                alignContent: "center",
                fontFamily: "Montserrat",
                width: "40%",
              }}
            >
              Nhập miêu tả bảo quản
            </Typography>
            <TextField
              label="Description"
              sx={textFieldStyles}
              name="description"
              multiline
              rows={3}
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{
                alignContent: "center",
                fontFamily: "Montserrat",
                width: "40%",
              }}
            >
              Nhập đơn vị
            </Typography>
            <TextField
              required
              sx={textFieldStyles}
              label="Unit"
              name="unit"
              placeholder="Nhập đơn vị"
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{
                alignContent: "center",
                fontFamily: "Montserrat",
                width: "40%",
              }}
            >
              Nhập giá tiền
            </Typography>
            <TextField
              sx={textFieldStyles}
              required
              label="Price"
              name="price"
              type="number"
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{
                alignContent: "center",
                fontFamily: "Montserrat",
                width: "40%",
              }}
            >
              Nhập ngày hết hạn
            </Typography>
            <TextField
              label="Expiry Date"
              name="expiryDate"
              sx={textFieldStyles}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{
                alignContent: "center",
                fontFamily: "Montserrat",
                width: "40%",
              }}
            >
              Nhập ngày nhập hàng
            </Typography>
            <TextField
              label="Storage Date"
              sx={textFieldStyles}
              name="storageDate"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button type="submit">Submit</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalAddIngredients;
