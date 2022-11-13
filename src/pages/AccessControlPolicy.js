import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Autocomplete,
} from "@mui/material";
import {
  getMembersAPIMethod,
  getQueriesAPIMethod,
  postAccessControlAPIMethod,
} from "../api/client";

//This is the one of tabs from Filter Modal. It can manage access control.
// eslint-disable-next-line react/prop-types
const AccessControlPolicy = ({ handleCloseSearchFilter, fileSnapshot }) => {
  // const [accessControlPolicies, setAccessControlPolicies] = useState([
  //   { name: "AccessControl 1" },
  //   { name: "AccessControl 2" },
  // ]);
  const [accessControlPolicies, setAccessControlPolicies] = useState("");
  const [allowedReaders, setAllowedReaders] = useState([]);
  const [allowedWriters, setAllowedWriters] = useState([]);
  const [deniedReaders, setDeniedReaders] = useState([]);
  const [deniedWriters, setDeniedWriters] = useState([]);
  const [checkedGroup, setCheckedGroup] = useState(false);
  const [query, setQuery] = useState("");
  const [queryLogs, setQueryLogs] = useState([]);
  const [members, setMembers] = useState([]);

  //check group
  const handleChangeCheckedGroup = (event) => {
    setCheckedGroup(event.target.checked);
  };

  //change name of access control
  const handleChangeAccessControlPolicies = (event) => {
    setAccessControlPolicies(event.target.value);
  };

  //edit selection of query
  const handleChangeQuery = (event) => {
    setQuery(event.target.innerText);
  };

  //edit allowed readers
  const handleChangeAllowedReaders = (newValue) => {
    let allowedReadersLet = [];
    newValue.map((value) => {
      allowedReadersLet.push(value.email);
    });
    setAllowedReaders(allowedReadersLet);
  };

  //edit allowed writers
  const handleChangeAllowedWriters = (newValue) => {
    let allowedWritersLet = [];
    newValue.map((value) => {
      allowedWritersLet.push(value.email);
    });
    setAllowedWriters(allowedWritersLet);
  };

  //edit denied readers
  const handleChangeDeniedReaders = (newValue) => {
    let deniedReadersLet = [];
    newValue.map((value) => {
      deniedReadersLet.push(value.email);
    });
    setDeniedReaders(deniedReadersLet);
  };

  //edit denied writers
  const handleChangeDeniedWriters = (newValue) => {
    let deniedWritersLet = [];
    newValue.map((value) => {
      deniedWritersLet.push(value.email);
    });
    setDeniedWriters(deniedWritersLet);
  };

  //apply access control
  const handleClickApply = () => {
    console.log("apply");
    console.log(accessControlPolicies);
    console.log(query);
    console.log(allowedReaders);
    console.log(allowedWriters);
    console.log(deniedReaders);
    console.log(deniedWriters);
    console.log(checkedGroup);
    postAccessControlAPIMethod(
      accessControlPolicies,
      query,
      allowedReaders,
      allowedWriters,
      deniedReaders,
      deniedReaders,
      checkedGroup
    ).then((res) => {
      console.log(res);
    });
    handleCloseSearchFilter();
  };

  useEffect(() => {
    //get list of queries
    getQueriesAPIMethod().then((res) => {
      setQueryLogs(res.body.reverse());
    });
  }, []);

  //get list of emails of members
  useEffect(() => {
    getMembersAPIMethod(fileSnapshot, checkedGroup).then((data) => {
      setMembers(data.data);
      console.log(members);
    });
  }, [checkedGroup]);

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
          sx={{ width: "545px", marginBottom: "20px" }}
        />
        {/*<Autocomplete*/}
        {/*  disablePortal*/}
        {/*  id="tags-outlined"*/}
        {/*  options={accessControlPolicies}*/}
        {/*  getOptionLabel={(option) => (option.name ? option.name : "")}*/}
        {/*  onChange={handleChangeAccessControlPolicies}*/}
        {/*  renderInput={(params) => (*/}
        {/*    <TextField*/}
        {/*      {...params}*/}
        {/*      label="Access Control Requirements"*/}
        {/*      placeholder="Access Control"*/}
        {/*      sx={{ width: "545px", marginBottom: "20px" }}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*/>*/}
      </Box>

      <Box sx={{ width: "545px" }}>
        <Autocomplete
          disablePortal
          id="tags-outlined"
          options={queryLogs}
          getOptionLabel={(option) => (option.query ? option.query : "")}
          onChange={handleChangeQuery}
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
        <Autocomplete
          multiple
          id="tags-outlined"
          options={members}
          getOptionLabel={(option) => (option.email ? option.email : "")}
          filterSelectedOptions
          onChange={(event, newValue) => handleChangeAllowedReaders(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Allowed Readers"
              placeholder="Email"
              sx={{ width: "545px", marginBottom: "20px" }}
            />
          )}
        />
        <Autocomplete
          multiple
          id="tags-outlined"
          options={members}
          getOptionLabel={(option) => (option.email ? option.email : "")}
          filterSelectedOptions
          onChange={(event, newValue) => handleChangeAllowedWriters(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Allowed Writers"
              placeholder="Email"
              sx={{ width: "545px", marginBottom: "20px" }}
            />
          )}
        />
        <Autocomplete
          multiple
          id="tags-outlined"
          options={members}
          getOptionLabel={(option) => (option.email ? option.email : "")}
          filterSelectedOptions
          onChange={(event, newValue) => handleChangeDeniedReaders(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Denied Readers"
              placeholder="Email"
              sx={{ width: "545px", marginBottom: "20px" }}
            />
          )}
        />
        <Autocomplete
          multiple
          id="tags-outlined"
          options={members}
          getOptionLabel={(option) => (option.email ? option.email : "")}
          filterSelectedOptions
          onChange={(event, newValue) => handleChangeDeniedWriters(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Denied Writers"
              placeholder="Email"
              sx={{ width: "545px", marginBottom: "20px" }}
            />
          )}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >
        <Button variant="contained" onClick={handleClickApply}>
          APPLY
        </Button>

        <div style={{ width: "10px" }}></div>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#E0E0E0",
            color: "black",
            "&:hover": { backgroundColor: "#E0E0E0" },
          }}
          onClick={handleCloseSearchFilter}
        >
          CANCEL
        </Button>
      </div>
    </div>
  );
};

export default AccessControlPolicy;
