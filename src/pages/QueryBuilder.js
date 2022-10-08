import React from "react";
import {
  FormControlLabel,
  Checkbox,
  TextField,
  InputAdornment,
  Chip,
  Paper,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  InputBase,
  Box,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import TagFacesIcon from "@mui/icons-material/TagFaces";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const sharingTypes = ["Default", "atype", "btype"];

const fileTypes = ["png", "jpg", "pdf", "docx", "mp3", "mp4"];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const QueryBuilder = () => {
  const [owner, setOwner] = React.useState("");
  const [readable, setReadable] = React.useState("");
  const [writeable, setWriteable] = React.useState("");
  const [sharable, setSharable] = React.useState("");
  const theme = useTheme();
  const [path, setPath] = React.useState("");
  const [sharingType, setSharingType] = React.useState([]);
  const [fileType, setFileType] = React.useState([]);

  const [readableData, setReadableData] = React.useState([
    { key: 0, label: "readableData" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
  ]);

  const [writableData, setWritableData] = React.useState([
    { key: 0, label: "Angular" },
    { key: 1, label: "writableData" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
  ]);

  const [sharableData, setSharableData] = React.useState([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "sharableData" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
  ]);

  const handleChangeOwner = (event) => {
    setOwner(event.target.value);
  };
  const handleChangeReadable = (event) => {
    setReadable(event.target.value);
  };
  const handleChangeWriteable = (event) => {
    setWriteable(event.target.value);
  };
  const handleChangeSharable = (event) => {
    setSharable(event.target.value);
  };

  const handleChangePath = (event) => {
    setPath(event.target.value);
  };

  const handleChangeSharingType = (event) => {
    const {
      target: { value },
    } = event;
    setSharingType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeFileType = (event) => {
    const {
      target: { value },
    } = event;
    setFileType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // delete
  const handleDeleteReadable = (chipToDelete) => () => {
    setReadableData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const handleDeleteWritable = (chipToDelete) => () => {
    setWritableData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  const handleDeleteSharable = (chipToDelete) => () => {
    setSharableData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  return (
    <div style={{ height: 620, overflowY: "scroll" }}>
      <div>
        <div>Drive Type</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="My Drive"
          />
          <div></div>
          <FormControlLabel control={<Checkbox />} label="Shared Drive" />
        </div>
      </div>
      <div>
        <div>
          <TextField
            id="outlined-textareas"
            label="Owner/Creator"
            placeholder="username"
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">To</InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      <div>
        <TextField
          id="filled-textarea"
          label="Readable by"
          placeholder="username"
          multiline
          variant="filled"
          value={readable}
          onChange={handleChangeReadable}
          sx={{ width: "545px" }}
        />
        <Paper
          sx={{
            display: "flex",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
            width: "545px",
            marginBottom: "15px",
          }}
          component="ul"
        >
          {readableData.map((data) => {
            let icon;

            if (data.label === "React") {
              icon = <TagFacesIcon />;
            }

            return (
              <ListItem key={data.key}>
                <Chip
                  icon={icon}
                  label={data.label}
                  onDelete={
                    data.label === "React"
                      ? undefined
                      : handleDeleteReadable(data)
                  }
                />
              </ListItem>
            );
          })}
        </Paper>
        <TextField
          id="filled-textarea"
          label="Writable by"
          placeholder="username"
          multiline
          variant="filled"
          value={writeable}
          sx={{ width: "545px" }}
          onChange={handleChangeWriteable}
        />
        <Paper
          sx={{
            display: "flex",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
            width: "545px",
            marginBottom: "15px",
          }}
          component="ul"
        >
          {writableData.map((data) => {
            let icon;

            if (data.label === "React") {
              icon = <TagFacesIcon />;
            }

            return (
              <ListItem key={data.key}>
                <Chip
                  icon={icon}
                  label={data.label}
                  onDelete={
                    data.label === "React"
                      ? undefined
                      : handleDeleteWritable(data)
                  }
                />
              </ListItem>
            );
          })}
        </Paper>
        <TextField
          id="filled-textarea"
          label="Sharable by"
          placeholder="username"
          multiline
          variant="filled"
          value={sharable}
          onChange={handleChangeSharable}
          sx={{ width: "545px", marginBottom: "15px" }}
        />
        <Paper
          sx={{
            display: "flex",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
            width: "545px",
            marginBottom: "15px",
          }}
          component="ul"
        >
          {sharableData.map((data) => {
            let icon;

            if (data.label === "React") {
              icon = <TagFacesIcon />;
            }

            return (
              <ListItem key={data.key}>
                <Chip
                  icon={icon}
                  label={data.label}
                  onDelete={
                    data.label === "React"
                      ? undefined
                      : handleDeleteSharable(data)
                  }
                />
              </ListItem>
            );
          })}
        </Paper>
      </div>
      <div>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "545px",
            marginBottom: "15px",
          }}
        >
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Path</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={path}
              onChange={handleChangePath}
              label="Path"
            >
              <MenuItem value={10}>inFolder</MenuItem>
              <MenuItem value={20}>addd</MenuItem>
              <MenuItem value={30}>bddd</MenuItem>
            </Select>
          </FormControl>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder=""
            inputProps={{ "aria-label": "search google maps" }}
          />
        </Paper>

        <FormControl sx={{ width: "545px", marginBottom: "15px" }}>
          <InputLabel id="demo-multiple-name-label">Sharing</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={sharingType}
            onChange={handleChangeSharingType}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
          >
            {sharingTypes.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, sharingType, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box>
          <TextField
            id="outlined-basic"
            label="(file) Name"
            variant="outlined"
          />

          <FormControl>
            <InputLabel id="demo-multiple-name-label">Name</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={fileType}
              onChange={handleChangeFileType}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {fileTypes.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, fileType, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Folder Only"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "15px",
          width: "545px",
        }}
      >
        <Button variant="contained">GENERATE</Button>
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

export default QueryBuilder;
