import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

const Modal = ({ onClose }) => {
  const [newDrink, setNewDrink] = useState({
    name: "",
    price: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setNewDrink((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddDrink = () => {
    // Here, add code to add the drink to your database
    // Then, close the dialog
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle id="form-dialog-title">Add a new drink</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the details of the new drink.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Drink Name"
          type="text"
          fullWidth
          value={newDrink.name}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="price"
          label="Drink Price"
          type="number"
          fullWidth
          value={newDrink.price}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddDrink} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
