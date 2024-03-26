import React, { useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@mui/material";
import { editBudgetItem } from "./BudgetItemSlice";

function EditRecordDialog(props) {
  const isOpen = props.isOpen;
  const isClose = props.onClose;
  const dispatch = useDispatch();
  const recordToEdit = props.recordToEdit;

  // Form
  const [formInput, dispatchFormInput] = useReducer(
    (state, action) => ({ ...state, ...action.payload }),
    {
      date: "",
      itemName: "",
      amount: "",
      category: "",
    }
  );

  const handleFormInput = (evt) => {
    dispatchFormInput({
      payload: { [evt.target.name]: evt.target.value },
    });
  };

  useEffect(() => {
    if (recordToEdit) {
      dispatchFormInput({ payload: recordToEdit });
    }
  }, [recordToEdit]);

  return (
    <>
      <Dialog open={isOpen} onClose={isClose}>
        <DialogTitle>Edit Record</DialogTitle>
        <DialogContent>
          <Grid sx={{ mb: 5 }}>
            <TextField
              id="date"
              name="date"
              label="Date"
              variant="outlined"
              fullWidth
              value={formInput.date}
              onChange={(e) => {
                handleFormInput(e);
              }}
            />
          </Grid>
          <Grid sx={{ mb: 5 }}>
            <TextField
              id="category"
              name="category"
              label="Category"
              variant="outlined"
              fullWidth
              value={formInput.category}
              onChange={(e) => {
                handleFormInput(e);
              }}
            />
          </Grid>

          <Grid sx={{ mb: 5 }}>
            <TextField
              id="itemName"
              name="itemName"
              label="Item Name"
              variant="outlined"
              fullWidth
              value={formInput.itemName}
              onChange={(e) => {
                handleFormInput(e);
              }}
            />
          </Grid>

          <Grid sx={{ mb: 5 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="amount"
              name="amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
              fullWidth
              value={formInput.amount}
              onChange={(e) => {
                handleFormInput(e);
              }}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={isClose}>Cancel</Button>
          <Button
            onClick={async () => {
              await dispatch(
                editBudgetItem({ ...formInput, id: recordToEdit.id })
              );
              props.onClose();
            }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditRecordDialog;
