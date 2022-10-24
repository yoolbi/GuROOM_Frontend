import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import QueryBuilder from "./QueryBuilder";
import AccessControlPolicy from "./AccessControlPolicy";

// eslint-disable-next-line react/prop-types
const FilterModal = ({ handleCloseSearchFilter, setSearchInput }) => {
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
          <TabPanel
            value="1"
            style={{ paddingTop: "10px", paddingBottom: "0px" }}
          >
            <QueryBuilder
              setSearchInput={setSearchInput}
              handleCloseSearchFilter={handleCloseSearchFilter}
            />
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
