import React, { useState, useEffect } from "react";
import {
  Box,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
  List,
  ListItemButton,
  ListItem,
  ListItemText,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import HomeDropbox from "../dropbox/HomeDropbox";
import AccessControlDropbox from "../dropbox/AccessControlDropbox";
import CompareSnapshotsDropbox from "../dropbox/CompareSnapshotsDropbox";
import urlJoin from "url-join";
import {
  getAuthorizeDropboxAPIMethod,
  getUserDropboxAPIMethod,
  postRefreshDropboxAPIMethod,
} from "../api/client";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

const HomepageDropbox = () => {
  const [tab, setTab] = useState("home");
  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  //search
  const [searchInput, setSearchInput] = useState("");

  //When the user clicks the logo on the top, then will go to the home table.
  const handleClickLogo = () => {
    setTab("home");
  };

  //This is for the scalability: we are going to provide two drives: Google Drive and Dropbox.
  const [drive, setDrive] = useState("dropbox");
  const handleChange = (event) => {
    setDrive(event.target.value);
    if (event.target.value === "google") {
      window.location.replace(
        urlJoin(process.env.REACT_APP_FRONTEND_URL, "/Homepage")
      );
    }
  };

  //Profile
  const [openProfile, setOpenProfile] = React.useState(false);
  const handleOpenProfile = () => setOpenProfile(true);
  const handleCloseProfile = () => setOpenProfile(false);

  const [user, setUser] = useState(null);

  //When the user enter the Homepage, we will automatically get the user information. If there are no information in the DB, then will show the initial page.
  useEffect(() => {
    getUserDropboxAPIMethod().then((user) => {
      console.log("get user: ", user);
      if (user.status === 200) {
        setUser(user.body);
      } else if (user.status === 201) {
        window.location.replace(
          urlJoin(process.env.REACT_APP_FRONTEND_URL, "/InitialSetupDropbox")
        );
        setUser(user.body);
      } else {
        //create refresh, refresh 가 실패시 authorize. refresh가 성공하면 다시 getUser
        //check if the token has expired
        postRefreshDropboxAPIMethod().then((data) => {
          if (data.status === 200) {
            getUserDropboxAPIMethod().then((user) => {
              if (user.status === 200) {
                window.location.replace(
                  urlJoin(
                    process.env.REACT_APP_FRONTEND_URL,
                    "/HomepageDropbox"
                  )
                );
              } else if (user.status === 201) {
                window.location.replace(
                  urlJoin(
                    process.env.REACT_APP_FRONTEND_URL,
                    "/InitialSetupDropbox"
                  )
                );
              } else {
                getAuthorizeDropboxAPIMethod().then((data) => {
                  window.location.replace(data.body);
                });
              }
            });
          } else {
            getAuthorizeDropboxAPIMethod().then((data) => {
              window.location.replace(data.body);
            });
          }
        });
      }
    });
  }, []);

  return (
    <div className="Tab" style={{ width: "100%" }}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tab}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            {/*tabs: HomeDropbox, Access Control, Compare Snapshots*/}
            <TabList
              onChange={handleChangeTab}
              aria-label="lab API tabs example"
            >
              <img
                src="/img/startpage_logo.png"
                style={{
                  height: "60px",
                  alignItems: "center",
                  display: "flex",
                  minHeight: "56px",
                  padding: "10px 10px 0px 10px",
                  cursor: "pointer",
                }}
                onClick={handleClickLogo}
              ></img>
              <Tab label="Home" value="home" />
              <Tab label="Access Control" value="accessControl" />
              <Tab label="Compare Snapshots" value="compareSnapshots" />
              <div style={{ width: "70%" }}></div>
              {/*drivechange&profile*/}
              <div
                style={{
                  display: "flex",
                  marginRight: "2%",
                }}
              >
                <Box sx={{ minWidth: 75 }}>
                  <FormControl sx={{ m: 1, minWidth: 75 }} size="small">
                    <InputLabel id="demo-simple-select-label">Drive</InputLabel>
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
                  src={user?.picture || "/img/profile_image_blank.png"}
                  style={{
                    width: "40px",
                    height: "40px",
                    marginTop: "15px",
                    borderRadius: "50px",
                    cursor: "pointer",
                  }}
                  onClick={handleOpenProfile}
                />
              </div>
            </TabList>
          </Box>

          <TabPanel value="home">
            <HomeDropbox
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
          </TabPanel>
          <TabPanel value="accessControl">
            <AccessControlDropbox
              setTab={setTab}
              setSearchInput={setSearchInput}
            />
          </TabPanel>
          <TabPanel value="compareSnapshots">
            <CompareSnapshotsDropbox />
          </TabPanel>
        </TabContext>
      </Box>

      {/*profile modal*/}
      <Modal
        open={openProfile}
        onClose={handleCloseProfile}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <nav aria-label="main mailbox folders">
            <List>
              <ListItemButton>
                <ListItem disablePadding>
                  <ListItemText primary="Logout" />
                </ListItem>
              </ListItemButton>
              <ListItemButton>
                <ListItem disablePadding>
                  <ListItemText primary="Close your account" />
                </ListItem>
              </ListItemButton>
            </List>
          </nav>
        </Box>
      </Modal>
    </div>
  );
};

export default HomepageDropbox;
