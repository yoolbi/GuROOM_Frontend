import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const CompareSnapshots = () => {
  const [baseFile, setBaseFile] = React.useState("");

  const handleChange = (event) => {
    setBaseFile(event.target.value);
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
              value={baseFile}
              label="Base File Snapshot"
              onChange={handleChange}
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
              value={baseFile}
              label="Base File Snapshot"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
    </div>
  );
};

export default CompareSnapshots;
