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
import Modal from "@mui/material/Modal";
import FilterModal from "./FilterModal";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  CircularProgress,
  DialogContent,
  TextField,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import FolderIcon from "@mui/icons-material/Folder";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

import {
  deleteFileSnapshotNamesAPIMethod,
  getFileSnapshotNamesAPIMethod,
  getFileSnapshotAPIMethod,
  postFileSnapshotAPIMethod,
  putFileSnapshotNamesAPIMethod,
} from "../api/client";
import FilePermissionEditModal from "./FilePermissionEditModal";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

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

  let fileSnapshotLet = "";
  const handleChange = (event) => {
    setFileSnapshot(event.target.value);
    fileSnapshotLet = event.target.value;
    console.log(fileSnapshot);
    setRows([
      {
        id: 1,
        name: "My Drive",
      },
      { id: 2, name: "Shared With Me" },
    ]);
    setColumns([
      {
        field: "name",
        headerName: "Name",
        width: 200,
        renderCell: (params) => (
          <div
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => handleClickCell(params.row.name)}
          >
            {params.row.name}
          </div>
        ),
      },
    ]);
  };

  //Initial Table
  const [pageSize, setPageSize] = useState(10);
  const [columns, setColumns] = useState([
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => (
        <div
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => handleClickCell(params.row.name)}
        >
          {params.row.name}
        </div>
      ),
    },
  ]);

  const [rows, setRows] = useState([
    {
      id: 1,
      name: "My Drive",
    },
    { id: 2, name: "Shared With Me" },
  ]);

  //file snapshot get
  const [files, setFiles] = useState([]);

  //True: My Drive. False: Shared With Me?
  const [myDrive, setMyDrive] = useState(false);
  //Table checkbox selected
  const [selectionModel, setSelectionModel] = useState([]); //added line
  const [startOffset, setStartOffset] = useState(0);
  let my_drive = false;
  let shared_drive = false;

  //file permissions
  const [permissions, setPermissions] = useState([]);
  let permissionsLet = [];

  //remove owner from permissions
  const removeOwnerFromPermissions = () => {
    // let tempPermissions;
    console.log(permissionsLet);
    for (var key in permissionsLet) {
      for (var key2 in permissionsLet[key]["direct_permissions"]) {
        let role = permissionsLet[key]["direct_permissions"][key2]["role"];
        if (role === "owner") {
          delete permissionsLet[key]["direct_permissions"][key2];
          permissionsLet[key]["direct_permissions"].pop();
        }
      }
    }
    console.log(permissionsLet);
  };

  const removeOwnerFromInheritPermissions = () => {
    // let tempPermissions;
    console.log(permissionsLet);
    for (var key in permissionsLet) {
      for (var key2 in permissionsLet[key]["inherit_permissions"]) {
        let role = permissionsLet[key]["inherit_permissions"][key2]["role"];
        if (role === "owner") {
          delete permissionsLet[key]["inherit_permissions"][key2];
          permissionsLet[key]["inherit_permissions"].pop();
        }
      }
    }
    console.log(permissionsLet);
  };

  //onClick folder name in table
  const handleClickCell = (name, type, id) => {
    console.log(type);
    console.log(id);
    console.log("click", name);
    if (name === "My Drive") {
      setMyDrive(true);
      my_drive = true;
      shared_drive = false;
    } else if (name === "Shared With Me") {
      setMyDrive(false);
      my_drive = false;
      shared_drive = true;
    } else {
      my_drive = false;
      shared_drive = false;
    }
    console.log(myDrive);
    console.log(my_drive);
    console.log(fileSnapshot);
    let fileRow = [];
    getFileSnapshotAPIMethod(
      fileSnapshotLet,
      0,
      10,
      id,
      shared_drive,
      my_drive
    ).then((res) => {
      setFiles(res.data.files);
      setPermissions(res.data.permissions);
      permissionsLet = res.data.permissions;

      removeOwnerFromPermissions();
      removeOwnerFromInheritPermissions();

      console.log(res.data);
      console.log(res);
      console.log(permissions);
      console.log(permissionsLet);
      res.data.files.map((data) => {
        let inheritPermissionsLet = {};
        let directPermissionsLet = {};
        console.log(inheritPermissionsLet);
        for (var key in permissionsLet) {
          if (key === data.id) {
            inheritPermissionsLet = permissionsLet[key]["inherit_permissions"];
            directPermissionsLet = permissionsLet[key]["direct_permissions"];
          }
          console.log(permissionsLet[key]["inherit_permissions"]);
        }
        console.log(directPermissionsLet);
        // console.log(directPermissionsLet.pop());
        // console.log(inheritPermissionsLet.pop());
        fileRow.push({
          id: data.id,
          name: data.name,
          type: data.mimeType.split(".")[2],
          owner: data.owners[0].emailAddress,
          inheritPermissions: JSON.stringify(inheritPermissionsLet),
          directPermissions: JSON.stringify(directPermissionsLet),
          created:
            new Date(data.createdTime).toString().split(" ")[1] +
            " " +
            new Date(data.createdTime).toString().split(" ")[2] +
            ", " +
            new Date(data.createdTime).toString().split(" ")[3],
          modified:
            new Date(data.modifiedTime).toString().split(" ")[1] +
            " " +
            new Date(data.modifiedTime).toString().split(" ")[2] +
            ", " +
            new Date(data.modifiedTime).toString().split(" ")[3],
          size: data.size,
        });
      });
      setRows(fileRow);
      setColumns([
        {
          field: "name",
          headerName: "Name",
          width: 200,
          renderCell: (params) =>
            params.row.type === "folder" ? (
              <div
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  display: "flex",
                }}
                onClick={() =>
                  handleClickCell(
                    params.row.name,
                    params.row.type,
                    params.row.id
                  )
                }
              >
                <FolderIcon
                  color="disabled"
                  style={{ width: "20px", paddingRight: "5px" }}
                />
                {params.row.name}
              </div>
            ) : (
              <div>{params.row.name}</div>
            ),
        },
        {
          field: "type",
          headerName: "Type",
          width: 130,
          sortable: false,
        },
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
          renderCell: (params) => (
            <div style={{ width: "100%", overflowX: "auto" }}>
              {JSON.parse(params.row.inheritPermissions).map((data) => {
                return (
                  <Chip
                    avatar={<Avatar alt="Natacha" src={data.photoLink} />}
                    label={data.type === "anyone" ? "Anyone" : data.displayName}
                    variant="outlined"
                    key={data.id}
                  />
                );
              })}
            </div>
          ),
        },
        {
          field: "directPermission",
          headerName: "Direct Permission",
          width: 150,
          sortable: false,
          renderCell: (params) => (
            <div style={{ width: "100%", overflowX: "auto" }}>
              {JSON.parse(params.row.directPermissions).map((data) => {
                return (
                  <Chip
                    avatar={<Avatar alt="Natacha" src={data.photoLink} />}
                    label={data.type === "anyone" ? "Anyone" : data.displayName}
                    variant="outlined"
                    key={data.id}
                  />
                );
              })}
            </div>
          ),
        },
        {
          field: "sharingDifferences",
          headerName: "Sharing Difference",
          description:
            "The differences between the file’s permissions and the folder’s permissions.",
          sortable: false,
          width: 150,
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
          width: 100,
        },
      ]);
    });

    setSelectionModel([]); //reset selected checkbox in table
  };

  // take file snapshot
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

  //file Snapshot name
  const [fileSnapshotNames, setFileSnapshotNames] = useState([]);

  const [selectedEditFileSnapshotName, setSelectedEditFileSnapshotName] =
    useState("");

  //Alert Delete File Snapshot Name
  const [openDeleteFileSnapshotName, setOpenDeleteFileSnapshotName] =
    useState(false);

  const handleClickOpenDeleteFileSnapshotName = (name) => {
    setOpenDeleteFileSnapshotName(true);
    console.log(name);
    setSelectedEditFileSnapshotName(name);
  };

  const handleCloseDeleteFileSnapshotName = () => {
    setOpenDeleteFileSnapshotName(false);
  };

  const [editedFileSnapshotName, setEditedFileSnapshotName] = useState(false);
  const handleDeleteFileSnapshotName = () => {
    handleCloseDeleteFileSnapshotName();
    deleteFileSnapshotNamesAPIMethod(selectedEditFileSnapshotName).then(
      (res) => {
        console.log(res);
        setEditedFileSnapshotName(!editedFileSnapshotName);
      }
    );
  };

  //Edit file snapshot name
  const [openEditFileSnapshotName, setOpenFileSnapshotName] = useState(false);
  const [newFileSnapshotName, setNewFileSnapshotName] = useState("");

  const handleOpenEditFileSnapshotName = (name) => {
    setOpenFileSnapshotName(true);
    setSelectedEditFileSnapshotName(name);
  };

  const handleCloseEditFileSnapshotName = () => {
    setOpenFileSnapshotName(false);
  };

  const handleEditFileSnapshotName = () => {
    handleCloseEditFileSnapshotName();
    putFileSnapshotNamesAPIMethod(
      selectedEditFileSnapshotName,
      newFileSnapshotName
    ).then((res) => {
      console.log(res);
      setEditedFileSnapshotName(!editedFileSnapshotName);
    });
  };

  const handleChangeNewFileSnapshotName = (e) => {
    setNewFileSnapshotName(e.target.value);
  };

  //get file snapshot names
  useEffect(() => {
    console.log("get file names");
    getFileSnapshotNamesAPIMethod().then((data) => {
      console.log(data.body);
      setFileSnapshotNames(data.body.reverse());
      setCount(data.body.length + 1);
      setFileSnapshot(data.body[0].name);
      fileSnapshotLet = data.body[0].name;
      console.log(fileSnapshotNames);
    });
    console.log(fileSnapshotNames);
    console.log(files);
  }, [openTakingSnapshot, editedFileSnapshotName]);

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
            width: "70%",
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
        <Box style={{ width: "40%" }}>
          <FormControl sx={{ m: 1, width: "90%", margin: "0px" }} size="small">
            <InputLabel id="demo-select-small">File Snapshot</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={fileSnapshot}
              label="File Snapshot"
              onChange={handleChange}
            >
              {fileSnapshotNames.map((name) => (
                <MenuItem
                  key={name.name}
                  value={name.name}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>{name.name}</div>
                  {fileSnapshot !== name.name && (
                    <div>
                      <Box style={{ marginLeft: "20px", display: "block" }}>
                        <IconButton
                          size="small"
                          style={{ padding: "0px 5px 0px 0px" }}
                          onClick={() =>
                            handleOpenEditFileSnapshotName(name.name)
                          }
                        >
                          <EditIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          size="small"
                          style={{ padding: "0px" }}
                          onClick={() =>
                            handleClickOpenDeleteFileSnapshotName(name.name)
                          }
                        >
                          <DeleteOutlineIcon fontSize="inherit" />
                        </IconButton>
                      </Box>
                    </div>
                  )}
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
            onPageSizeChange={(newPageSize) => (
              setPageSize(newPageSize), setStartOffset(startOffset + pageSize)
            )}
            rowsPerPageOptions={[5, 10, 20, 30]}
            pagination
            checkboxSelection
            // onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
            selectionModel={selectionModel}
            disableSelectionOnClick
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
      <Dialog
        open={openDeleteFileSnapshotName}
        onClose={handleCloseDeleteFileSnapshotName}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure delete"} {selectedEditFileSnapshotName} {"?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDeleteFileSnapshotName}>Cancel</Button>
          <Button onClick={handleDeleteFileSnapshotName} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEditFileSnapshotName}
        onClose={handleCloseEditFileSnapshotName}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Edit File Snapshot Name"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="New File Snapshot Name"
            id="outlined-size-small"
            // defaultValue="Small"
            size="medium"
            style={{ width: "500px", margin: "5px" }}
            onChange={handleChangeNewFileSnapshotName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditFileSnapshotName}>Cancel</Button>
          <Button onClick={handleEditFileSnapshotName} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
