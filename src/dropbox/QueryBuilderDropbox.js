import React, { useEffect, useState } from "react";
import {
  TextField,
  InputAdornment,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
  Autocomplete,
  Button,
} from "@mui/material";
import { getMembersDropboxAPIMethod } from "../api/client";

const sharingTypes = ["None"];

// eslint-disable-next-line react/prop-types
const QueryBuilderDropbox = ({
  // eslint-disable-next-line react/prop-types
  handleCloseSearchFilter,
  // eslint-disable-next-line react/prop-types
  setSearchInput,
  // eslint-disable-next-line react/prop-types
  fileSnapshot,
}) => {
  let query = "";
  const [owner, setOwner] = useState("");
  const [sharedTo, setSharedTo] = useState("");
  const [name, setName] = useState("");
  const [readable, setReadable] = useState("");
  const [writable, setWritable] = useState("");
  const [path, setPath] = useState("");
  const [pathSelect, setPathSelect] = useState("");
  const [sharingTypeSelect, setSharingTypeSelect] = useState("");
  const [members, setMembers] = useState([]);

  const handleChangeOwner = (event) => {
    setOwner(event.target.value);
  };

  const handleChangeSharedTo = (event) => {
    setSharedTo(event.target.value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeReadable = (newValue) => {
    let readableLet = "";
    newValue.map((value, index) => {
      if (index === 0) {
        readableLet = value.email;
      } else {
        readableLet = readableLet + "," + value.email;
      }
    });
    setReadable(readableLet);
  };

  const handleChangeWritable = (newValue) => {
    let writableLet = "";
    newValue.map((value, index) => {
      if (index === 0) {
        writableLet = value.email;
      } else {
        writableLet = writableLet + "," + value.email;
      }
    });
    setWritable(writableLet);
  };

  const handleChangePath = (event) => {
    setPath(event.target.value);
  };
  const handleChangePathType = (event) => {
    setPathSelect(event.target.value);
  };

  const handleChangeSharingType = (event) => {
    setSharingTypeSelect(event.target.value);
  };

  //generate query from query builder
  const handleClickGenerate = () => {
    owner && (query = query + "owner:" + owner + " and ");
    sharedTo && (query = query + "to:" + sharedTo + " and ");
    readable && (query = query + "readable:" + readable + " and ");
    writable && (query = query + "writable:" + writable + " and ");
    name && (query = query + "name:" + name + " and ");
    pathSelect === "inFolder" && (query = query + "inFolder:" + path + " and ");
    pathSelect === "folder" && (query = query + "folder:" + path + " and ");
    sharingTypeSelect === "None" && (query = query + "sharing:none and ");

    query = query.slice(0, -5);
    console.log("query: ", query);
    query = setSearchInput(query);
    handleCloseSearchFilter();
  };

  //get list of emails of members
  useEffect(() => {
    getMembersDropboxAPIMethod(fileSnapshot).then((data) => {
      setMembers(data.data);
      console.log("get members: ", data);
    });
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <div style={{ height: 575, overflowY: "scroll" }}>
        <div>
          <div>
            <TextField
              id="outlined-textareas"
              label="Owner"
              placeholder="Email"
              multiline
              value={owner}
              onChange={handleChangeOwner}
              sx={{ width: "545px", marginBottom: "15px" }}
            />
          </div>
          <div>
            <TextField
              label="shared"
              id="outlined-start-adornment"
              sx={{ width: "545px", marginBottom: "15px" }}
              value={sharedTo}
              onChange={handleChangeSharedTo}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">To</InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={members}
            getOptionLabel={(option) => (option.email ? option.email : "")}
            filterSelectedOptions
            onChange={(event, newValue) => handleChangeReadable(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Readable by"
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
            onChange={(event, newValue) => handleChangeWritable(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Writable by"
                placeholder="Email"
                sx={{ width: "545px", marginBottom: "20px" }}
              />
            )}
          />
        </div>
        <Box>
          <TextField
            id="outlined-basic"
            label="(file) Name"
            variant="outlined"
            style={{ width: "545px", marginBottom: "15px" }}
            value={name}
            onChange={handleChangeName}
          />
        </Box>
        <div>
          <FormControl sx={{ marginBottom: "15px" }}>
            <InputLabel id="demo-multiple-name-label">Folder Type</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={pathSelect}
              onChange={handleChangePathType}
              label="Folder"
              sx={{ width: "180px" }}
            >
              <MenuItem key="inFolder" value="inFolder">
                inFolder
              </MenuItem>
              <MenuItem key="folder" value="folder">
                folder
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="outlined-textareas"
            label="Path"
            placeholder="path"
            multiline
            value={path}
            onChange={handleChangePath}
            style={{ width: "365px" }}
          />

          <FormControl sx={{ marginBottom: "15px" }}>
            <InputLabel id="demo-multiple-name-label">Sharing</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={sharingTypeSelect}
              onChange={handleChangeSharingType}
              label="Sharing"
              sx={{ width: "180px" }}
            >
              {sharingTypes.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >
        <Button variant="contained" onClick={handleClickGenerate}>
          GENERATE
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

export default QueryBuilderDropbox;
