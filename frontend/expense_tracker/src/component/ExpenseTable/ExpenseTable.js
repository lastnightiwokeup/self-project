import React, { useEffect, useState, useReducer } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddRecordDialog from "../../pages/AddRecordDialog";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const columns = [
  { field: "id", headerName: "ID", width: 150 },
  {
    field: "itemName",
    headerName: "Item Name",
    width: 150,
    editable: true,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 100,
    type: "number",
    editable: true,
  },
  {
    field: "date",
    headerName: "Date",
    width: 150,
    editable: true,
  },
  {
    field: "category",
    headerName: "Category",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
  {
    field: "",
    headerName: "",
    description: "",
    sortable: false,
    width: 220,
    renderCell: (params) => {
      return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="warning"
            // onClick={() => {
            //   setvCardRecordToModify(params.row);
            //   setBusinessCardRecordToModify(params.row.businessCards);
            // }}
            sx={{ mr: "0.5rem" }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            // onClick={() => {
            //   setvCardRecordToModify(params.row);
            //   setBusinessCardRecordToModify(params.row.businessCards);
            // }}
            sx={{ mr: "0.5rem" }}
          >
            <DeleteIcon />
          </Button>
        </div>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    itemName: "Coffee",
    amount: 12,
    date: "2024/2/2",
    category: "Drink",
  },
  {
    id: 2,
    itemName: "Clothes",
    amount: 46,
    date: "2024/2/2",
    category: "Food",
  },
  { id: 3, itemName: "Toys", amount: 100, date: "2024/2/2", category: "Food" },
  { id: 4, itemName: "Phone", amount: 25, date: "2024/2/2", category: "Food" },
  { id: 5, itemName: "Pill", amount: 27, date: "2024/2/2", category: "Food" },
  { id: 6, itemName: "Fee", amount: 500, date: "2024/2/2", category: "Food" },
];

export default function DataGridDemo(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AddRecordDialog
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      ></AddRecordDialog>
      
      <Box sx={{ height: 500, width: "60%", margin: "0 auto" }}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          sx={{ mb: 2, mt: 2 }}
        >
          <Grid item md={4} sm={6} xs={12} sx={{ display: "flex" }}>
            <Grid item>
              <Button
                variant="contained"
                color="info"
                onClick={(e) => {
                  setIsOpen(true);
                }}
              >
                Add
              </Button>
            </Grid>
            <Grid item sx={{ ml: 1 }}>
              <Button variant="contained" color="success">
                Export CSV
              </Button>
            </Grid>
          </Grid>

          <Grid
            item
            md={4}
            sm={6}
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <TextField
              id="fullName"
              label="Search"
              variant="outlined"
              name="fullName"
            />
            <Grid sx={{ mt: 1, ml: 2 }}>
              <Button variant="contained" color="secondary">
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Box mb={2}>
          <Grid item md={12} sm={6} xs={12}>
            <div id="expense-table">
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                rowsPerPageOptions={[10, 50, 100]}
              />
            </div>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
