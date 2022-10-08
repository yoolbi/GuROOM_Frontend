import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import QueryBuilder from "./QueryBuilder";
import AccessControlPolicy from "./AccessControlPolicy";

const FilterModal = () => {
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
              <Tab label="QUERY BUILDER" value="1" />
              <Tab label="ACCESS CONTROL POLICY" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <QueryBuilder />
          </TabPanel>
          <TabPanel value="2">
            <AccessControlPolicy />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};
export default FilterModal;
