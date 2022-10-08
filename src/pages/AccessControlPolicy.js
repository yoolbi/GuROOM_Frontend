import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";

const AccessControlPolicy = () => {
  const [accessControlPolicies, setAccessControlPolicies] = React.useState("");
  const [query, setQuery] = React.useState("");

  const handleChangeAccessControlPolicies = (event) => {
    setAccessControlPolicies(event.target.value);
  };

  const handleChangeQuery = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <Box sx={{ width: "545px", marginBottom: "15px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Access Control Policies
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={accessControlPolicies}
            label="Access Control Policies"
            onChange={handleChangeAccessControlPolicies}
          >
            <MenuItem value={10}>Access Control Policy #1</MenuItem>
            <MenuItem value={20}>Access Control Policy #2</MenuItem>
            <MenuItem value={30}>Access Control Policy #3</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ width: "545px", marginBottom: "15px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Query</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={query}
            label="Query"
            onChange={handleChangeQuery}
          >
            <MenuItem value={10}>from: yooha.bae@stonybrook.edu</MenuItem>
            <MenuItem value={20}>to: yoolbi.lee@stonybrook.edu</MenuItem>
            <MenuItem value={30}>dddd</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "545px",
          marginBottom: "15px",
        }}
      >
        <Button variant="contained">APPLY</Button>
        <div style={{ width: "10px" }}></div>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#E0E0E0",
            color: "black",
            "&:hover": { backgroundColor: "#E0E0E0" },
          }}
        >
          CANCEL
        </Button>
      </div>
    </div>
  );
};

export default AccessControlPolicy;
