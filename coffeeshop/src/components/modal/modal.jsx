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
      borderColor: "#D0D5DD", // Default border color
    },
    "&:hover fieldset": {
      borderColor: "#9398A8", // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#714534", // Border color when focused
    },
  },
  width: "100%",
};

const style = {
  position: "fixed", 
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxHeight: "95vh", // Max height to ensure it fits within the viewport
  overflowY: "auto", // Enable vertical scrolling
  bgcolor: "#FFFFFF",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  p: 4,
  pt: 3, // Add padding-top
  pb: 3, // Add padding-bottom
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
            mb: 3,
          }}
        >
          <div
            className="title"
          >
            Add a new drink
          </div>
          <IconButton onClick={onClose} sx={{ color: "#714534" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {[
            { label: "Drink Name", name: "Name", type: "text" },
            { label: "Description", name: "Description", type: "text", multiline: true, rows: 3 },
            { label: "Drink Price", name: "Price", type: "number" },
            { label: "Photo", name: "Photo", type: "file", accept: "image/*", onChange: handleFileChange },
            { label: "Type", name: "LoaiDoUong", type: "select" },
          ].map((field) => (
            <Box key={field.name} sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  width: "40%",
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  color: "#344054",
                }}
              >
                {field.label}
              </Typography>
              {field.type === "select" ? (
                <TextField
                  select
                  label={field.label}
                  name={field.name}
                  sx={{ ...textFieldStyles, width: "60%" }}
                  value={newDrink.LoaiDoUong}
                  onChange={handleInputChange}
                >
                  <MenuItem value="Coffee">Coffee</MenuItem>
                  <MenuItem value="Juice">Juice</MenuItem>
                  <MenuItem value="Tea">Tea</MenuItem>
                  <MenuItem value="Milk based">Milk based</MenuItem>
                  <MenuItem value="Topping">Topping</MenuItem>
                </TextField>
              ) : field.type === "file" ? (
                <input
                  type="file"
                  accept={field.accept}
                  onChange={field.onChange}
                  style={{ marginLeft: "8px" }}
                />
              ) : (
                <TextField
                  required
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  multiline={field.multiline}
                  rows={field.rows}
                  sx={{ ...textFieldStyles, width: "60%" }}
                  value={newDrink[field.name]}
                  onChange={handleInputChange}
                />
              )}
            </Box>
          ))}

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#714534",
                color: "#FFFFFF",
                fontFamily: "Montserrat",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "#8B572A",
                },
              }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default Modal2;