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
  const [newDrink, setNewDrink] = useState({
    name: "",
    description: "",
    price: "",
    photo: null,
    type: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDrink((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setNewDrink((prevData) => ({
      ...prevData,
      photo: event.target.files[0],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle image upload and form submission logic here
    handleAddDrink(newDrink);
    onClose();
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
              name="name"
              sx={{ ...textFieldStyles, width: "500px" }}
              value={newDrink.name}
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
              name="description"
              sx={{ ...textFieldStyles, width: "500px" }}
              value={newDrink.description}
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
              name="price"
              type="number"
              value={newDrink.price}
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
              name="type"
              sx={{ ...textFieldStyles, width: "500px" }}
              value={newDrink.type}
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
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
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
