import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import styled from "styled-components";

// import { withStyles } from "@material-ui/core/styles";

import CloseIcon from "@mui/icons-material/Close";

const WhiteBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: white;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: white;
    }
  }
`;
const ModifyDialog = ({ onClose, drink, handleUpdateChange }) => {
  const [modifiedDrink, setModifiedDrink] = useState({
    Name: "",
    Price: 0,
    Type: "",
    Description: "",
  });

  useEffect(() => {
    // console.log("Drink in modal: ", JSON.stringify(drink));
    if (drink) {
      setModifiedDrink({
        Name: drink.Name || "",
        Price: drink.Price || 0,
        Type: drink.LoaiDoUong || "",
        Description: drink.Description || "",
      });
    }
  }, [drink]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setModifiedDrink((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <DialogTitle sx={{ fontFamily: "Montserrat", fontSize: "1.5em" }}>
          Modify Drink
        </DialogTitle>
        <IconButton sx={{ marginRight: "2%" }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <TextField
          autoFocus
          name="Name"
          label="Drink Name"
          type="text"
          variant="standard"
          fullWidth
          value={modifiedDrink.Name}
          onChange={handleChange}
          sx={{
            "& .MuiInputBase-input": {
              padding: "9px 9px", // Adjust padding as needed
            },
          }}
        />

        <TextField
          margin="dense"
          name="Price"
          label="Price"
          type="number"
          fullWidth
          variant="standard"
          value={modifiedDrink.Price}
          onChange={handleChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "red",
              },
              "&:hover fieldset": {
                borderColor: "red",
              },
              "&.Mui-focused fieldset": {
                borderColor: "red",
              },
            },
            "& .MuiInputBase-input": {
              padding: "9px 9px", // Adjust padding as needed
            },
          }}
        />
        <FormControl fullWidth variant="standard" margin="dense">
          <InputLabel id="drink-type-label">Drink Type</InputLabel>
          <Select
            labelId="drink-type-label"
            name="Type"
            value={modifiedDrink.Type}
            onChange={handleChange}
            sx={{
              "& .MuiInputBase-input": {
                padding: "9px 9px", // Adjust padding as needed
              },
            }}
          >
            <MenuItem value="Coffee">Coffee</MenuItem>
            <MenuItem value="Tea">Tea</MenuItem>
            <MenuItem value="Juice">Juice</MenuItem>
            <MenuItem value="Milk based">Milk based</MenuItem>
            <MenuItem value="Topping">Topping</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          name="Description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          multiline
          rows={3}
          value={modifiedDrink.Description}
          onChange={handleChange}
          sx={{
            "& .MuiInputBase-input": {
              padding: "9px 9px", // Adjust padding as needed
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleUpdateChange(modifiedDrink)}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModifyDialog;
