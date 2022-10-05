import React from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";

const AccessControl = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "40px",
        justifyContent: "space-between",
      }}
    >
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="ex) readable: webyte@gmail.com"
          inputProps={{ "aria-label": "search google maps" }}
        />
      </Paper>
      <div style={{ width: "1%" }}></div>
      <div style={{ minWidth: "90px", textAlign: "right" }}>
        <img
          src="/img/add_button.png"
          style={{
            width: "40px",
            height: "40px",
            marginRight: "8px",
          }}
        />
        <img
          src="/img/delete_button.png"
          style={{ width: "40px", height: "40px" }}
        />
      </div>
    </div>
  );
};

export default AccessControl;
