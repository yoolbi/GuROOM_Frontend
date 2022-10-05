import React from "react";
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

const Home = () => {
  const [fileSnapshot, setFileSnapshot] = React.useState("");

  const handleChange = (event) => {
    setFileSnapshot(event.target.value);
  };
  return (
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
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
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
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <img
        src="/img/snapshot_image.png"
        style={{ width: "30px", height: "30px", paddingTop: "5px" }}
      />
    </div>
  );
};

export default Home;
