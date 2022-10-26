import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import QueryBuilder from "./QueryBuilder";
import AccessControlPolicy from "./AccessControlPolicy";

//This is the modal that appears when the user clicks the filter icon on the search bar in the Homepage.
// eslint-disable-next-line react/prop-types
const FilterModal = ({
  // eslint-disable-next-line react/prop-types
  handleCloseSearchFilter,
  // eslint-disable-next-line react/prop-types
  setSearchInput,
  // eslint-disable-next-line react/prop-types
  fileSnapshot,
}) => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //There are two tabs: Query builder and access control policy changer.
  //For the query builder, we pass the setSearchInput, handleCloseSearchFilter, and file snapshot.
  //setSearchInput: for making the query builder, we should put the string in the search bar when the user makes a query,
  //handleCloseSearchFilter: To close the modal after making a query or canceling to make.
  //fileSnapshot: To set the Readable by, Writable by, and Sharable by, we need the information of people who are related to the file snapshot.
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
              fileSnapshot={fileSnapshot}
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
