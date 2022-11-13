import React, { useEffect, useState } from "react";
import {
  FormControlLabel,
  Checkbox,
  TextField,
  InputAdornment,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
  Autocomplete,
  Switch,
  Button,
} from "@mui/material";
import { getMembersAPIMethod } from "../api/client";

const sharingTypes = ["None", "Anything", "Individual", "Domain"];

// eslint-disable-next-line react/prop-types
const QueryBuilder = ({
  // eslint-disable-next-line react/prop-types
  handleCloseSearchFilter,
  // eslint-disable-next-line react/prop-types
  setSearchInput,
  // eslint-disable-next-line react/prop-types
  fileSnapshot,
}) => {
  let query = "";
  const [sharedDrive, setSharedDrive] = useState("");
  const [owner, setOwner] = useState("");
  const [creator, setCreator] = useState("");
  const [sharedFrom, setSharedFrom] = useState("");
  const [sharedTo, setSharedTo] = useState("");
  const [name, setName] = useState("");
  const [readable, setReadable] = useState("");
  const [writable, setWritable] = useState("");
  const [sharable, setSharable] = useState("");
  const [path, setPath] = useState("");
  const [pathSelect, setPathSelect] = useState("");
  const [sharingTypeSelect, setSharingTypeSelect] = useState("");
  const [individual, setIndividual] = useState("");
  const [domain, setDomain] = useState("");
  const [members, setMembers] = useState([]);

  const handleChangeSharedDrive = (event) => {
    setSharedDrive(event.target.value);
  };

  const handleChangeOwner = (event) => {
    setOwner(event.target.value);
  };

  const handleChangeCreator = (event) => {
    setCreator(event.target.value);
  };

  const handleChangeSharedFrom = (event) => {
    setSharedFrom(event.target.value);
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

  const handleChangeSharable = (newValue) => {
    let sharableLet = "";
    newValue.map((value, index) => {
      if (index === 0) {
        sharableLet = value.email;
      } else {
        sharableLet = sharableLet + "," + value.email;
      }
    });
    setSharable(sharableLet);
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

  const [checkedMyDrive, setCheckedMyDrive] = useState(true);
  const handleChangeCheckboxMyDrive = (event) => {
    setCheckedMyDrive(event.target.checked);
    setCheckedSharedDrive(!event.target.checked);
  };

  const [checkedSharedDrive, setCheckedSharedDrive] = useState(false);
  const handleChangeCheckboxSharedDrive = (event) => {
    setCheckedSharedDrive(event.target.checked);
    setCheckedMyDrive(!event.target.checked);
  };

  const [checkedGroup, setCheckedGroup] = useState(false);
  const handleChangeCheckedGroup = (event) => {
    setCheckedGroup(event.target.checked);
  };

  const handleChangeIndividual = (event) => {
    setIndividual(event.target.value);
  };

  const handleChangeDomain = (event) => {
    setDomain(event.target.value);
  };

  //generate query from query builder
  const handleClickGenerate = () => {
    checkedMyDrive && (query = query + "drive:MyDrive and ");
    checkedSharedDrive && (query = query + "drive:" + sharedDrive + " and ");
    owner && (query = query + "owner:" + owner + " and ");
    creator && (query = query + "creator:" + creator + " and ");
    sharedFrom && (query = query + "sharedFrom:" + sharedFrom + " and ");
    sharedTo && (query = query + "sharedTo:" + sharedTo + " and ");
    readable && (query = query + "readable:" + readable + " and ");
    writable && (query = query + "writable:" + writable + " and ");
    sharable && (query = query + "sharable:" + sharable + " and ");
    name && (query = query + "name:" + name + " and ");
    pathSelect === "inFolder" && (query = query + "inFolder:" + path + " and ");
    pathSelect === "folder" && (query = query + "folder:" + path + " and ");
    sharingTypeSelect === "None" && (query = query + "sharing:none and ");
    sharingTypeSelect === "Anyone" && (query = query + "sharing:anyone and ");
    sharingTypeSelect === "Individual" &&
      (query = query + "sharing:individual:" + individual + " and ");
    sharingTypeSelect === "Domain" &&
      (query = query + "sharing:domain:" + domain + " and ");

    query = query.slice(0, -5);
    console.log(query);
    query = setSearchInput(query);
    handleCloseSearchFilter();
  };

  //get list of emails of members
  useEffect(() => {
    getMembersAPIMethod(fileSnapshot, checkedGroup).then((data) => {
      setMembers(data.data);
      console.log(members);
    });
  }, [checkedGroup]);

  return (
    <div style={{ height: "100%" }}>
      <div style={{ height: 575, overflowY: "scroll" }}>
        <div>
          <FormControlLabel
            control={
              <Switch
                checked={checkedGroup}
                onChange={handleChangeCheckedGroup}
              />
            }
            label="Group"
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedMyDrive}
                  onChange={handleChangeCheckboxMyDrive}
                />
              }
              label="My Drive"
            />

            <FormControlLabel
              style={{ marginRight: "5px" }}
              control={
                <Checkbox
                  checked={checkedSharedDrive}
                  onChange={handleChangeCheckboxSharedDrive}
                />
              }
              label="Shared Drive"
            />
            {checkedSharedDrive && (
              <TextField
                label="Shared Drive Name"
                id="outlined-start-adornment"
                sx={{ width: "300px", marginBottom: "15px" }}
                value={sharedDrive}
                onChange={handleChangeSharedDrive}
              />
            )}
          </div>
        </div>
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
              id="outlined-textareas"
              label="Creator"
              placeholder="Email"
              multiline
              value={creator}
              onChange={handleChangeCreator}
              sx={{ width: "545px", marginBottom: "15px" }}
            />
          </div>
          <div>
            <TextField
              label="shared"
              id="outlined-start-adornment"
              sx={{ width: "545px", marginBottom: "15px" }}
              value={sharedFrom}
              onChange={handleChangeSharedFrom}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">From</InputAdornment>
                ),
              }}
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
          <Autocomplete
            multiple
            id="tags-outlined"
            options={members}
            getOptionLabel={(option) => (option.email ? option.email : "")}
            filterSelectedOptions
            onChange={(event, newValue) => handleChangeSharable(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Sharable by"
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
          {sharingTypeSelect === "Individual" && (
            <TextField
              id="outlined-textareas"
              label="Individual Name"
              placeholder="username"
              multiline
              value={individual}
              onChange={handleChangeIndividual}
              style={{ width: "365px" }}
            />
          )}
          {sharingTypeSelect === "Domain" && (
            <TextField
              id="outlined-textareas"
              label="Domain Address"
              placeholder="username"
              multiline
              value={domain}
              onChange={handleChangeDomain}
              style={{ width: "365px" }}
            />
          )}
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

export default QueryBuilder;
