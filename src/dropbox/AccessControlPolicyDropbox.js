import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Autocomplete,
} from "@mui/material";
import { getQueriesAPIMethod, postAccessControlAPIMethod } from "../api/client";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";

//Content in the creating access control policy modal
// eslint-disable-next-line react/prop-types
const AccessControlPolicyModal = ({ handleCloseCreateAccessControlModal }) => {
  const [accessControlPolicies, setAccessControlPolicies] = useState("");
  const [allowedReaders, setAllowedReaders] = useState([]);
  const [allowedWriters, setAllowedWriters] = useState([]);
  const [deniedReaders, setDeniedReaders] = useState([]);
  const [deniedWriters, setDeniedWriters] = useState([]);
  const [checkedGroup, setCheckedGroup] = useState(false);
  const [query, setQuery] = useState("");
  const [queryLogs, setQueryLogs] = useState([]);

  //check group
  const handleChangeCheckedGroup = (event) => {
    setCheckedGroup(event.target.checked);
  };

  //change name of access control
  const handleChangeAccessControlPolicies = (event) => {
    setAccessControlPolicies(event.target.value);
  };

  //edit allowed readers
  const handleChangeAllowedReaders = (e) => {
    setAllowedReaders(e.target.value);
  };

  //edit allowed writers
  const handleChangeAllowedWriters = (e) => {
    setAllowedWriters(e.target.value);
  };

  //edit denied readers
  const handleChangeDeniedReaders = (e) => {
    setDeniedReaders(e.target.value);
  };

  //edit denied writers
  const handleChangeDeniedWriters = (e) => {
    setDeniedWriters(e.target.value);
  };

  //apply access control
  const handleClickCreate = () => {
    postAccessControlAPIMethod(
      accessControlPolicies,
      query,
      allowedReaders.toString().split(", "),
      allowedWriters.toString().split(", "),
      deniedReaders.toString().split(", "),
      deniedReaders.toString().split(", "),
      checkedGroup
    ).then((res) => {
      console.log(res);
      handleCloseCreateAccessControlModal();
    });
  };

  useEffect(() => {
    //get list of queries
    getQueriesAPIMethod().then((res) => {
      setQueryLogs(res.body.reverse());
    });
  }, []);
  return (
    <div style={{ height: 570, overflowY: "scroll" }}>
      <FormControlLabel
        control={
          <Switch checked={checkedGroup} onChange={handleChangeCheckedGroup} />
        }
        label="Group"
      />
      <Box sx={{ width: "545px" }}>
        <TextField
          id="filled-textarea"
          label="Name"
          placeholder="username"
          multiline
          variant="outlined"
          value={accessControlPolicies}
          onChange={handleChangeAccessControlPolicies}
          sx={{ width: "545px", marginBottom: "20px", marginTop: "10px" }}
        />
      </Box>

      <Box sx={{ width: "545px" }}>
        <Autocomplete
          disablePortal
          id="filter-demo"
          options={queryLogs}
          getOptionLabel={(option) => (option.query ? option.query : query)}
          style={{ width: "100%" }}
          onInputChange={(event, value) => {
            setQuery(value);
          }}
          inputValue={query}
          value={query}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Query"
              placeholder="Query"
              sx={{ width: "545px", marginBottom: "20px" }}
            />
          )}
        />
      </Box>

      <div>
        <TextField
          label="Allowed Readers"
          placeholder="Email ex)abc@stonybrook.edu, def@stonybrook.edu"
          multiline
          variant="outlined"
          value={allowedReaders}
          onChange={handleChangeAllowedReaders}
          sx={{ width: "545px", marginBottom: "20px" }}
        />
        <TextField
          label="Allowed Writers"
          placeholder="Email ex)abc@stonybrook.edu, def@stonybrook.edu"
          multiline
          variant="outlined"
          value={allowedWriters}
          onChange={handleChangeAllowedWriters}
          sx={{ width: "545px", marginBottom: "20px" }}
        />
        <TextField
          label="Denied Readers"
          placeholder="Email ex)abc@stonybrook.edu, def@stonybrook.edu"
          multiline
          variant="outlined"
          value={deniedReaders}
          onChange={handleChangeDeniedReaders}
          sx={{ width: "545px", marginBottom: "20px" }}
        />
        <TextField
          label="Denied Writers"
          placeholder="Email ex)abc@stonybrook.edu, def@stonybrook.edu"
          multiline
          variant="outlined"
          value={deniedWriters}
          onChange={handleChangeDeniedWriters}
          sx={{ width: "545px", marginBottom: "20px" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >
        <Button variant="contained" onClick={handleClickCreate}>
          CREATE
        </Button>

        <div style={{ width: "10px" }}></div>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#E0E0E0",
            color: "black",
            "&:hover": { backgroundColor: "#E0E0E0" },
          }}
          onClick={handleCloseCreateAccessControlModal}
        >
          CANCEL
        </Button>
      </div>
    </div>
  );
};

// Modal for access control policy
// eslint-disable-next-line react/prop-types
const AccessControlPolicyDropbox = ({
  // eslint-disable-next-line react/prop-types
  handleCloseCreateAccessControlModal,
}) => {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: 600, typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="CREATE ACCESS CONTROL REQUIREMENTS" value="1" />
          </TabList>
        </Box>
        <TabPanel
          value="1"
          style={{ paddingTop: "10px", paddingBottom: "0px" }}
        >
          <AccessControlPolicyModal
            handleCloseCreateAccessControlModal={
              handleCloseCreateAccessControlModal
            }
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default AccessControlPolicyDropbox;
