import React from "react";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

// eslint-disable-next-line react/prop-types
const FileDetailModal = ({ eachFileDetailData }) => {
  // eslint-disable-next-line react/prop-types
  const detail = eachFileDetailData;

  return (
    <div>
      <div
        style={{
          display: "grid",
          width: "100%",
          marginLeft: "20px",
          marginTop: "20px",
        }}
      >
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
        <TextField
          id="outlined-multiline-flexible"
          label="Owner"
          multiline
          value=""
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <Stack direction="row" spacing={1}>
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
        <TextField
          id="outlined-multiline-flexible"
          label="Organizer"
          multiline
          value=""
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <Stack direction="row" spacing={1}>
                  {detail.organizer.map((data) => {
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
                        key={detail.id}
                      />
                    );
                  })}
                </Stack>
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: "15px", width: "95%" }}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="File Organizer"
          multiline
          value=""
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <Stack direction="row" spacing={1}>
                  {detail.fileOrganizer.map((data) => {
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
                        key={detail.id}
                      />
                    );
                  })}
                </Stack>
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: "15px", width: "95%" }}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Writer"
          multiline
          value=""
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <Stack direction="row" spacing={1}>
                  {detail.writer.map((data) => {
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
                        key={detail.id}
                      />
                    );
                  })}
                </Stack>
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: "15px", width: "95%" }}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Commenter"
          multiline
          value=""
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <Stack direction="row" spacing={1}>
                  {detail.commenter.map((data) => {
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
                        key={detail.id}
                      />
                    );
                  })}
                </Stack>
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: "15px", width: "95%" }}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Reader"
          multiline
          value=""
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <Stack direction="row" spacing={1}>
                  {detail.reader.map((data) => {
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
                        key={detail.id}
                      />
                    );
                  })}
                </Stack>
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: "15px", width: "95%" }}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Inherit Permissions"
          multiline
          value=""
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <Stack direction="row" spacing={1}>
                  {JSON.parse(detail.inheritPermissions).map((data) => {
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
                        key={detail.id}
                      />
                    );
                  })}
                </Stack>
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: "15px", width: "95%" }}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Direct Permissions"
          multiline
          value=""
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <Stack direction="row" spacing={1}>
                  {JSON.parse(detail.directPermissions).map((data) => {
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
                        key={detail.id}
                      />
                    );
                  })}
                </Stack>
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: "15px", width: "95%" }}
        />
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
