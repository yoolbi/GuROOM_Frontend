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
import TextField from "@mui/material/TextField";
import { Button, InputAdornment } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  getCompareSnapshotsAPIMethod,
  getFileSnapshotNamesAPIMethod,
} from "../api/client";

const theme = createTheme({
  palette: {
    fail: {
      main: "#ef9a9a",
      contrastText: "#000",
    },
    success: {
      main: "#81c784",
      contrastText: "#000",
    },
    basic: {
      main: "#eeeeee",
      contrastText: "#000",
    },
    failText: {
      main: "#ff6e40",
    },
    successText: {
      main: "#81c784",
    },
  },
});

// const CompareList = () => {
//   return (
//
//   );
// };

const CompareSnapshots = () => {
  const [baseFileFirst, setBaseFileFirst] = useState([]);
  // const [baseFileSecond, setBaseFileSecond] = useState([]);

  const [baseFileSnapshot, setBaseFileSnapshot] = useState("");
  const [compareFileSnapshot, setCompareFileSnapshot] = useState("");

  const [compareButton, setCompareButton] = useState(false);
  const [openCompareBox, setOpenCompareBox] = useState(false);

  // const [count, setCount] = useState(0);

  const handleChangeFirst = (event) => {
    setBaseFileSnapshot(event.target.value);
  };

  const handleChangeSecond = (event) => {
    setCompareFileSnapshot(event.target.value);
  };

  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpenCompareBox(true);
  };

  const [path, setPath] = useState([]);
  const [fileName, setFileName] = useState("");
  let pathLet = [];
  const clickCompareButton = () => {
    setCompareButton(true);
    getCompareSnapshotsAPIMethod(baseFileSnapshot, compareFileSnapshot).then(
      (res) => {
        res.data.map((data) => {
          console.log(data);
          console.log(data.name);
          console.log(data["additional_base_file_snapshot_permissions"]);
          console.log(data["additional_compare_file_snapshot_permissions"]);

          pathLet.push(data.path);
          setPath(pathLet);

          setFileName(data.name);
        });
      }
    );
  };

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
          <div>
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
            <div
              style={{
                display: "grid",
                width: "45%",
                marginLeft: "20px",
                marginTop: "20px",
              }}
            >
              <TextField
                id="outlined-multiline-flexible"
                label="File Name"
                multiline
                maxRows={4}
                value={fileName}
                InputProps={{
                  readOnly: true,
                }}
                style={{ marginBottom: "15px", width: "95%" }}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Owner"
                multiline
                maxRows={4}
                value=""
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Stack direction="row" spacing={1}>
                        <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />
                      </Stack>
                    </InputAdornment>
                  ),
                }}
                style={{ marginBottom: "15px", width: "95%" }}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Inherit Permissions"
                multiline
                maxRows={4}
                value=""
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Stack direction="row" spacing={1}>
                        <ThemeProvider theme={theme}>
                          <Chip
                            avatar={<Avatar>M</Avatar>}
                            label="Avatar"
                            color="basic"
                          />
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                          <Chip
                            avatar={<Avatar>M</Avatar>}
                            label="Avatar"
                            color="fail"
                          />
                        </ThemeProvider>
                      </Stack>
                    </InputAdornment>
                  ),
                }}
                style={{ marginBottom: "15px", width: "95%" }}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Direct Permissions"
                multiline
                maxRows={4}
                value=""
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Stack direction="row" spacing={1}>
                        <ThemeProvider theme={theme}>
                          <Chip
                            avatar={<Avatar>M</Avatar>}
                            label="Avatar"
                            color="fail"
                          />
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                          <Chip
                            avatar={<Avatar>M</Avatar>}
                            label="Avatar"
                            color="basic"
                          />
                        </ThemeProvider>
                      </Stack>
                    </InputAdornment>
                  ),
                }}
                style={{ marginBottom: "15px", width: "95%" }}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Sharing Differences"
                multiline
                maxRows={4}
                value=""
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Stack direction="row" spacing={1}>
                        <ThemeProvider theme={theme}>
                          <Chip
                            avatar={<Avatar>M</Avatar>}
                            label="Avatar"
                            color="fail"
                          />
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                          <Chip
                            avatar={<Avatar>M</Avatar>}
                            label="Avatar"
                            color="fail"
                          />
                        </ThemeProvider>
                      </Stack>
                    </InputAdornment>
                  ),
                }}
                style={{ marginBottom: "15px", width: "95%" }}
              />
              <ThemeProvider theme={theme}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Deviant Permissions"
                  multiline
                  maxRows={4}
                  value="50%"
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      color: "failText.main",
                    },
                  }}
                  style={{ marginBottom: "15px", width: "95%" }}
                />
              </ThemeProvider>
            </div>
            <div style={{ display: "grid", width: "45%", marginTop: "20px" }}>
              <TextField
                id="outlined-multiline-flexible"
                label="File Name"
                multiline
                maxRows={4}
                value={fileName}
                InputProps={{
                  readOnly: true,
                }}
                style={{ marginBottom: "15px", width: "95%" }}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Owner"
                multiline
                maxRows={4}
                value=""
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Stack direction="row" spacing={1}>
                        <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />
                      </Stack>
                    </InputAdornment>
                  ),
                }}
                style={{ marginBottom: "15px", width: "95%" }}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Inherit Permissions"
                multiline
                maxRows={4}
                value=""
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Stack direction="row" spacing={1}>
                        <ThemeProvider theme={theme}>
                          <Chip
                            avatar={<Avatar>M</Avatar>}
                            label="Avatar"
                            color="basic"
                          />
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                          <Chip
                            avatar={<Avatar>M</Avatar>}
                            label="Avatar"
                            color="success"
                          />
                        </ThemeProvider>
                      </Stack>
                    </InputAdornment>
                  ),
                }}
                style={{ marginBottom: "15px", width: "95%" }}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Direct Permissions"
                multiline
                maxRows={4}
                value=""
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Stack direction="row" spacing={1}>
                        <ThemeProvider theme={theme}>
                          <Chip
                            avatar={<Avatar>M</Avatar>}
                            label="Avatar"
                            color="success"
                          />
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                          <Chip
                            avatar={<Avatar>M</Avatar>}
                            label="Avatar"
                            color="basic"
                          />
                        </ThemeProvider>
                      </Stack>
                    </InputAdornment>
                  ),
                }}
                style={{ marginBottom: "15px", width: "95%" }}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Sharing Differences"
                multiline
                maxRows={4}
                value=""
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Stack direction="row" spacing={1}>
                        <ThemeProvider theme={theme}>
                          <Chip
                            avatar={<Avatar>M</Avatar>}
                            label="Avatar"
                            color="success"
                          />
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                          <Chip
                            avatar={<Avatar>M</Avatar>}
                            label="Avatar"
                            color="success"
                          />
                        </ThemeProvider>
                      </Stack>
                    </InputAdornment>
                  ),
                }}
                style={{ marginBottom: "15px", width: "95%" }}
              />
              <ThemeProvider theme={theme}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Deviant Permissions"
                  multiline
                  maxRows={4}
                  value="50%"
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      color: "successText.main",
                    },
                  }}
                  style={{ marginBottom: "15px", width: "95%" }}
                />
              </ThemeProvider>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CompareSnapshots;
