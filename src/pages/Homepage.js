import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Home from "./Home";
import AccessControl from "./AccessControl";
import CompareSnapshots from "./CompareSnapshots";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import { Link } from "react-router-dom";

const Homepage = () => {
  const [value, setValue] = React.useState("home");

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const [drive, setDrive] = React.useState("google");

  const handleChange = (event) => {
    setDrive(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "99.8vh",
        width: "100vw",
        position: "absolute",
        overflowY: "hidden",
      }}
    >
      {value === "home" ? (
        <div
          className="Left"
          style={{
            borderRight: "1px solid #DBDBDB",
            width: "30%",
            minWidth: "250px",
          }}
          // style={{ border: "1px solid black", width: "30%", minWidth: "250px" }}
        >
          <div
            style={{
              height: "65px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <img
              src="/img/startpage_logo.png"
              style={{
                height: "60px",
                alignItems: "center",
                display: "flex",
                minHeight: "56px",
                padding: "10px",
              }}
            ></img>
          </div>
        </div>
      ) : (
        <div style={{ borderRight: "1px solid #DBDBDB" }}>
          <img src="/img/logo.png" style={{ width: 60, marginTop: "15px" }} />
        </div>
      )}

      {/*<div className="Tab" style={{ border: "1px solid red", width: "100%" }}>*/}
      <div className="Tab" style={{ width: "100%" }}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <TabList
                onChange={handleChangeTab}
                aria-label="lab API tabs example"
              >
                <Tab label="Home" value="home" />
                <Tab label="Access Control" value="accessControl" />
                <Tab label="Compare Snapshots" value="compareSnapshots" />
                {value === "home" ? (
                  <div style={{ width: "55%" }}></div>
                ) : (
                  <div style={{ width: "70%" }}></div>
                )}
                {/*drivechange&profile*/}
                <div
                  style={{
                    display: "flex",
                    marginRight: "2%",
                  }}
                >
                  <Box sx={{ minWidth: 75 }}>
                    <FormControl sx={{ m: 1, minWidth: 75 }} size="small">
                      <InputLabel id="demo-simple-select-label">
                        Drive
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={drive}
                        label="Drive"
                        onChange={handleChange}
                      >
                        <MenuItem value="google">
                          <img
                            src="/img/Google_image.png"
                            style={{ paddingTop: "5px", width: "25px" }}
                          />
                        </MenuItem>
                        <MenuItem value="dropbox">
                          <img
                            src="/img/Dropbox_image.png"
                            style={{
                              paddingTop: "5px",
                              width: "25px",
                            }}
                          />
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <img
                    src="/img/profile_image.png"
                    style={{ width: "40px", height: "40px", marginTop: "15px" }}
                  />
                </div>
              </TabList>
            </Box>

            <TabPanel value="home">
              <Home />
            </TabPanel>
            <TabPanel value="accessControl">
              <AccessControl />
            </TabPanel>
            <TabPanel value="compareSnapshots">
              <CompareSnapshots />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default Homepage;
