import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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

const Modal2 = ({ open, onClose, handleAddDrink }) => {
  const initialDrinkState = {
    Name: "",
    Description: "",
    Price: "",
    Photo: null,
    LoaiDoUong: "",
  };

  const [newDrink, setNewDrink] = useState(initialDrinkState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDrink((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    console.log("event.target.files : ", event.target.files);
    const file = event.target.files[0];
    setNewDrink((prevData) => ({
      ...prevData,
      Photo: file,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("new drink",newDrink);
    // Handle image upload and form submission logic here
    handleAddDrink(newDrink);
    onClose();
    setNewDrink(initialDrinkState);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
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
            Add a new drink
          </Typography>
          <IconButton onClick={onClose}>
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
              Drink Name
            </Typography>
            <TextField
              required
              label="Drink Name"
              name="Name"
              sx={{ ...textFieldStyles, width: "500px" }}
              value={newDrink.Name}
              onChange={handleInputChange}
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
              Description
            </Typography>
            <TextField
              label="Description"
              name="Description"
              sx={{ ...textFieldStyles, width: "500px" }}
              value={newDrink.Description}
              onChange={handleInputChange}
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
              Drink Price
            </Typography>
            <TextField
              required
              label="Drink Price"
              sx={textFieldStyles}
              name="Price"
              type="number"
              value={newDrink.Price}
              onChange={handleInputChange}
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
              Photo
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ marginLeft: "8px" }}
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
              Type
            </Typography>
            <TextField
              select
              label="Type"
              name="LoaiDoUong"
              sx={{ ...textFieldStyles, width: "500px" }}
              value={newDrink.LoaiDoUong}
              onChange={handleInputChange}
            >
              <MenuItem value="Coffee">Coffee</MenuItem>
              <MenuItem value="Juice">Juice</MenuItem>
              <MenuItem value="Tea">Tea</MenuItem>
              <MenuItem value="Milk based">Milk based</MenuItem>
              <MenuItem value="Topping">Topping</MenuItem>
            </TextField>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button type="submit" color="primary">
              Add
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default Modal2;
