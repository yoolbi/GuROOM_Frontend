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
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
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

  const [openGroup, setOpenGroup] = React.useState(true);
  const handleClickOpenGroup = () => {
    setOpenGroup(!openGroup);
    console.log(openGroup);
  };

  const [group, setGroup] = React.useState("");
  const handleSelectGroup = (event) => {
    setGroup(event.target.value);
  };

  const handleClickLogo = () => {
    setValue("home");
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
        openGroup ? (
          <div
            className="Left"
            style={{
              borderRight: "1px solid #DBDBDB",
              width: "30%",
              // minWidth: "420px",
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
                  cursor: "pointer",
                }}
                onClick={handleClickLogo}
              ></img>
              <img
                src="/img/closeGroup.png"
                style={{
                  width: "20px",
                  height: "20px",
                  marginTop: "30px",
                  marginRight: "15px",
                  cursor: "pointer",
                }}
                onClick={handleClickOpenGroup}
              ></img>
            </div>
            <div className="groupSelect">
              {/*<div style={{ marginLeft: "60%", color: "#8A8D92" }}>*/}
              {/*  2022.12.23 12:00:05*/}
              {/*</div>*/}
              <Box
                sx={{ width: "96.5%" }}
                style={{ margin: "20px 0px 15px 13px" }}
              >
                <FormControl sx={{ width: "96.5%" }} size="small">
                  <InputLabel id="baseFileSelect">Group Snapshot</InputLabel>
                  <Select
                    labelId="group-select"
                    id="group-select"
                    value={group}
                    label="group snapshot"
                    onChange={handleSelectGroup}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Paper
                component="form"
                sx={{
                  width: "93%",
                  height: 40,
                }}
                style={{ marginLeft: "13px" }}
              >
                <IconButton type="button" aria-label="search">
                  <SearchIcon />
                </IconButton>
                <InputBase
                  sx={{ width: "80%" }}
                  placeholder="Group name, domain, user"
                  inputProps={{ "aria-label": "search google maps" }}
                />
              </Paper>
            </div>
          </div>
        ) : (
          <div
            style={{
              borderRight: "1px solid #DBDBDB",
              width: "85px",
            }}
          >
            <div style={{ display: "flex", marginBottom: "30px" }}>
              <img
                src="/img/logo.png"
                style={{ width: 60, marginTop: "15px", cursor: "pointer" }}
                onClick={handleClickLogo}
              />
              <img
                src="/img/openGroup.png"
                style={{
                  width: "15px",
                  height: "15px",
                  marginTop: "31px",
                  cursor: "pointer",
                }}
                onClick={handleClickOpenGroup}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <img
                src="/img/groupSelected.png"
                style={{
                  width: "35px",
                  height: "25px",
                  margin: "5px 0px 5px 24px",
                }}
              />
              <img
                src="/img/groupUnselected.png"
                style={{
                  width: "35px",
                  height: "25px",
                  margin: "5px 0px 5px 24px",
                }}
              />
            </div>
          </div>
        )
      ) : (
        <div style={{ borderRight: "1px solid #DBDBDB" }}>
          <img
            src="/img/logo.png"
            style={{ width: 60, marginTop: "15px", cursor: "pointer" }}
            onClick={handleClickLogo}
          />
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
                  openGroup ? (
                    <div style={{ width: "55%" }}></div>
                  ) : (
                    <div style={{ width: "68%" }}></div>
                  )
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
