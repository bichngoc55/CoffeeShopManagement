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

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#D0D5DD",
    },
    "&:hover fieldset": {
      borderColor: "#9398A8",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#714534",
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

const ModalAddIngredients = ({ open, handleClose, handleSubmit }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <span className="title"
          >
            Add New Ingredient
          </span>
          <IconButton onClick={handleClose} sx={{ color: "#714534" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          component="form"
          role="form"
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
            { label: "Ingredient Name", name: "name", type: "text" },
            { label: "Quantity", name: "quantity", type: "number" },
            { label: "Description", name: "description", type: "text", multiline: true, rows: 3 },
            { label: "Unit", name: "unit", type: "text" },
            { label: "Price", name: "price", type: "number" },
            { label: "Expiry Date", name: "expiryDate", type: "date" },
            { label: "Storage Date", name: "storageDate", type: "date" },
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
              <TextField
                required
                label={field.label}
                name={field.name}
                type={field.type}
                multiline={field.multiline}
                rows={field.rows}
                sx={textFieldStyles}
                InputLabelProps={{
                  shrink: true,
                }}
              />
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
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalAddIngredients;