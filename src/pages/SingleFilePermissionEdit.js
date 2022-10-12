import React from "react";
import { TextField, Chip, Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import TagFacesIcon from "@mui/icons-material/TagFaces";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const SingleFilePermissionEdit = () => {
  const [fileName, setFileName] = React.useState("");
  const [owner, setOwner] = React.useState("");
  const [inheritPermission, setInheritPermission] = React.useState("");
  const [directPermission, setDirectPermission] = React.useState("");
  const [sharingDifferences, setSharingDifferences] = React.useState("");
  const [deviantPermissions, setDeviantPermissions] = React.useState("");

  const [ownerData, setOwnerData] = React.useState([
    { key: 0, label: "Owner" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
  ]);

  const [inheritPermissionData, setInheritPermissionData] = React.useState([
    { key: 0, label: "Angular" },
    { key: 1, label: "inheritPermissionData" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
  ]);

  const [directPermissionData, setDirectPermissionData] = React.useState([
    { key: 1, label: "jQuery" },
    { key: 2, label: "DirectPermissionData" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
  ]);

  const [sharingDifferencesData, setSharingDifferencesData] = React.useState([
    { key: 1, label: "jQuery" },
    { key: 2, label: "sharingDifferences" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
  ]);

  const handleChangeFileName = (event) => {
    setFileName(event.target.value);
  };
  const handleChangeOwner = (event) => {
    setOwner(event.target.value);
  };
  const handleChangeInheritPermission = (event) => {
    setInheritPermission(event.target.value);
  };
  const handleChangeDirectPermission = (event) => {
    setDirectPermission(event.target.value);
  };
  const handleChangeSharingDifferences = (event) => {
    setSharingDifferences(event.target.value);
  };

  const handleChangeDeviantPermissions = (event) => {
    setDeviantPermissions(event.target.value);
  };

  // delete
  const handleDeleteOwner = (chipToDelete) => () => {
    setOwnerData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const handleDeleteInheritPermission = (chipToDelete) => () => {
    setInheritPermissionData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  const handleDeleteDirectPermission = (chipToDelete) => () => {
    setDirectPermissionData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const handleDeleteSharingDifferences = (chipToDelete) => () => {
    setSharingDifferencesData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  return (
    <div style={{ height: 620, overflowY: "scroll" }}>
      <TextField
        id="outlined-textareas"
        label="File Name"
        placeholder="username"
        multiline
        value={fileName}
        onChange={handleChangeFileName}
        sx={{ width: "545px", marginBottom: "15px", marginTop: "5px" }}
      />

      <div>
        <TextField
          id="filled-textarea"
          label="Owner"
          placeholder="username"
          multiline
          variant="filled"
          value={owner}
          onChange={handleChangeOwner}
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
          {ownerData.map((data) => {
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
                    data.label === "React" ? undefined : handleDeleteOwner(data)
                  }
                />
              </ListItem>
            );
          })}
        </Paper>
        <TextField
          id="filled-textarea"
          label="Inherit Permission"
          placeholder="username"
          multiline
          variant="filled"
          value={inheritPermission}
          sx={{ width: "545px" }}
          onChange={handleChangeInheritPermission}
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
          {inheritPermissionData.map((data) => {
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
                      : handleDeleteInheritPermission(data)
                  }
                />
              </ListItem>
            );
          })}
        </Paper>
        <TextField
          id="filled-textarea"
          label="Direct Permission"
          placeholder="username"
          multiline
          variant="filled"
          value={directPermission}
          onChange={handleChangeDirectPermission}
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
          {directPermissionData.map((data) => {
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
                      : handleDeleteDirectPermission(data)
                  }
                />
              </ListItem>
            );
          })}
        </Paper>
        {/*//sharing differences*/}
        <TextField
          id="filled-textarea"
          label="Sharing differences"
          placeholder="username"
          multiline
          variant="filled"
          value={sharingDifferences}
          onChange={handleChangeSharingDifferences}
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
          {sharingDifferencesData.map((data) => {
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
                      : handleDeleteSharingDifferences(data)
                  }
                />
              </ListItem>
            );
          })}
        </Paper>
      </div>

      <TextField
        id="outlined-textareas"
        label="Deviant Permissions"
        placeholder="Deviant Permissions"
        multiline
        value={deviantPermissions}
        onChange={handleChangeDeviantPermissions}
        sx={{ width: "545px", marginBottom: "15px", marginTop: "5px" }}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained">EDIT</Button>
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

export default SingleFilePermissionEdit;
