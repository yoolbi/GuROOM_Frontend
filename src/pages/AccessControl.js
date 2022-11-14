import React, { useEffect, useState } from "react";
import {
  IconButton,
  InputBase,
  Paper,
  Box,
  Chip,
  Button,
  Modal,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import { getAccessControlAPIMethod } from "../api/client";
import AccessControlPolicy from "./AccessControlPolicy";

//style for modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 700,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

//This is the access control tab from the Homepage.
const AccessControl = () => {
  const [openCreateAccessControlModal, setOpenCreateAccessControlModal] =
    useState(false);
  const handleOpenCreateAccessControlModal = () =>
    setOpenCreateAccessControlModal(true);
  const handleCloseCreateAccessControlModal = () =>
    setOpenCreateAccessControlModal(false);

  //click use
  const handleClickUse = (params) => {
    console.log(params);
  };

  //The table columns
  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "query",
      headerName: "Query",
      width: 250,
      renderCell: (params) => (
        <div style={{ width: "100%", overflowX: "auto" }}>
          {params.row.query}
        </div>
      ),
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
      renderCell: (params) => (
        <div style={{ width: "100%", overflowX: "auto" }}>
          {JSON.parse(params.row.allowedReaders).map((data) => {
            return <Chip label={data} variant="outlined" key={data} />;
          })}
        </div>
      ),
    },
    {
      field: "allowedWriters",
      headerName: "Allowed Writers",
      width: 150,
      renderCell: (params) => (
        <div style={{ width: "100%", overflowX: "auto" }}>
          {JSON.parse(params.row.allowedWriters).map((data) => {
            return <Chip label={data} variant="outlined" key={data} />;
          })}
        </div>
      ),
    },
    {
      field: "deniedReaders",
      headerName: "Denied Readers",
      width: 150,
      renderCell: (params) => (
        <div style={{ width: "100%", overflowX: "auto" }}>
          {JSON.parse(params.row.deniedReaders).map((data) => {
            return <Chip label={data} variant="outlined" key={data} />;
          })}
        </div>
      ),
    },
    {
      field: "deniedWriters",
      headerName: "Denied Writers",
      width: 150,
      renderCell: (params) => (
        <div style={{ width: "100%", overflowX: "auto" }}>
          {JSON.parse(params.row.deniedWriters).map((data) => {
            return <Chip label={data} variant="outlined" key={data} />;
          })}
        </div>
      ),
    },
    {
      field: "useButton",
      headerName: "",
      width: 80,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            size="small"
            onClick={() => handleClickUse(params)}
          >
            USE
          </Button>
        );
      },
    },
  ];

  //The table rows
  // const rows = [{ id: 1, lastName: "Snow", firstName: "Jon", age: 35 }];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    //get access control requirements
    getAccessControlAPIMethod().then((res) => {
      console.log(res);
      let tempRows = [];
      res.body.map((data) => {
        tempRows.push({
          id: data.name,
          name: data.name,
          query: data.query,
          group: data.Grp,
          allowedReaders: JSON.stringify(data.AR),
          allowedWriters: JSON.stringify(data.AW),
          deniedReaders: JSON.stringify(data.DR),
          deniedWriters: JSON.stringify(data.DW),
        });
      });
      setRows(tempRows);
    });
  }, [openCreateAccessControlModal]);

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
        {/*The table*/}
        <div style={{ width: "1%" }}></div>
        <div style={{ minWidth: "90px", textAlign: "right" }}>
          <img
            src="/img/add_button.png"
            style={{
              width: "40px",
              height: "40px",
              marginRight: "8px",
              cursor: "pointer",
            }}
            onClick={handleOpenCreateAccessControlModal}
          />
          <img
            src="/img/delete_button.png"
            style={{ width: "40px", height: "40px", cursor: "pointer" }}
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
      <Modal
        open={openCreateAccessControlModal}
        onClose={handleCloseCreateAccessControlModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AccessControlPolicy
            handleCloseCreateAccessControlModal={
              handleCloseCreateAccessControlModal
            }
          ></AccessControlPolicy>
        </Box>
      </Modal>
    </div>
  );
};

export default AccessControl;
