import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FilterModal from "./FilterModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 700,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const Home = () => {
  const [fileSnapshot, setFileSnapshot] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setFileSnapshot(event.target.value);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "40px",
        }}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "80%",
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
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="tune"
            onClick={handleOpen}
          >
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <FilterModal></FilterModal>
              </Box>
            </Modal>
            <TuneIcon />
          </IconButton>
        </Paper>
        <div style={{ width: "3%" }}></div>
        <Box sx={{ minWidth: 210 }}>
          <FormControl sx={{ m: 1, minWidth: 200, margin: "0px" }} size="small">
            <InputLabel id="demo-select-small">File Snapshot</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={fileSnapshot}
              label="File Snapshot"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <img
          src="/img/snapshot_image.png"
          style={{ width: "30px", height: "30px", paddingTop: "5px" }}
        />
      </div>
    </div>
  );
};

export default Home;
