import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import QueryBuilder from "./QueryBuilder";
import AccessControlPolicy from "./AccessControlPolicy";
import { Button } from "@mui/material";

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
          <TabPanel value="1" style={{ paddingTop: "10px" }}>
            <QueryBuilder setSearchInput={setSearchInput} />
          </TabPanel>
          <TabPanel value="2">
            <AccessControlPolicy />
          </TabPanel>
        </TabContext>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {value === "1" ? (
            <Button variant="contained">GENERATE</Button>
          ) : (
            <Button variant="contained">APPLY</Button>
          )}

          <div style={{ width: "10px" }}></div>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#E0E0E0",
              color: "black",
              "&:hover": { backgroundColor: "#E0E0E0" },
            }}
            onClick={handleCloseSearchFilter}
          >
            CANCEL
          </Button>
        </div>
      </Box>
    </>
  );
};
export default FilterModal;
