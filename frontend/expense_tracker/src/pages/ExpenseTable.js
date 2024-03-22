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
import { search as searchItemRecord } from "./BudgetItemSlice";
import Grid from "@mui/material/Grid";

export default function ExpenseTable(props) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const [recordToModify, setRecordToModify] = useState(null);

  // Slice for this page
  const sliceState = useSelector((state) => state.budgetItem);
  console.log(sliceState);

  const [pageSize, setPageSize] = useState(50);
  const [pageNum, setPageNum] = useState(0);
  // Search Form Input Values
  const [searchInput, dispatchSearchInput] = useReducer(
    (state, action) => ({ ...state, ...action.payload }),
    {
      itemName: "",
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
        itemName: "",
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
      width: 120,
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
      description: "",
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
              onClick={() => {
                setRecordToModify(params.row);
              }}
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
        records={recordToModify}
        onClose={() => {
          setIsOpen(false);
          setRecordToModify(null);
        }}
      ></EditRecordDialog>

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
