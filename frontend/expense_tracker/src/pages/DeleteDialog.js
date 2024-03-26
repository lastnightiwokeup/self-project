//Material-UI
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";

import React, { useReducer, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import slice, { deleteItemRecord } from "./BudgetItemSlice";

function DeleteDialog(props) {
  const dispatch = useDispatch();
  const itemsToDelete = props.itemToDelete;
  const isOpen = props.isOpen;
  const isClose = props.onClose;

  useEffect(() => {
    return () => dispatch(slice.actions.resetStore());
  }, []);

  return (
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onClose={isClose}
    >
      <DialogTitle
        id="alert-dialog-title"
        style={{ fontWeight: "bold" }}
        sx={{ ml: "0.5rem" }}
      >
      </DialogTitle>
      <DialogContentText
        id="alert-dialog-description"
        style={{ fontSize: "1.1rem" }}
        sx={{ mx: "2rem", my: "0.5rem", mb: "2.2rem" }}
      >
        Are you sure you want to delete?{" "}
      </DialogContentText>
      <DialogActions>
        <Button variant="contained" onClick={isClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={async () => {
            try {
              await dispatch(deleteItemRecord({ id: itemsToDelete }));
              props.onClose();
            } catch (error) {
              console.error("Error deleting records:", error);
            }
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
