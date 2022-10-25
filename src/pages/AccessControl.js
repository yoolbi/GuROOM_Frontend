import React from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

const AccessControl = () => {
  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "query",
      headerName: "Query",
      width: 250,
    },
    {
      field: "group",
      headerName: "Group",
      width: 120,
    },
    {
      field: "allowedReaders",
      headerName: "Allowed Readers",
      width: 150,
    },
    {
      field: "allowedWriters",
      headerName: "Allowed Writers",
      width: 150,
    },
    {
      field: "deniedReaders",
      headerName: "Denied Readers",
      width: 150,
    },
    {
      field: "deniedWriters",
      headerName: "Denied Writers",
      width: 150,
    },
    {
      field: "created",
      headerName: "Created",
      width: 100,
    },
    {
      field: "useButton",
      headerName: "",
      width: 80,
    },
  ];

  const rows = [{ id: 1, lastName: "Snow", firstName: "Jon", age: 35 }];

  return (
    <div>
      <div
        style={{
          display: "flex",
          height: "40px",
          justifyContent: "space-between",
        }}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="ex) readable: webyte@gmail.com"
            inputProps={{ "aria-label": "search google maps" }}
          />
        </Paper>
        <div style={{ width: "1%" }}></div>
        <div style={{ minWidth: "90px", textAlign: "right" }}>
          <img
            src="/img/add_button.png"
            style={{
              width: "40px",
              height: "40px",
              marginRight: "8px",
            }}
          />
          <img
            src="/img/delete_button.png"
            style={{ width: "40px", height: "40px" }}
          />
        </div>
      </div>
      <Box sx={{ height: 630, width: "100%", marginTop: "30px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      </Box>
    </div>
  );
};

export default AccessControl;
