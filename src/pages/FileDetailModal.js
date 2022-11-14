import React from "react";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

//When the user wants to check the details of file in the table(which shows in the Homepage), he/she can check with double-clicking the file(row)
//The modal shows file name, file type, owner, organizer, file organizer, writer, commenter, reader, inherit permissions, direct permissions, created & modified date and the file size.
// eslint-disable-next-line react/prop-types
const FileDetailModal = ({ eachFileDetailData }) => {
  // eslint-disable-next-line react/prop-types
  const detail = eachFileDetailData;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          display: "grid",
          width: "100%",
          marginLeft: "20px",
          marginTop: "20px",
        }}
      >
        {/*file name*/}
        <TextField
          id="outlined-multiline-flexible"
          label="File Name"
          multiline
          maxRows={4}
          value={detail.name}
          InputProps={{
            readOnly: true,
          }}
          style={{ marginBottom: "15px", width: "95%" }}
        />
        {/*file type*/}
        <TextField
          id="outlined-multiline-flexible"
          label="File Type"
          multiline
          maxRows={4}
          value={detail.type}
          InputProps={{
            readOnly: true,
          }}
          style={{ marginBottom: "15px", width: "95%" }}
        />
        {/*Owner: it shows with chips in MUI*/}
        <TextField
          id="outlined-multiline-flexible"
          label="Owner"
          multiline
          value=""
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <Stack
                  direction="row"
                  spacing={1}
                  style={{ width: "100%", overflowX: "auto" }}
                >
                  {detail.owner["displayName"] !== undefined && (
                    <Chip
                      avatar={
                        <Avatar alt="Natacha" src={detail.owner["photoLink"]} />
                      }
                      label={
                        detail.owner["displayName"] === null
                          ? "Anyone"
                          : detail.owner["displayName"]
                      }
                      variant="outlined"
                      key={detail.id}
                    />
                  )}
                </Stack>
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: "15px", width: "95%" }}
        />
        {/*Organizer: it shows with chips in MUI*/}
        <TextField
          id="outlined-multiline-flexible"
          label="Organizer"
          multiline
          value=""
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start" style={{ width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  style={{ width: "100%", overflowX: "auto" }}
                >
                  {detail.organizer.map((data, index) => {
                    return (
                      <Chip
                        avatar={
                          <Avatar alt="Natacha" src={data["photoLink"]} />
                        }
                        label={
                          data["displayName"] === null
                            ? "Anyone"
                            : data["displayName"]
                        }
                        variant="outlined"
                        key={index}
                      />
                    );
                  })}
                </Stack>
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: "15px", width: "95%" }}
        />
        {/*File Organizer: it shows with chips in MUI*/}
        <TextField
          id="outlined-multiline-flexible"
          label="File Organizer"
          multiline
          value=""
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start" style={{ width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  style={{ width: "100%", overflowX: "auto" }}
                >
                  {detail.fileOrganizer.map((data, index) => {
                    return (
                      <Chip
                        avatar={
                          <Avatar alt="Natacha" src={data["photoLink"]} />
                        }
                        label={
                          data["displayName"] === null
                            ? "Anyone"
                            : data["displayName"]
                        }
                        variant="outlined"
                        key={index}
                      />
                    );
                  })}
                </Stack>
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: "15px", width: "95%" }}
        />
        {/*Writer: it shows with chips in MUI*/}
        <TextField
          id="outlined-multiline-flexible"
          label="Writer"
          multiline
          value=""
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start" style={{ width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  style={{ width: "100%", overflowX: "auto" }}
                >
                  {detail.writer.map((data, index) => {
                    return (
                      <Chip
                        avatar={
                          <Avatar alt="Natacha" src={data["photoLink"]} />
                        }
                        label={
                          data["displayName"] === null
                            ? "Anyone"
                            : data["displayName"]
                        }
                        variant="outlined"
                        key={index}
                      />
                    );
                  })}
                </Stack>
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: "15px", width: "95%" }}
        />
        {/*Commenter: it shows with chips in MUI*/}
        <TextField
          id="outlined-multiline-flexible"
          label="Commenter"
          multiline
          value=""
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start" style={{ width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  style={{ width: "100%", overflowX: "auto" }}
                >
                  {detail.commenter.map((data, index) => {
                    return (
                      <Chip
                        avatar={
                          <Avatar alt="Natacha" src={data["photoLink"]} />
                        }
                        label={
                          data["displayName"] === null
                            ? "Anyone"
                            : data["displayName"]
                        }
                        variant="outlined"
                        key={index}
                      />
                    );
                  })}
                </Stack>
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: "15px", width: "95%" }}
        />
        {/*Reader: it shows with chips in MUI*/}
        <TextField
          id="outlined-multiline-flexible"
          label="Reader"
          multiline
          value=""
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start" style={{ width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  style={{ width: "100%", overflowX: "auto" }}
                >
                  {detail.reader.map((data, index) => {
                    return (
                      <Chip
                        avatar={
                          <Avatar alt="Natacha" src={data["photoLink"]} />
                        }
                        label={
                          data["displayName"] === null
                            ? "Anyone"
                            : data["displayName"]
                        }
                        variant="outlined"
                        key={index}
                      />
                    );
                  })}
                </Stack>
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: "15px", width: "95%" }}
        />
        {/*Inherit Permissions: it shows with chips in MUI*/}
        <TextField
          id="outlined-multiline-flexible"
          label="Inherit Permissions"
          multiline
          value=""
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start" style={{ width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  style={{ width: "100%", overflowX: "auto" }}
                >
                  {JSON.parse(detail.inheritPermissions).map((data, index) => {
                    return (
                      <Chip
                        avatar={
                          <Avatar alt="Natacha" src={data["photoLink"]} />
                        }
                        label={
                          data["displayName"] === null
                            ? "Anyone"
                            : data["displayName"]
                        }
                        variant="outlined"
                        key={index}
                      />
                    );
                  })}
                </Stack>
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: "15px", width: "95%" }}
        />
        {/*Direct Permissions: it shows with chips in MUI*/}
        <TextField
          id="outlined-multiline-flexible"
          label="Direct Permissions"
          multiline
          value=""
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start" style={{ width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  style={{ width: "100%", overflowX: "auto" }}
                >
                  {JSON.parse(detail.directPermissions).map((data, index) => {
                    return (
                      <Chip
                        avatar={
                          <Avatar alt="Natacha" src={data["photoLink"]} />
                        }
                        label={
                          data["displayName"] === null
                            ? "Anyone"
                            : data["displayName"]
                        }
                        variant="outlined"
                        key={index}
                      />
                    );
                  })}
                </Stack>
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: "15px", width: "95%" }}
        />
        {/*Deviant Permissions: it shows with chips in MUI*/}
        <TextField
          id="outlined-multiline-flexible"
          label="Deviant Permissions"
          multiline
          value=""
          InputProps={{
            readOnly: true,
          }}
          style={{ marginBottom: "15px", width: "95%" }}
        />
        {/*Created date*/}
        <TextField
          id="outlined-multiline-flexible"
          label="Created Date"
          multiline
          value={detail.created}
          InputProps={{
            readOnly: true,
          }}
          style={{ marginBottom: "15px", width: "95%" }}
        />
        {/*Modified date*/}
        <TextField
          id="outlined-multiline-flexible"
          label="Modified Date"
          multiline
          value={detail.modified}
          InputProps={{
            readOnly: true,
          }}
          style={{ marginBottom: "15px", width: "95%" }}
        />
        {/*file size*/}
        <TextField
          id="outlined-multiline-flexible"
          label="Size"
          multiline
          value={detail.size}
          InputProps={{
            readOnly: true,
          }}
          style={{ marginBottom: "15px", width: "95%" }}
        />
      </div>
    </div>
  );
};

export default FileDetailModal;
