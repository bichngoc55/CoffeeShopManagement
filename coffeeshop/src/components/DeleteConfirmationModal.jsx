import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  fontFamily: "Montserrat, sans-serif",
  fontSize: "1.5em",
  fontWeight: 600,
  color: theme.palette.error.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 500,
  padding: theme.spacing(1, 3),
}));

export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  selectedDrink,
}) => {
  if (!isOpen) return null;

  return (
    <StyledDialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <StyledDialogTitle>
        Confirm Deletion
        <IconButton aria-label="close" onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Are you sure you want to delete {selectedDrink?.Name} drink? This
          action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={onClose} color="primary" variant="outlined">
          Cancel
        </StyledButton>
        <StyledButton
          onClick={onConfirm}
          color="error"
          variant="contained"
          startIcon={<DeleteForeverIcon />}
        >
          Delete
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};
