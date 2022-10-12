import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FilterModal from "./FilterModal";
import { DataGrid } from "@mui/x-data-grid";
import { Button, CircularProgress } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {
  getFileSnapshotNamesAPIMethod,
  postFileSnapshotAPIMethod,
} from "../api/client";
import FilePermissionEditModal from "./FilePermissionEditModal";
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

const Home = () => {
  const [fileSnapshot, setFileSnapshot] = useState("");
  const [open, setOpen] = useState(false);
  const [openTakingSnapshot, setOpenTakingSnapshot] = useState(false);
  const [count, setCount] = useState(2);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const openFilePermissionEditModal = () => setOpenEditModal(true);
  const closeFilePermissionEditModal = () => setOpenEditModal(false);

  const handleChange = (event) => {
    setFileSnapshot(event.target.value);
  };

  //Table
  const [pageSize, setPageSize] = useState(10);
  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "owner",
      headerName: "Owner",
      width: 130,
      sortable: false,
    },
    {
      field: "inheritPermissions",
      headerName: "Inherit Permission",
      width: 150,
      sortable: false,
    },
    {
      field: "directPermission",
      headerName: "Direct Permission",
      width: 150,
      sortable: false,
    },
    {
      field: "sharingDifferences",
      headerName: "Sharing Differnece",
      description:
        "The differences between the file’s permissions and the folder’s permissions.",
      sortable: false,
      width: 150,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "deviantPermissions",
      headerName: "Deviant Permissions",
      description:
        "The differences between this file’s permissions and the permissions of most other files in the folder",
      width: 200,
    },
    {
      field: "created",
      headerName: "Created",
      width: 120,
    },
    {
      field: "modified",
      headerName: "Modified",
      width: 120,
    },
    {
      field: "size",
      headerName: "Size",
      width: 80,
    },
    {
      field: "edit",
      headerName: "",
      width: 50,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
    { id: 10, lastName: "Roxie", firstName: "Harvey", age: 65 },
    { id: 11, lastName: "Roxie", firstName: "Harvey", age: 65 },
    { id: 12, lastName: "Roxie", firstName: "Harvey", age: 65 },
    { id: 13, lastName: "Roxie", firstName: "Harvey", age: 65 },
    { id: 14, lastName: "Roxie", firstName: "Harvey", age: 65 },
    { id: 15, lastName: "Roxie", firstName: "Harvey", age: 65 },
    { id: 16, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const takingSnapshot = () => {
    setOpenTakingSnapshot(true);
    console.log("open");
    postFileSnapshotAPIMethod("File Snapshot " + count).then((data) => {
      console.log(data);
      console.log(data.status);
      if (data.status === 201) {
        setOpenTakingSnapshot(false);
      }
    });
  };

  const takingSnapshotClose = () => {
    setOpenTakingSnapshot(false);
    console.log("close");
  };

  function handleClickOpenBreadcrumb(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  const [fileSnapshotNames, setFileSnapshotNames] = useState([]);
  useEffect(() => {
    console.log("get file names");
    getFileSnapshotNamesAPIMethod().then((data) => {
      console.log(data);
      setFileSnapshotNames(data.body.names.reverse());
      setCount(data.body.names.length + 1);
      console.log(fileSnapshotNames);
    });
    console.log(fileSnapshotNames);
  }, [openTakingSnapshot]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "40px",
        }}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "80%",
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
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="tune"
            onClick={handleOpen}
          >
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <FilterModal></FilterModal>
              </Box>
            </Modal>
            <TuneIcon />
          </IconButton>
        </Paper>
        <div style={{ width: "3%" }}></div>
        <Box sx={{ minWidth: 210 }}>
          <FormControl sx={{ m: 1, minWidth: 200, margin: "0px" }} size="small">
            <InputLabel id="demo-select-small">File Snapshot</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={fileSnapshot}
              label="File Snapshot"
              onChange={handleChange}
            >
              {fileSnapshotNames.map((name) => (
                <MenuItem key={name.name} value={name.name}>
                  {name.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <img
          src="/img/snapshot_image.png"
          style={{
            width: "30px",
            height: "30px",
            paddingTop: "5px",
            cursor: "pointer",
          }}
          onClick={takingSnapshot}
        />
      </div>
      <div
        style={{
          marginTop: "10px",
          marginLeft: "5px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div role="presentation" onClick={handleClickOpenBreadcrumb}>
          <Breadcrumbs maxItems={2} aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="#">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="#">
              Catalog
            </Link>
            <Link underline="hover" color="inherit" href="#">
              Accessories
            </Link>
            <Link underline="hover" color="inherit" href="#">
              New Collection
            </Link>
            <Typography color="text.primary">Belts</Typography>
          </Breadcrumbs>
        </div>
        <Button
          variant="contained"
          size="small"
          onClick={openFilePermissionEditModal}
        >
          <Modal
            open={openEditModal}
            onClose={closeFilePermissionEditModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <FilePermissionEditModal></FilePermissionEditModal>
            </Box>
          </Modal>
          EDIT
        </Button>
      </div>
      <div style={{ height: "100%", marginTop: "10px" }}>
        <div style={{ height: 630, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 20, 30]}
            pagination
            checkboxSelection
          />
        </div>
      </div>
      <Modal
        open={openTakingSnapshot}
        onClose={takingSnapshotClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{
            width: "280px",
            height: "95px",
            backgroundColor: "white",
            borderRadius: "5px",
            position: "absolute",
            bottom: 0,
            right: 0,
            marginRight: "20px",
          }}
        >
          <div
            style={{
              width: "290px",
              height: "45px",
              backgroundColor: "#323232",
              color: "white",
              lineHeight: "45px",
              fontFamily: "Roboto",
              borderRadius: "5px 5px 0px 0px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ paddingLeft: "20px" }}>Taking Snapshot</div>
            <ClearIcon
              style={{ marginTop: "10px", width: "50px", cursor: "pointer" }}
              onClick={takingSnapshotClose}
            ></ClearIcon>
          </div>

          <div
            style={{
              width: "290px",
              height: "50px",
              backgroundColor: "white",
              lineHeight: "50px",

              fontFamily: "Roboto",
              borderRadius: "0px 0px 5px 5px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ paddingLeft: "20px" }}>File Snapshot {count}</div>
            <div style={{ marginRight: "20px", marginTop: "5px" }}>
              <CircularProgress size={20} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
