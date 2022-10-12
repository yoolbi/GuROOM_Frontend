import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SingleFilePermissionEdit from "./SingleFilePermissionEdit";

const FilePermissionEditModal = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: 600, typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="File Permission Edit" value="1" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <SingleFilePermissionEdit />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};
export default FilePermissionEditModal;
