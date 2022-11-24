import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";

import {
  getCompareSnapshotsAPIMethod,
  getFileSnapshotNamesAPIMethod,
} from "../api/client";
import { DataGrid } from "@mui/x-data-grid";

//This is the comparing snapshots tab from the Homepage.
const CompareSnapshotsDropbox = () => {
  const [baseFileFirst, setBaseFileFirst] = useState([]);

  const [baseFileSnapshot, setBaseFileSnapshot] = useState("");
  const [compareFileSnapshot, setCompareFileSnapshot] = useState("");

  const [compareButton, setCompareButton] = useState(false);
  const [openCompareBox, setOpenCompareBox] = useState(false);

  const handleChangeFirst = (event) => {
    setBaseFileSnapshot(event.target.value);
  };

  const handleChangeSecond = (event) => {
    setCompareFileSnapshot(event.target.value);
  };

  const [selectedIndex, setSelectedIndex] = useState(1);

  const [path, setPath] = useState([]);
  const [fileName, setFileName] = useState("");
  let pathLet = [];
  let pathLetWithName = "";
  let differentPermissions = [];

  //When the user chooses the snapshots to compare, then click the compare button.
  //Then, we will request the "getCompareSnapshotsAPIMethod" with two snapshots.
  //After the action, we can get data from the backend, and we will show each path that has a difference with two snapshots.
  const clickCompareButton = () => {
    setCompareButton(true);
    getCompareSnapshotsAPIMethod(baseFileSnapshot, compareFileSnapshot).then(
      (res) => {
        res.data.map((res) => {
          pathLetWithName =
            res.path + "/" + res.name + "." + res.mimeType.split(".")[2];
          pathLet.push(pathLetWithName);
          setPath(pathLet);

          setFileName(res.name);
          console.log(fileName);
        });
      }
    );
  };

  //By clicking the path, the user can check what difference between two snapshots in the path.
  //It shows a list of people with different permissions and shows how it was changed.
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpenCompareBox(true);
    getCompareSnapshotsAPIMethod(baseFileSnapshot, compareFileSnapshot).then(
      (res) => {
        console.log(res);
        console.log(res.data[0]);
        res.data[index]["additional_base_file_snapshot_permissions"].map(
          (data) => {
            differentPermissions.push({
              id: data["id"],
              name: data["emailAddress"],
              baseSnapshotPermission: data["role"],
              compareSnapshotPermission: "X",
            });
          }
        );
        res.data[index]["additional_compare_file_snapshot_permissions"].map(
          (data) => {
            differentPermissions.push({
              id: data["id"],
              name: data["emailAddress"],
              baseSnapshotPermission: "X",
              compareSnapshotPermission: data["role"],
            });
          }
        );
        res.data[index]["changed_permissions"].map((data) => {
          differentPermissions.push({
            id: data["from"]["id"],
            name: data["from"]["emailAddress"],
            baseSnapshotPermission: data["from"]["role"],
            compareSnapshotPermission: data["to"]["role"],
          });
        });
        setRows(differentPermissions);
      }
    );
  };

  const [rows, setRows] = useState([
    {
      id: 1,
    },
  ]);

  const columns = [
    { field: "name", headerName: "Name", width: 320 },
    {
      field: "baseSnapshotPermission",
      headerName: "Base Snapshot Permission",
      width: 365,
    },
    {
      field: "compareSnapshotPermission",
      headerName: "Compare Snapshot Permission",
      width: 365,
    },
  ];

  //This is the set-up for the list of snapshots.
  useEffect(() => {
    getFileSnapshotNamesAPIMethod().then((data) => {
      console.log("get file snapshot names: ", data.body);
      setBaseFileFirst(data.body.reverse());
    });
  }, []);

  return (
    <div>
      <div className="select" style={{ display: "flex" }}>
        <Box sx={{ minWidth: 250 }}>
          <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
            <InputLabel id="baseFileSelect">Base File Snapshot</InputLabel>
            <Select
              labelId="BaseFileSnapshotLabelId"
              id="BaseFileSnapshot"
              label="Base File Snapshot"
              onChange={handleChangeFirst}
            >
              {baseFileFirst.map((data) => (
                <MenuItem
                  key={data.name}
                  value={data.name}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>{data.name}</div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <img
          src="/img/arrow.png"
          style={{ width: "40px", height: "23px", marginTop: "16px" }}
        />
        <Box sx={{ minWidth: 250 }}>
          <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
            <InputLabel id="baseFileSelect">Compare File Snapshot</InputLabel>
            <Select
              labelId="CompareFileSnapshotLabelId"
              id="CompareFileSnapshot"
              label="Compare File Snapshot"
              onChange={handleChangeSecond}
            >
              {baseFileFirst.map((data) => (
                <MenuItem
                  key={data.name}
                  value={data.name}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>{data.name}</div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button
          variant="contained"
          size="small"
          style={{ height: "35px", marginTop: "10px", marginLeft: "10px" }}
          onClick={clickCompareButton}
        >
          COMPARE
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {compareButton ? (
          <div style={{ marginRight: "20px" }}>
            <Box
              sx={{
                width: "270px",
                bgcolor: "background.paper",
                // paddingTop: "15px",
              }}
            >
              <List component="nav" aria-label="secondary mailbox folder">
                <Divider />
                {path.map((data, index) => (
                  <ListItemButton
                    key={data}
                    selected={selectedIndex === index}
                    onClick={(event) => handleListItemClick(event, index)}
                    style={{ overflowWrap: "break-word" }}
                  >
                    <ListItemText primary={data} />
                  </ListItemButton>
                ))}
              </List>
            </Box>
          </div>
        ) : null}
        {openCompareBox ? (
          <>
            {" "}
            <div style={{ height: 550, width: "100%", marginTop: "10px" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CompareSnapshotsDropbox;
