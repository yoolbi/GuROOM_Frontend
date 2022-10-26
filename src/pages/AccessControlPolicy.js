import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Chip, ListItem, Paper } from "@mui/material";
import Avatar from "@mui/material/Avatar";

//This is the one of tabs from Filter Modal. It can manage access control.
const AccessControlPolicy = () => {
  const [accessControlPolicies, setAccessControlPolicies] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [allowedReaders, setAllowedReaders] = React.useState("");
  const [allowedWriters, setAllowedWriters] = React.useState("");
  const [deniedReaders, setDeniedReaders] = React.useState("");
  const [deniedWriters, setDeniedWriters] = React.useState("");

  const [allowedReadersData, setAllowedReadersData] = React.useState([
    { key: 0, label: "allowedReadersData" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 4, label: "Vue.js" },
  ]);
  const [allowedWritersData, setAllowedWritersData] = React.useState([
    { key: 0, label: "allowedWritersData" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 4, label: "Vue.js" },
  ]);

  const [deniedReadersData, setDeniedReadersData] = React.useState([
    { key: 0, label: "hi" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "deniedReadersData" },
    { key: 4, label: "Vue.js" },
  ]);

  const [deniedWritersData, setDeniedWritersData] = React.useState([
    { key: 0, label: "hallo" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 4, label: "deniedWritersData" },
  ]);

  const handleChangeAccessControlPolicies = (event) => {
    setAccessControlPolicies(event.target.value);
  };
  const handleChangeQuery = (event) => {
    setQuery(event.target.value);
  };

  const handleChangeAllowedReaders = (event) => {
    setAllowedReaders(event.target.value);
  };

  const handleChangeAllowedWriters = (event) => {
    setAllowedWriters(event.target.value);
  };

  const handleChangeDeniedReaders = (event) => {
    setDeniedReaders(event.target.value);
  };

  const handleChangeDeniedWriters = (event) => {
    setDeniedWriters(event.target.value);
  };

  //delete
  const handleDeleteAllowedReadersData = (chipToDelete) => () => {
    setAllowedReadersData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  const handleDeleteAllowedWritersData = (chipToDelete) => () => {
    setAllowedWritersData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  const handleDeleteDeniedReadersData = (chipToDelete) => () => {
    setDeniedReadersData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  const handleDeleteDeniedWritersData = (chipToDelete) => () => {
    setDeniedWritersData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  return (
    <div style={{ height: 570, overflowY: "scroll" }}>
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

      <div>
        <TextField
          id="filled-textarea"
          label="Allowed Readers"
          placeholder="username"
          multiline
          variant="filled"
          value={allowedReaders}
          onChange={handleChangeAllowedReaders}
          sx={{ width: "545px" }}
        />
        <Paper
          sx={{
            display: "flex",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
            width: "536px",
            marginBottom: "20px",
          }}
          component="ul"
        >
          {allowedReadersData.map((data) => {
            return (
              <ListItem
                key={data.key}
                sx={{ width: "auto", padding: " 2px 4px 4px 2px " }}
              >
                <Chip
                  avatar={
                    <Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />
                  }
                  label={data.label}
                  onDelete={
                    data.label === "React"
                      ? undefined
                      : handleDeleteAllowedReadersData(data)
                  }
                />
              </ListItem>
            );
          })}
        </Paper>

        <TextField
          id="filled-textarea"
          label="Allowed Writers"
          placeholder="username"
          multiline
          variant="filled"
          value={allowedWriters}
          onChange={handleChangeAllowedWriters}
          sx={{ width: "545px" }}
        />
        <Paper
          sx={{
            display: "flex",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
            width: "536px",
            marginBottom: "20px",
          }}
          component="ul"
        >
          {allowedWritersData.map((data) => {
            return (
              <ListItem
                key={data.key}
                sx={{ width: "auto", padding: " 2px 4px 4px 2px " }}
              >
                <Chip
                  avatar={
                    <Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />
                  }
                  label={data.label}
                  onDelete={
                    data.label === "React"
                      ? undefined
                      : handleDeleteAllowedWritersData(data)
                  }
                />
              </ListItem>
            );
          })}
        </Paper>
        <TextField
          id="filled-textarea"
          label="Denied Readers"
          placeholder="username"
          multiline
          variant="filled"
          value={deniedReaders}
          onChange={handleChangeDeniedReaders}
          sx={{ width: "545px" }}
        />
        <Paper
          sx={{
            display: "flex",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
            width: "536px",
            marginBottom: "20px",
          }}
          component="ul"
        >
          {deniedReadersData.map((data) => {
            return (
              <ListItem
                key={data.key}
                sx={{ width: "auto", padding: " 2px 4px 4px 2px " }}
              >
                <Chip
                  avatar={
                    <Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />
                  }
                  label={data.label}
                  onDelete={
                    data.label === "React"
                      ? undefined
                      : handleDeleteDeniedReadersData(data)
                  }
                />
              </ListItem>
            );
          })}
        </Paper>
        <TextField
          id="filled-textarea"
          label="Denied Writers"
          placeholder="username"
          multiline
          variant="filled"
          value={deniedWriters}
          onChange={handleChangeDeniedWriters}
          sx={{ width: "545px" }}
        />
        <Paper
          sx={{
            display: "flex",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
            width: "536px",
            marginBottom: "20px",
          }}
          component="ul"
        >
          {deniedWritersData.map((data) => {
            return (
              <ListItem
                key={data.key}
                sx={{ width: "auto", padding: " 2px 4px 4px 2px " }}
              >
                <Chip
                  avatar={
                    <Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />
                  }
                  label={data.label}
                  onDelete={
                    data.label === "React"
                      ? undefined
                      : handleDeleteDeniedWritersData(data)
                  }
                />
              </ListItem>
            );
          })}
        </Paper>
      </div>
    </div>
  );
};

export default AccessControlPolicy;
