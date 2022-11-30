import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

//When the user wants to check the details of file in the table(which shows in the Homepage), he/she can check with double-clicking the file(row)
//The modal shows file name, file type, owner, organizer, file organizer, writer, commenter, reader, inherit permissions, direct permissions, created & modified date and the file size.

//Display validation info if there exist
// eslint-disable-next-line react/prop-types
const DisplayValidation = ({ eachFileDetailData }) => {
  const detail = eachFileDetailData;
  const [validation, setValidation] = useState([]);

  useEffect(() => {
    let validationForEachFile = [];
    detail["validation"]?.map((data, index) => {
      if (data.file_id === detail.id) {
        validationForEachFile.push(detail["validation"][index]);
      }
    });
    validationForEachFile = validationForEachFile.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.email_address === value.email_address)
    );
    setValidation(validationForEachFile);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {validation.map((data, index) => {
        return (
          <div key={index}>
            <div style={{ display: "flex" }}>
              <TextField
                id="outlined-multiline-flexible"
                label="Violated Email"
                multiline
                maxRows={4}
                value={data.email_address}
                InputProps={{
                  readOnly: true,
                }}
                style={{
                  marginBottom: "15px",
                  width: "45%",
                  marginRight: "5%",
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Violation Type"
                multiline
                maxRows={4}
                value={JSON.stringify(data.violationType)
                  ?.replace(/"/g, "")
                  .replace("[", "")
                  .replace("]", "")
                  .replace(",", ", ")}
                InputProps={{
                  readOnly: true,
                }}
                style={{ marginBottom: "15px", width: "45%" }}
              />
            </div>
            <TextField
              id="outlined-multiline-flexible"
              label="Violation Type"
              multiline
              maxRows={4}
              value={JSON.stringify(data.violation_description)
                ?.replace(/"/g, "")
                .replace("[", "")
                .replace("]", "")
                .replace(",", ", ")}
              InputProps={{
                readOnly: true,
              }}
              style={{ marginBottom: "15px", width: "95%" }}
            />
          </div>
        );
      })}
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const FileDetailModalDropbox = ({ eachFileDetailData }) => {
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
          value={detail.name ? detail.name : ""}
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
                  {detail.owner[0] !== undefined ? (
                    <Chip
                      label={detail.owner[0]}
                      variant="outlined"
                      key={detail.id}
                    />
                  ) : (
                    ""
                  )}
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
                  {detail.writer?.map((data, index) => {
                    return <Chip label={data} variant="outlined" key={index} />;
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
                  {detail.commenter?.map((data, index) => {
                    return <Chip label={data} variant="outlined" key={index} />;
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
                  {JSON.parse(detail.inheritPermissions)?.map((data, index) => {
                    return <Chip label={data} variant="outlined" key={index} />;
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
                  {JSON.parse(detail.directPermissions)?.map((data, index) => {
                    return <Chip label={data} variant="outlined" key={index} />;
                  })}
                </Stack>
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: "15px", width: "95%" }}
        />
        {/*Modified date*/}
        <TextField
          id="outlined-multiline-flexible"
          label="Modified Date"
          multiline
          value={detail.modified ? detail.modified : " "}
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
          value={detail.size ? detail.size : " "}
          InputProps={{
            readOnly: true,
          }}
          style={{ marginBottom: "15px", width: "95%" }}
        />
        {detail.validation.length !== 0 && (
          // eslint-disable-next-line react/no-unknown-property
          <DisplayValidation eachFileDetailData={eachFileDetailData} />
        )}
      </div>
    </div>
  );
};

export default FileDetailModalDropbox;
