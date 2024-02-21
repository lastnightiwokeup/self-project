import React, { useState, useEffect } from "react";
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

export default function FormDialog(props) {
  const isOpen = props.isOpen;


  return (
    // <React.Fragment>
    //   <Button variant="outlined" onClick={handleClickOpen}>
    //     Add
    //   </Button>
    <Dialog
      onClose={props.onClose}
      open={isOpen}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
        },
      }}
    >
      <DialogTitle>New Record</DialogTitle>
      <DialogContent>
        <Grid sx={{ mb: 5 }}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker />
          </LocalizationProvider>
        </Grid>
        <Grid sx={{ mb: 5 }}>
          <TextField
            id="outlined-basic"
            label="Item Name"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid container spacing={1} sx={{ mb: 5 }}>
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            defaultValue="EUR"
            fullWidth
          >
            {/* {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))} */}
          </TextField>
        </Grid>
        <Grid container spacing={1} sx={{ mb: 5 }}>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button type="submit">Add</Button>
      </DialogActions>
    </Dialog>
  );
}
