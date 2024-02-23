import React, { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { createBudgetItem } from "./BudgetItemSlice";

export default function FormDialog(props) {
  const isOpen = props.isOpen;
  const dispatch = useDispatch();

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

  console.log(formInput);

  const handleFormInput = (evt) => {
    const { name, value } = evt.target;

    if (name === "date") {
      dispatchFormInput({
        type: "patch",
        payload: {
          date: value,
        },
      });
    } else {
      dispatchFormInput({
        type: "patch",
        payload: {
          [name]: value,
        },
      });
    }
  };

  return (
    <Dialog
      onClose={props.onClose}
      open={isOpen}
      // PaperProps={{
      //   component: "form",
      //   onSubmit: (event) => {
      //     event.preventDefault();
      //     const formData = new FormData(event.currentTarget);
      //     const formJson = Object.fromEntries(formData.entries());
      //   },
      // }}
    >
      <DialogTitle>New Record</DialogTitle>
      <DialogContent>
        <Grid sx={{ mb: 5 }}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              id="date"
              name="date"
              onChange={(date) => {
                handleFormInput({
                  target: {
                    name: "date",
                    value: date,
                  },
                });
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid sx={{ mb: 5 }}>
          <TextField
            id="category"
            name="category"
            label="Category"
            variant="outlined"
            fullWidth
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
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            fullWidth
            onChange={(e) => {
              handleFormInput(e);
            }}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button
          onClick={async () => {
            await dispatch(
              createBudgetItem({
                ...formInput,
              })
            );
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
