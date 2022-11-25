import React, { useState, useEffect } from "react";
import {
  Paper,
  IconButton,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Modal,
  Button,
  CircularProgress,
  DialogContent,
  TextField,
  Breadcrumbs,
  Link,
  // Avatar,
  Chip,
  DialogTitle,
  DialogActions,
  Dialog,
  Autocomplete,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import FolderIcon from "@mui/icons-material/Folder";
import HomeIcon from "@mui/icons-material/Home";
import { DataGrid } from "@mui/x-data-grid";
import {
  deleteFileSnapshotNamesDropboxAPIMethod,
  getFileSnapshotNamesDropboxAPIMethod,
  getFileSnapshotDropboxAPIMethod,
  postFileSnapshotDropboxAPIMethod,
  putFileSnapshotNamesDropboxAPIMethod,
  getSearchDropboxAPIMethod,
  getQueriesDropboxAPIMethod,
} from "../api/client";
import FilterModalDropbox from "./FilterModalDropbox";
import SharingDifferenceModalDropbox from "./SharingDifferenceModalDropbox";
import FileDetailModalDropbox from "./FileDetailModalDropbox";

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

const styleforSharingDifferenceModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "80%",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

// eslint-disable-next-line react/prop-types
const HomeDropbox = ({ searchInput, setSearchInput }) => {
  const [fileSnapshot, setFileSnapshot] = useState("");
  const [openSearchFilter, setOpenSearchFilter] = useState(false);
  const [openTakingSnapshot, setOpenTakingSnapshot] = useState(false);
  const [count, setCount] = useState(2);

  const [sharingDifferenceModal, setSharingDifferenceModal] = useState(false);

  const handleOpenSearchFilter = () => setOpenSearchFilter(true);
  const handleCloseSearchFilter = () => setOpenSearchFilter(false);

  const [
    selectedFileFolderSharingDifferences,
    setSelectedFileFolderSharingDifferences,
  ] = useState([]);
  const openSharingDifferenceModal = (rowData) => {
    setSelectedFileFolderSharingDifferences(rowData);
    setSharingDifferenceModal(true);
  };
  const closeSharingDifferenceModal = () => setSharingDifferenceModal(false);

  const [fileDetailModal, setFileDetailModal] = useState(false);
  const openFileDetailModal = () => setFileDetailModal(true);
  const closeFileDetailModal = () => setFileDetailModal(false);

  //set currently selected file snapshot
  let fileSnapshotLet = "";
  const handleChange = (event) => {
    setFileSnapshot(event.target.value);
    fileSnapshotLet = event.target.value;
    homeTable(fileSnapshotLet);
  };

  //set the table to the initial table
  const homeTable = (snapshot) => {
    setSearchInput("");
    setShowPath([]);
    getFileSnapshotDropboxAPIMethod(snapshot, 0, 1000).then((res) => {
      displayTable(res);
    });
  };

  //click search icon
  const handleClickSearchIcon = () => {
    // eslint-disable-next-line react/prop-types
    if (searchInput.includes("is:file_folder_diff")) {
      onClickFileFolderSharingDifferences();
    } else if (searchInput === "") {
      homeTable(fileSnapshot);
    } else {
      search();
    }
  };

  // search file-folder sharing differences
  const onClickFileFolderSharingDifferences = () => {
    let tempString =
      "is:file_folder_diff and file_ids:" + JSON.stringify(selectionModel);
    setSearchInput(tempString);
    setShowPath([]);
    //get files from searching is:file_folder_diff
    getSearchDropboxAPIMethod(fileSnapshot, tempString).then((res) => {
      //get query logs
      getQueriesDropboxAPIMethod().then((res) => {
        setQueryLogs(res.body.reverse());
      });

      let fileRow = [];
      let ownerLet = [];
      let commenterLet = [];
      let writerLet = [];
      let permissionsLet2 = [];
      let inheritPermissionsLet = [];
      let directPermissionsLet = [];

      for (var key1 in res.data["permissions"]) {
        permissionsLet2.push(res.data["permissions"][key1]);
      }
      for (var key in permissionsLet2) {
        for (var key2 in permissionsLet2[key]["direct_permissions"]) {
          let role = permissionsLet2[key]["direct_permissions"][key2]["role"];
          if (role === "owner") {
            ownerLet.push(permissionsLet2[key]["direct_permissions"][key2]);
          } else if (role === "commenter") {
            commenterLet.push(permissionsLet2[key]["direct_permissions"][key2]);
            directPermissionsLet.push(
              permissionsLet2[key]["direct_permissions"][key2]
            );
          } else if (role === "writer") {
            writerLet.push(permissionsLet2[key]["direct_permissions"][key2]);
            directPermissionsLet.push(
              permissionsLet2[key]["direct_permissions"][key2]
            );
          }
        }
        for (var key3 in permissionsLet2[key]["inherit_permissions"]) {
          let role = permissionsLet2[key]["inherit_permissions"][key3]["role"];
          if (role === "owner") {
            ownerLet.push(permissionsLet2[key]["inherit_permissions"][key3]);
          } else if (role === "commenter") {
            commenterLet.push(
              permissionsLet2[key]["inherit_permissions"][key3]
            );
            inheritPermissionsLet.push(
              permissionsLet2[key]["inherit_permissions"][key3]
            );
          } else if (role === "writer") {
            writerLet.push(permissionsLet2[key]["inherit_permissions"][key3]);
            inheritPermissionsLet.push(
              permissionsLet2[key]["inherit_permissions"][key3]
            );
          }
        }
      }

      // organize roles and permissions for each file
      res.data.files.map((data) => {
        let owner = [];
        let writer = [];
        let commenter = [];
        let directPermissionF = [];
        let inheritPermissionF = [];

        for (var key11 in ownerLet) {
          if (ownerLet[key11]["file_id"] === data.id) {
            console.log("HELLO");
            console.log(ownerLet[key11]["emailAddress"]);
            owner.push(ownerLet[key11]["emailAddress"]);
          }
        }
        for (var key22 in commenterLet) {
          if (commenterLet[key22]["file_id"] === data.id) {
            commenter.push(commenterLet[key22]["emailAddress"]);
          }
        }
        for (var key33 in writerLet) {
          if (writerLet[key33]["file_id"] === data.id) {
            writer.push(writerLet[key33]["emailAddress"]);
          }
        }

        for (var key44 in directPermissionsLet) {
          if (directPermissionsLet[key44]["file_id"] === data.id) {
            directPermissionF.push(directPermissionsLet[key44]["emailAddress"]);
          }
        }

        for (var key55 in inheritPermissionsLet) {
          if (inheritPermissionsLet[key55]["file_id"] === data.id) {
            inheritPermissionF.push(
              inheritPermissionsLet[key55]["emailAddress"]
            );
          }
        }

        console.log(owner);
        console.log(commenter);
        console.log(writer);

        fileRow.push({
          id: data.id,
          name: data.name,
          type: data.mimeType,
          owner: owner,
          inheritPermissions: JSON.stringify(inheritPermissionF),
          directPermissions: JSON.stringify(directPermissionF),
          modified:
            data.modifiedTime === null
              ? ""
              : new Date(data.modifiedTime).toString().split(" ")[1] +
                " " +
                new Date(data.modifiedTime).toString().split(" ")[2] +
                ", " +
                new Date(data.modifiedTime).toString().split(" ")[3],

          size: data.size === 0 ? "" : data.size,
          writer: writer,
          commenter: commenter,
          path: data.path + "/" + data.name,
        });
      });
      setRows(fileRow);
      setColumns([
        {
          field: "name",
          headerName: "Name",
          width: 200,
          description: "File/folder name",
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
                    params.row.id,
                    params.row.path
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
          field: "owner",
          headerName: "Owner",
          width: 130,
          sortable: false,
          description: "File/folder owner",
          renderCell: (params) => (
            <div style={{ width: "100%", overflowX: "auto" }}>
              {params.row.owner !== undefined && (
                <Chip
                  label={params.row.owner}
                  variant="outlined"
                  key={params.row.id}
                />
              )}
            </div>
          ),
        },
        {
          field: "inheritPermissions",
          headerName: "Inherit Permission",
          width: 150,
          sortable: false,
          description:
            "Permissions inherited from parent folder. !Warning: some permissions listed only as inherited might also be directly assigned",
          renderCell: (params) => (
            <div style={{ width: "100%", overflowX: "auto" }}>
              {JSON.parse(params.row.inheritPermissions).map((data, index) => {
                return <Chip label={data} variant="outlined" key={index} />;
              })}
            </div>
          ),
        },
        {
          field: "directPermission",
          headerName: "Direct Permission",
          width: 150,
          sortable: false,
          description: "Permissions given directly",
          renderCell: (params) => (
            <div style={{ width: "100%", overflowX: "auto" }}>
              {JSON.parse(params.row.directPermissions).map((data, index) => {
                return <Chip label={data} variant="outlined" key={index} />;
              })}
            </div>
          ),
        },
        {
          field: "modified",
          headerName: "Modified",
          description: "Modified date",
          width: 120,
        },
        {
          field: "size",
          headerName: "Size",
          description: "File size (bytes)",
          width: 100,
        },
      ]);
    });
    setSelectionModel([]); //reset selected checkbox in table
  };

  //search
  const [searchAlertMessage, setSearchAlertMessage] = useState("");
  const search = () => {
    getSearchDropboxAPIMethod(fileSnapshot, searchInput)
      .then((res) => {
        //get query logs
        getQueriesDropboxAPIMethod().then((res) => {
          setQueryLogs(res.body.reverse());
        });
        console.log("get search: ", res);
        displayTable(res);
      })
      .catch((err) => {
        setAlertSearch(true);
        setSearchAlertMessage(err.response.data);
      });
  };

  //search when pressing enter key
  const onKeyPressEnter = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (event.target.value.includes("is:file_folder_diff")) {
        console.log("search: ", event.target.value);
        onClickFileFolderSharingDifferences();
      } else if (event.target.value === "") {
        homeTable(fileSnapshot);
      } else {
        search();
      }
    }
  };

  //search alert
  const [alertSearch, setAlertSearch] = useState(false);
  const closeAlertSearch = () => {
    setAlertSearch(false);
  };

  //Initial Table
  const [pageSize, setPageSize] = useState(10);
  const [columns, setColumns] = useState([]);

  const [rows, setRows] = useState([]);

  //Table checkbox selected
  const [selectionModel, setSelectionModel] = useState([]); //added line
  const [startOffset, setStartOffset] = useState(0);

  //get violations
  const getViolation = (permissions) => {
    let violationListTemp = [];
    for (var key in permissions) {
      for (var key2 in permissions[key]["direct_permissions"]) {
        if (
          permissions[key]["direct_permissions"][key2]["violation"] === true
        ) {
          if (
            permissions[key]["direct_permissions"][key2]["emailAddress"] ===
            null
          ) {
            if (
              permissions[key]["direct_permissions"][key2]["domain"] === null
            ) {
              violationListTemp.push({
                email_address: "anyone",
                violationType:
                  permissions[key]["direct_permissions"][key2][
                    "violation_type"
                  ],
                file_id:
                  permissions[key]["direct_permissions"][key2]["file_id"],
              });
            } else {
              violationListTemp.push({
                email_address:
                  permissions[key]["direct_permissions"][key2]["domain"],
                violationType:
                  permissions[key]["direct_permissions"][key2][
                    "violation_type"
                  ],
                file_id:
                  permissions[key]["direct_permissions"][key2]["file_id"],
              });
            }
          } else {
            violationListTemp.push({
              email_address:
                permissions[key]["direct_permissions"][key2]["emailAddress"],
              violationType:
                permissions[key]["direct_permissions"][key2]["violation_type"],
              file_id: permissions[key]["direct_permissions"][key2]["file_id"],
            });
          }
        }
      }
    }
    for (var key3 in permissions) {
      for (var key4 in permissions[key3]["inherit_permissions"]) {
        if (
          permissions[key3]["inherit_permissions"][key4]["violation"] === true
        ) {
          if (
            permissions[key3]["inherit_permissions"][key4]["emailAddress"] ===
            null
          ) {
            if (
              permissions[key3]["inherit_permissions"][key4]["domain"] === null
            ) {
              violationListTemp.push({
                email_address: "anyone",
                violationType:
                  permissions[key3]["inherit_permissions"][key4][
                    "violation_type"
                  ],
                file_id:
                  permissions[key]["inherit_permissions"][key2]["file_id"],
              });
            } else {
              violationListTemp.push({
                email_address:
                  permissions[key3]["inherit_permissions"][key4]["domain"],
                violationType:
                  permissions[key3]["inherit_permissions"][key4][
                    "violation_type"
                  ],
                file_id:
                  permissions[key]["inherit_permissions"][key2]["file_id"],
              });
            }
          } else {
            violationListTemp.push({
              email_address:
                permissions[key3]["inherit_permissions"][key2]["emailAddress"],
              violationType:
                permissions[key3]["inherit_permissions"][key2][
                  "violation_type"
                ],
              file_id: permissions[key]["inherit_permissions"][key2]["file_id"],
            });
          }
        }
      }
    }
    return violationListTemp;
  };

  //variables to contain path
  let currentPath = [];
  const [showPath, setShowPath] = useState([]);

  //display table
  const displayTable = (res) => {
    let fileRow = [];
    let ownerLet = [];
    let commenterLet = [];
    let writerLet = [];
    let permissionsLet2 = [];
    let inheritPermissionsLet = [];
    let directPermissionsLet = [];

    for (var key1 in res.data["permissions"]) {
      permissionsLet2.push(res.data["permissions"][key1]);
    }

    for (var key in permissionsLet2) {
      for (var key2 in permissionsLet2[key]["direct_permissions"]) {
        let role = permissionsLet2[key]["direct_permissions"][key2]["role"];
        if (role === "owner") {
          ownerLet.push(permissionsLet2[key]["direct_permissions"][key2]);
        } else if (role === "commenter") {
          commenterLet.push(permissionsLet2[key]["direct_permissions"][key2]);
          directPermissionsLet.push(
            permissionsLet2[key]["direct_permissions"][key2]
          );
        } else if (role === "writer") {
          writerLet.push(permissionsLet2[key]["direct_permissions"][key2]);
          directPermissionsLet.push(
            permissionsLet2[key]["direct_permissions"][key2]
          );
        }
      }
      for (var key3 in permissionsLet2[key]["inherit_permissions"]) {
        let role = permissionsLet2[key]["inherit_permissions"][key3]["role"];
        if (role === "owner") {
          ownerLet.push(permissionsLet2[key]["inherit_permissions"][key3]);
        } else if (role === "commenter") {
          commenterLet.push(permissionsLet2[key]["inherit_permissions"][key3]);
          inheritPermissionsLet.push(
            permissionsLet2[key]["inherit_permissions"][key3]
          );
        } else if (role === "writer") {
          writerLet.push(permissionsLet2[key]["inherit_permissions"][key3]);
          inheritPermissionsLet.push(
            permissionsLet2[key]["inherit_permissions"][key3]
          );
        }
      }
    }

    let violationAll = getViolation(permissionsLet2);

    res.data.files.map((data) => {
      let owner = [];
      let writer = [];
      let commenter = [];
      let directPermissionF = [];
      let inheritPermissionF = [];

      for (var key11 in ownerLet) {
        if (ownerLet[key11]["file_id"] === data.id) {
          owner.push(ownerLet[key11]["emailAddress"]);
        }
      }
      for (var key22 in commenterLet) {
        if (commenterLet[key22]["file_id"] === data.id) {
          commenter.push(commenterLet[key22]["emailAddress"]);
        }
      }
      for (var key33 in writerLet) {
        if (writerLet[key33]["file_id"] === data.id) {
          writer.push(writerLet[key33]["emailAddress"]);
        }
      }

      for (var key44 in directPermissionsLet) {
        if (directPermissionsLet[key44]["file_id"] === data.id) {
          directPermissionF.push(directPermissionsLet[key44]["emailAddress"]);
        }
      }

      for (var key55 in inheritPermissionsLet) {
        if (inheritPermissionsLet[key55]["file_id"] === data.id) {
          inheritPermissionF.push(inheritPermissionsLet[key55]["emailAddress"]);
        }
      }

      fileRow.push({
        id: data.id,
        name: data.name,
        type: data.mimeType,
        owner: owner,
        inheritPermissions: JSON.stringify(inheritPermissionF),
        directPermissions: JSON.stringify(directPermissionF),
        modified:
          data.modifiedTime === null
            ? ""
            : new Date(data.modifiedTime).toString().split(" ")[1] +
              " " +
              new Date(data.modifiedTime).toString().split(" ")[2] +
              ", " +
              new Date(data.modifiedTime).toString().split(" ")[3],

        size: data.size === 0 ? "" : data.size,
        writer: writer,
        commenter: commenter,
        path: data.path + "/" + data.name,
        validation: violationAll,
      });
    });
    setRows(fileRow);
    setColumns([
      {
        field: "name",
        headerName: "Name",
        width: 200,
        description: "File/folder name",
        renderCell: (params) =>
          params.row.type === "folder" ? (
            <div
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                display: "flex",
              }}
              onClick={() =>
                handleClickCell(params.row.name, params.row.id, params.row.path)
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
        field: "owner",
        headerName: "Owner",
        width: 130,
        sortable: false,
        description: "File/folder owner",
        renderCell: (params) => (
          <div style={{ width: "100%", overflowX: "auto" }}>
            {params.row.owner !== undefined && (
              <Chip
                label={params.row.owner}
                variant="outlined"
                key={params.row.id}
              />
            )}
          </div>
        ),
      },
      {
        field: "inheritPermissions",
        headerName: "Inherit Permission",
        width: 150,
        sortable: false,
        description:
          "Permissions inherited from parent folder. !Warning: some permissions listed only as inherited might also be directly assigned",
        renderCell: (params) => (
          <div style={{ width: "100%", overflowX: "auto" }}>
            {JSON.parse(params.row.inheritPermissions).map((data, index) => {
              return <Chip label={data} variant="outlined" key={index} />;
            })}
          </div>
        ),
      },
      {
        field: "directPermission",
        headerName: "Direct Permission",
        width: 150,
        sortable: false,
        description: "Permissions given directly",
        renderCell: (params) => (
          <div style={{ width: "100%", overflowX: "auto" }}>
            {JSON.parse(params.row.directPermissions).map((data, index) => {
              return <Chip label={data} variant="outlined" key={index} />;
            })}
          </div>
        ),
      },
      {
        field: "modified",
        headerName: "Modified",
        description: "Modified date",
        width: 120,
      },
      {
        field: "size",
        headerName: "Size",
        description: "File size (bytes)",
        width: 100,
      },
    ]);
  };

  //onClick folder name in table. Change table when clicking the folder names.
  const handleClickCell = (name, id, path) => {
    //add path for selected folder
    currentPath.push({ name: name, id: id, path: path });
    setShowPath(currentPath);

    //get file snapshot files
    getFileSnapshotDropboxAPIMethod(
      fileSnapshotLet ? fileSnapshotLet : fileSnapshot,
      0,
      10000,
      path
    ).then((res) => {
      console.log("get files: ", res);
      displayTable(res);
    });

    setSelectionModel([]); //reset selected checkbox in table
  };

  // take a file snapshot
  const takingSnapshot = () => {
    setOpenTakingSnapshot(true);
    postFileSnapshotDropboxAPIMethod("File Snapshot " + count).then((data) => {
      console.log("take file snapshot", data);
      if (data.status === 201) {
        setOpenTakingSnapshot(false);
      }
    });
  };

  //close taking snapshot action modal
  const takingSnapshotClose = () => {
    setOpenTakingSnapshot(false);
  };

  //click open path breadcrumb
  function handleClickOpenBreadcrumb(event) {
    event.preventDefault();
  }

  //change table when clicking the path
  const handleClickPath = (data) => {
    for (let i = 0; i < showPath.length; i++) {
      if (showPath[i]["name"] === data.name) {
        break;
      }
      currentPath.push(showPath[i]);
    }
    setShowPath(currentPath);
    handleClickCell(data.name, data.id, data.path);
  };

  //file Snapshot name
  const [fileSnapshotNames, setFileSnapshotNames] = useState([]);

  //selected file snapshot name to edit
  const [selectedEditFileSnapshotName, setSelectedEditFileSnapshotName] =
    useState("");

  //Alert Delete File Snapshot Name
  const [openDeleteFileSnapshotName, setOpenDeleteFileSnapshotName] =
    useState(false);

  //handle deleting file snapshot name
  const handleClickOpenDeleteFileSnapshotName = (name) => {
    setOpenDeleteFileSnapshotName(true);
    setSelectedEditFileSnapshotName(name);
  };

  const handleCloseDeleteFileSnapshotName = () => {
    setOpenDeleteFileSnapshotName(false);
  };

  const [editedFileSnapshotName, setEditedFileSnapshotName] = useState(false);
  const handleDeleteFileSnapshotName = () => {
    handleCloseDeleteFileSnapshotName();
    deleteFileSnapshotNamesDropboxAPIMethod(selectedEditFileSnapshotName).then(
      (res) => {
        console.log("deleted file snapshot name", res);
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
    putFileSnapshotNamesDropboxAPIMethod(
      selectedEditFileSnapshotName,
      newFileSnapshotName
    ).then((res) => {
      console.log("edited file snapshot name", res);
      setEditedFileSnapshotName(!editedFileSnapshotName);
    });
  };

  const handleChangeNewFileSnapshotName = (e) => {
    setNewFileSnapshotName(e.target.value);
  };

  //show detail information for each files when double clicked
  const [eachFileDetailData, setEachFileDetailData] = useState();
  const handleDoubleClickRow = (data) => {
    console.log("double click row: ", data);
    setEachFileDetailData(data);
    openFileDetailModal();
  };

  //store data of query logs
  const [queryLogs, setQueryLogs] = useState([]);
  useEffect(() => {
    getFileSnapshotNamesDropboxAPIMethod().then((res) => {
      console.log("get file snapshot names: ", res.body);
      setFileSnapshotNames(res.body.reverse());
      setCount(res.body.length + 1);
      setFileSnapshot(res.body[0].name);
      fileSnapshotLet = res.body[0].name;

      homeTable(res.body[0].name);
    });
  }, [openTakingSnapshot, editedFileSnapshotName]);

  useEffect(() => {
    //get query logs
    getQueriesDropboxAPIMethod().then((res) => {
      setQueryLogs(res.body.reverse());
      console.log("get queries: ", res);
    });
  }, [openTakingSnapshot, editedFileSnapshotName]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "40px",
          width: "100%",
        }}
      >
        {/*Search*/}
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
            <SearchIcon onClick={handleClickSearchIcon} />
          </IconButton>
          <Autocomplete
            id="filter-demo"
            options={queryLogs}
            getOptionLabel={(option) =>
              option.query ? option.query : searchInput
            }
            style={{ width: "100%" }}
            freeSolo
            onInputChange={(event, value) => {
              setSearchInput(value);
            }}
            inputValue={searchInput}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="ex) readable: webyte@gmail.com"
                variant="standard"
                onKeyDown={onKeyPressEnter}
              />
            )}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="tune"
            onClick={handleOpenSearchFilter}
          >
            <TuneIcon />
          </IconButton>
          {/*Modal for search filter*/}
          <Modal
            open={openSearchFilter}
            onClose={handleCloseSearchFilter}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <FilterModalDropbox
                handleCloseSearchFilter={handleCloseSearchFilter}
                setSearchInput={setSearchInput}
                fileSnapshot={fileSnapshot}
              ></FilterModalDropbox>
            </Box>
          </Modal>
        </Paper>
        <div style={{ width: "3%" }}></div>
        <Box style={{ width: "40%" }}>
          {/*select file snapshot names from the dropdown*/}
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
        {/*icon for taking a new file snapshot*/}
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
      {alertSearch && (
        <Alert
          onClose={closeAlertSearch}
          severity="error"
          style={{ marginTop: "5px" }}
        >
          {searchAlertMessage}
        </Alert>
      )}
      <div
        style={{
          marginTop: "10px",
          marginLeft: "5px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/*show current file paths*/}
        <div role="presentation" onClick={handleClickOpenBreadcrumb}>
          <Breadcrumbs maxItems={2} aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="#">
              <HomeIcon
                style={{ paddingTop: "5px" }}
                onClick={() => homeTable(fileSnapshot)}
              />
            </Link>
            {showPath.map((data) => {
              return (
                <div
                  key={data}
                  onClick={() => handleClickPath(data)}
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  {data.name}
                </div>
              );
            })}
          </Breadcrumbs>
        </div>
        {/*modal to show file-folder sharing differences*/}
        <Modal
          open={sharingDifferenceModal}
          onClose={closeSharingDifferenceModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleforSharingDifferenceModal}>
            <SharingDifferenceModalDropbox
              closeSharingDifferenceModal={closeSharingDifferenceModal}
              selectedFileFolderSharingDifferences={
                selectedFileFolderSharingDifferences
              }
              fileSnapshot={fileSnapshot}
            ></SharingDifferenceModalDropbox>
          </Box>
        </Modal>

        <div>
          {/*button to find file-folder sharing differences*/}
          <Button
            variant="contained"
            size="small"
            onClick={onClickFileFolderSharingDifferences}
            style={{ marginRight: "20px" }}
          >
            File-Folder Sharing Differences
          </Button>
        </div>
      </div>
      <div style={{ height: "100%", marginTop: "10px" }}>
        <div style={{ height: 630, width: "100%" }}>
          {/*data table for files/folder*/}
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
            onCellDoubleClick={(params, event) => {
              event.defaultMuiPrevented = true;
              searchInput === "is:file_folder_diff"
                ? openSharingDifferenceModal(params.row)
                : handleDoubleClickRow(params.row);
            }}
          />
        </div>
      </div>
      {/*modal to show progress of taking a snapshot*/}
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
      {/*alert of deleting a file snapshot name*/}
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
      {/*alert to show editing a file snapshot name*/}
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
      {/*modal to see details of the selected file*/}
      <Modal
        open={fileDetailModal}
        onClose={closeFileDetailModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleforSharingDifferenceModal} style={{ overflowY: "auto" }}>
          <FileDetailModalDropbox eachFileDetailData={eachFileDetailData} />
        </Box>
      </Modal>
    </div>
  );
};

export default HomeDropbox;
