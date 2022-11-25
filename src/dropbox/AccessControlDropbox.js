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
import {
  deleteAccessControlDropboxAPIMethod,
  getAccessControlDropboxAPIMethod,
} from "../api/client";
import AccessControlPolicyDropbox from "./AccessControlPolicyDropbox";
import AccessControlDetailModalDropbox from "./AccessControlDetailModalDropbox";

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
// eslint-disable-next-line react/prop-types
const AccessControlDropbox = ({ setTab, setSearchInput }) => {
  //open and close modal for creating access control
  const [openCreateAccessControlModal, setOpenCreateAccessControlModal] =
    useState(false);
  const handleOpenCreateAccessControlModal = () =>
    setOpenCreateAccessControlModal(true);
  const handleCloseCreateAccessControlModal = () =>
    setOpenCreateAccessControlModal(false);

  //open and close modal for access control details
  const [detailModal, setDetailModal] = useState(false);
  const openDetailModal = () => setDetailModal(true);
  const closeDetailModal = () => setDetailModal(false);

  //show detail information when double-clicked
  const [eachDetailData, setEachDetailData] = useState();
  const handleDoubleClickRow = (data) => {
    console.log("double click row: ", data);
    setEachDetailData(data);
    openDetailModal();
  };

  //select from the table
  const [selectionModel, setSelectionModel] = useState([]);

  //click use
  const handleClickUse = (params) => {
    console.log("ACR use: ", params.row);
    setTab("home");
    setSearchInput("accessControl:" + params.row.name);
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
      field: "Grp",
      headerName: "Group",
      width: 120,
    },
    {
      field: "AR",
      headerName: "Allowed Readers",
      width: 150,
      renderCell: (params) => (
        <div style={{ width: "100%", overflowX: "auto" }}>
          {params.row.AR.map((data) => {
            return <Chip label={data} variant="outlined" key={data} />;
          })}
        </div>
      ),
    },
    {
      field: "AW",
      headerName: "Allowed Writers",
      width: 150,
      renderCell: (params) => (
        <div style={{ width: "100%", overflowX: "auto" }}>
          {params.row.AW.map((data) => {
            return <Chip label={data} variant="outlined" key={data} />;
          })}
        </div>
      ),
    },
    {
      field: "DR",
      headerName: "Denied Readers",
      width: 150,
      renderCell: (params) => (
        <div style={{ width: "100%", overflowX: "auto" }}>
          {params.row.DR.map((data) => {
            return <Chip label={data} variant="outlined" key={data} />;
          })}
        </div>
      ),
    },
    {
      field: "DW",
      headerName: "Denied Writers",
      width: 150,
      renderCell: (params) => (
        <div style={{ width: "100%", overflowX: "auto" }}>
          {params.row.DW.map((data) => {
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
  const [rows, setRows] = useState([]);

  //search
  const [search, setSearch] = useState("");
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  //click search icon
  const handleClickSearchIcon = () => {
    getAccessControlDropboxAPIMethod().then((res) => {
      let filtered,
        tempRows = [];
      filtered = res.body.filter((row) =>
        row.name.toLowerCase().includes(search.toLowerCase())
      );
      filtered.map((data, index) => {
        tempRows.push({
          id: index,
          name: data.name,
          query: data.query,
          Grp: data.Grp,
          AR: data.AR,
          AW: data.AW,
          DR: data.DR,
          DW: data.DW,
        });
      });
      setRows(tempRows);
    });
  };

  //search when pressing enter key
  const onKeyPressEnter = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleClickSearchIcon();
    }
  };

  //delete access control
  const handleClickDeleteAccessControlModal = () => {
    deleteAccessControlDropboxAPIMethod(selectionModel[0]).then((data) => {
      console.log("delete access control: ", data);
      //get access control requirements
      getAccessControlDropboxAPIMethod().then((res) => {
        let tempRows = [];
        res.body.map((data) => {
          tempRows.push({
            id: data.name,
            name: data.name,
            query: data.query,
            Grp: data.Grp,
            AR: data.AR,
            AW: data.AW,
            DR: data.DR,
            DW: data.DW,
          });
        });
        setRows(tempRows);
      });
    });
  };

  useEffect(() => {
    //get access control requirements
    getAccessControlDropboxAPIMethod().then((res) => {
      console.log("get access control: ", res);
      let tempRows = [];
      res.body.map((data, index) => {
        tempRows.push({
          id: index,
          name: data.name,
          query: data.query,
          Grp: data.Grp,
          AR: data.AR,
          AW: data.AW,
          DR: data.DR,
          DW: data.DW,
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
            <SearchIcon onClick={handleClickSearchIcon} />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search by name. ex) Access Control #1"
            inputProps={{ "aria-label": "search google maps" }}
            onChange={handleChangeSearch}
            onKeyDown={onKeyPressEnter}
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
            onClick={handleClickDeleteAccessControlModal}
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
          onSelectionModelChange={(selection) => {
            if (selection.length > 1) {
              const selectionSet = new Set(selectionModel);
              const result = selection.filter((s) => !selectionSet.has(s));

              setSelectionModel(result);
            } else {
              setSelectionModel(selection);
            }
          }}
          selectionModel={selectionModel}
          disableSelectionOnClick
          onCellDoubleClick={(params, event) => {
            event.defaultMuiPrevented = true;
            handleDoubleClickRow(params.row);
          }}
        />
      </Box>
      {/*modal for creating access control*/}
      <Modal
        open={openCreateAccessControlModal}
        onClose={handleCloseCreateAccessControlModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AccessControlPolicyDropbox
            handleCloseCreateAccessControlModal={
              handleCloseCreateAccessControlModal
            }
          ></AccessControlPolicyDropbox>
        </Box>
      </Modal>
      {/*modal for access control detail*/}
      <Modal
        open={detailModal}
        onClose={closeDetailModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ overflowY: "auto" }}>
          <AccessControlDetailModalDropbox eachDetailData={eachDetailData} />
        </Box>
      </Modal>
    </div>
  );
};

export default AccessControlDropbox;
