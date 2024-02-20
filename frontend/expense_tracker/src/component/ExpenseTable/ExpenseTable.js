import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import DeleteIcon from "@mui/icons-material/Delete";
import AddRecord from "../../pages/AddRecord";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "Item Name",
    width: 200,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Amout",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Date",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Category",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "",
    headerName: "",
    description: "",
    sortable: false,
    width: 180,
    renderCell: (params) => {
      return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="primary"
            // onClick={() => {
            //   setvCardRecordToModify(params.row);
            //   setBusinessCardRecordToModify(params.row.businessCards);
            // }}
            sx={{ mr: "0.5rem" }}
          >
            Edit
          </Button>
          <Button
            variant="danger"
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
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function DataGridDemo(props) {
  return (
    <Box sx={{ height: 500, width: "80%" }}>
      <AddRecord />
      <Grid item md={6} sm={6} xs={12} style={{ paddingLeft: 0 }}>
        <TextField
          id="fullName"
          label="Search"
          variant="outlined"
          name="fullName"
          // onChange={(e) => {
          //   handleSearchInput(e);
          // }}

          // value={searchInput.fullName}
          // InputLabelProps={{
          //   shrink: searchInput.fullName !== "",
          // }}
        />
      </Grid>
      <Grid item md={6} sm={6} xs={12} style={{ paddingLeft: 0 }}>
        <Button
          // style={{
          //   marginLeft: isMobile ? 0 : 15,
          // }}
          
          variant="secondary"
          // onClick={(e) => {
          //   submitSearch();
          //   clearInput();
          // }}
        >
          Search
        </Button>
      </Grid>
      <Box mb={2}>
        <Grid item md={6} sm={6} xs={12} style={{ paddingLeft: 0 }}>
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
        </Grid>
      </Box>
    </Box>
  );
}
