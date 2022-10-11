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

const CompareSnapshots = () => {
  const [baseFileFirst, setBaseFileFisrt] = useState("");
  const [baseFileSecond, setBaseFileSecond] = useState("");

  const handleChangeFirst = (event) => {
    setBaseFileFisrt(event.target.value);
  };

  const handleChangeSecond = (event) => {
    setBaseFileSecond(event.target.value);
  };

  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
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
      </div>
      <div>
        <Box
          sx={{ width: "25%", bgcolor: "background.paper", paddingTop: "15px" }}
        >
          <Divider />
          <List component="nav" aria-label="secondary mailbox folder">
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemText primary="My Drive / ... / Lecture1.pdf" />
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
    </div>
  );
};

export default CompareSnapshots;
