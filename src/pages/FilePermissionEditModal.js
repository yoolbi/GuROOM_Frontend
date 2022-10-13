import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SingleFilePermissionEdit from "./SingleFilePermissionEdit";
import { Button } from "@mui/material";
// import { TextField, Chip, Paper} from "@mui/material";

// eslint-disable-next-line react/prop-types
const FilePermissionEditModal = ({ closeFilePermissionEditModal }) => {
  const [valueEditModal, setValueEditModal] = React.useState("1");

  const handleChangeEditModal = (event, newValue) => {
    setValueEditModal(newValue);
  };

  return (
    <div>
      <Box sx={{ width: 600, typography: "body1" }}>
        <TabContext value={valueEditModal}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChangeEditModal}
              aria-label="lab API tabs example"
            >
              <Tab label="File Permission Edit" value="1" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <SingleFilePermissionEdit />
          </TabPanel>

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
              onClick={closeFilePermissionEditModal}
            >
              CANCEL
            </Button>
          </div>
        </TabContext>
      </Box>
    </div>
  );
};
export default FilePermissionEditModal;
