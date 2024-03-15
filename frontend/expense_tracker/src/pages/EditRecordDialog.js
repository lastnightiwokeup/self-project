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
import moment from "moment";

export default function EditRecordDialog(props) {
  const isOpen = props.isOpen;
  const dispatch = useDispatch();
  const record = props.records;
  const [value, setValue] = useState("");
  console.log(record);

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
    <Dialog open={props.records !== null}>
      <DialogTitle>Edit Record</DialogTitle>
      <DialogContent>
        <Grid sx={{ mb: 5 }}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              id="date"
              name="date"
              value={moment(
                record &&
                  record.date !== null &&
                  record.date !== undefined
                  ? record.date
                  : ""
              )}
              onChange={(newValue) => setValue(newValue)}
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
            defaultValue={
              record &&
              record.category !== null &&
              record.category !== undefined
                ? record.category
                : ""
            }
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
            defaultValue={
              record &&
              record.itemName !== null &&
              record.itemName !== undefined
                ? record.itemName
                : ""
            }
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
            defaultValue={
              record && record.amount !== null && record.amount !== undefined
                ? record.amount
                : ""
            }
            onChange={(e) => {
              handleFormInput(e);
            }}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.onClose();
          }}
        >
          Cancel
        </Button>
        <Button
        // onClick={async () => {
        //   await dispatch(
        //     createBudgetItem({
        //       ...formInput,
        //     })
        //   );
        // }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
