import React from "react";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

//This is the Access Control Detail Modal. It appears when the user double-clicks the access control table row,
// eslint-disable-next-line react/prop-types
const AccessControlDetailModalDropbox = ({ eachDetailData }) => {
  // eslint-disable-next-line react/prop-types
  const detail = eachDetailData;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          display: "grid",
          width: "100%",
          marginLeft: "10px",
          marginTop: "20px",
          overflowY: "auto",
        }}
      >
        <TextField
          id="outlined-multiline-flexible"
          label="Name"
          multiline
          maxRows={4}
          value={detail.name}
          InputProps={{
            readOnly: true,
          }}
          style={{ marginBottom: "30px", width: "95%", marginTop: "5px" }}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Query"
          multiline
          maxRows={4}
          value={detail.query}
          InputProps={{
            readOnly: true,
          }}
          style={{ marginBottom: "30px", width: "95%" }}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Group"
          multiline
          maxRows={4}
          value={detail.Grp}
          InputProps={{
            readOnly: true,
          }}
          style={{ marginBottom: "30px", width: "95%" }}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Allowed Readers"
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
                  {detail.AR?.map((data, index) => {
                    return <Chip label={data} variant="outlined" key={index} />;
                  })}
                </Stack>
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: "30px", width: "95%" }}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Allowed Writers"
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
                  {detail.AW?.map((data, index) => {
                    return <Chip label={data} variant="outlined" key={index} />;
                  })}
                </Stack>
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: "30px", width: "95%" }}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Denied Readers"
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
                  {detail.DR?.map((data, index) => {
                    return <Chip label={data} variant="outlined" key={index} />;
                  })}
                </Stack>
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: "30px", width: "95%" }}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Denied Writers "
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
                  {detail.DW?.map((data, index) => {
                    return <Chip label={data} variant="outlined" key={index} />;
                  })}
                </Stack>
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: "30px", width: "95%" }}
        />
      </div>
    </div>
  );
};

export default AccessControlDetailModalDropbox;
