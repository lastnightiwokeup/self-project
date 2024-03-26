import React, { useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddRecordDialog from "../pages/AddRecordDialog";
import EditRecordDialog from "../pages/EditRecordDialog";
import { DataGrid } from "@mui/x-data-grid";
import slice from "./BudgetItemSlice";
import {
  search as searchItemRecord,
  deleteItemRecord,
} from "./BudgetItemSlice";
import Grid from "@mui/material/Grid";
import DeleteDialog from "./DeleteDialog";

export default function ExpenseTable(props) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const [recordToEdit, setRecordToEdit] = useState(null);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  // Slice for this page
  const sliceState = useSelector((state) => state.budgetItem);
  const [pageSize, setPageSize] = useState(50);
  const [pageNum, setPageNum] = useState(0);

  // Search Form Input Values
  const [searchInput, dispatchSearchInput] = useReducer(
    (state, action) => ({ ...state, ...action.payload }),
    {
      id: "",
      itemName: "",
      amount: "",
      date: "",
      category: "",
    }
  );

  const handleSearchInput = (evt) => {
    dispatchSearchInput({
      type: "patch",
      payload: { [evt.target.name]: evt.target.value },
    });
  };

  const submitSearch = () => {
    dispatch(searchItemRecord({ ...searchInput, pageSize, pageNum }));
  };

  const clearInput = () => {
    dispatchSearchInput({
      type: "patch",
      payload: {
        id: "",
        itemName: "",
        amount: "",
        date: "",
        category: "",
      },
    });
  };

  useEffect(() => {
    submitSearch();
  }, [pageSize, pageNum]);

  useEffect(() => {
    return () => dispatch(slice.actions.resetStore());
  }, []);

  const columnForDataGrid = [
    { field: "index", headerName: "", width: 80},
    {
      field: "itemName",
      headerName: "Item Name",
      width: 200,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 200,
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      sortable: true,
    },
    {
      field: "category",
      headerName: "Category",
      description: "",
      sortable: true,
      width: 200,
    },
    {
      field: "",
      headerName: "",
      description: "",
      sortable: false,
      width: 300,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                setRecordToEdit(params.row);
                setIsOpen(true);
              }}
              sx={{ mr: "0.5rem" }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setRecordToDelete(params.row.id);
                setIsDeleteDialogOpen(true);
              }}
              sx={{ mr: "0.5rem" }}
            >
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <AddRecordDialog
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          submitSearch();
        }}
      ></AddRecordDialog>

      <EditRecordDialog
        isOpen={isOpen}
        recordToEdit={recordToEdit}
        onClose={() => {
          setIsOpen(false);
          setRecordToEdit(null);
          submitSearch();
        }}
      ></EditRecordDialog>

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        itemToDelete={recordToDelete}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          submitSearch();
        }}
      />

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
              id="itemName"
              label="Item Name"
              variant="outlined"
              name="itemName"
              value={searchInput.itemName}
              InputLabelProps={{
                shrink: searchInput.itemName !== "",
              }}
              onChange={(e) => {
                handleSearchInput(e);
              }}
            />
            <Grid sx={{ mt: 1, ml: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={(e) => {
                  submitSearch();
                  clearInput();
                }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Box mb={4}>
          <Grid item md={12} sm={6} xs={12}>
            <div id="budget-table">
              <DataGrid
                columns={columnForDataGrid}
                rows={sliceState.budgetItemTable.rows}
                rowCount={sliceState.budgetItemTable.totalCount}
                loading={sliceState.budgetItemTable.isLoading}
                page={pageNum}
                onPageChange={(newPageNum) => setPageNum(newPageNum)}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[10, 50, 100]}
                pagination
                paginationMode="server"
                autoHeight
              />
            </div>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
