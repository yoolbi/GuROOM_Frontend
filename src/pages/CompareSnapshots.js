import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import { Button, InputAdornment } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
  const [baseFileFirst, setBaseFileFisrt] = useState("");
  const [baseFileSecond, setBaseFileSecond] = useState("");
  const [compareButton, setCompareButton] = useState(false);
  const [openCompareBox, setOpenCompareBox] = useState(false);

  const handleChangeFirst = (event) => {
    setBaseFileFisrt(event.target.value);
  };

  const handleChangeSecond = (event) => {
    setBaseFileSecond(event.target.value);
  };

  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpenCompareBox(true);
  };

  function handleClickOpenBreadcrumb(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  const clickCompareButton = () => {
    setCompareButton(true);
  };

  return (
    <div>
      <div className="select" style={{ display: "flex" }}>
        <Box sx={{ minWidth: 250 }}>
          <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
            <InputLabel id="baseFileSelect">Base File Snapshot</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={baseFileFirst}
              label="Base File Snapshot"
              onChange={handleChangeFirst}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <img
          src="/img/arrow.png"
          style={{ width: "40px", height: "23px", marginTop: "16px" }}
        />
        <Box sx={{ minWidth: 250 }}>
          <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
            <InputLabel id="baseFileSelect">Base File Snapshot</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={baseFileSecond}
              label="Base File Snapshot"
              onChange={handleChangeSecond}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
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
                paddingTop: "15px",
              }}
            >
              <Divider />
              <List component="nav" aria-label="secondary mailbox folder">
                <ListItemButton
                  selected={selectedIndex === 1}
                  onClick={(event) => handleListItemClick(event, 1)}
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
                </ListItemButton>
                <Divider />
                <ListItemButton
                  selected={selectedIndex === 2}
                  onClick={(event) => handleListItemClick(event, 2)}
                >
                  <ListItemText primary="My Drive / ... / Lecture1.pdf" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                  selected={selectedIndex === 3}
                  onClick={(event) => handleListItemClick(event, 3)}
                >
                  <ListItemText primary="My Drive / ... / Lecture1.pdf" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                  selected={selectedIndex === 4}
                  onClick={(event) => handleListItemClick(event, 4)}
                >
                  <ListItemText primary="My Drive / ... / Lecture1.pdf" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 5}
                  onClick={(event) => handleListItemClick(event, 5)}
                >
                  <ListItemText primary="My Drive / ... / Lecture1.pdf" />
                </ListItemButton>
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
                value="{fileName}"
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
                value="{fileName}"
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
