import React, { useState, useEffect } from "react";
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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import PeopleIcon from "@mui/icons-material/People";
import {
  deleteLogoutAPIMethod,
  getAuthorizeAPIMethod,
  getGroupAPIMethod,
  getUserAPIMethod,
  postGroupAPIMethod,
  postRefreshAPIMethod,
} from "../api/client";
import urlJoin from "url-join";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

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

const styleForGroupCreationModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  height: "30%",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

//This is the Homepage of our website.
const Homepage = () => {
  const [value, setValue] = useState("home");
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  //search
  const [searchInput, setSearchInput] = useState("");

  //This is for the scalability: we are going to provide two drives: Google Drive and Dropbox.
  const [drive, setDrive] = useState("google");
  const handleChange = (event) => {
    setDrive(event.target.value);
    if (event.target.value === "dropbox") {
      window.location.replace(
        urlJoin(process.env.REACT_APP_FRONTEND_URL, "/HomepageDropbox")
      );
    }
  };

  //This is for the group membership snapshot.
  const [openGroup, setOpenGroup] = useState(true);
  const handleClickOpenGroup = () => {
    setOpenGroup(!openGroup);
  };

  // group creation modal
  const [openGroupCreationModal, setOpenGroupCreationModal] = useState(false);
  const handleOpenGroupCreationModal = () => setOpenGroupCreationModal(true);
  const handleCloseGroupCreationModal = () => setOpenGroupCreationModal(false);
  const [createGroupName, setCreateGroupName] = useState("");
  const [createGroupEmail, setCreateGroupEmail] = useState("");
  const [createGroupDate, setCreateGroupDate] = useState(dayjs(new Date()));
  const [createGroupFile, setCreateGroupFile] = useState({});
  const [createGroupFileValue, setCreateGroupFileValue] = useState("");

  const handleChangeCreateGroupName = (e) => {
    setCreateGroupName(e.target.value);
  };

  const handleChangeCreateGroupEmail = (e) => {
    setCreateGroupEmail(e.target.value);
  };

  const handleCreateGroupFile = (e) => {
    setCreateGroupFileValue(e.target.value);
    setCreateGroupFile(e.target.files[0]);
  };

  //The user clicks the "make a group" button, then the modal appears, and the user inputs the group name & email, and file.
  //Then, the user clicks the "create" button, then the group membership snapshot is created.
  const handleClickCreateGroup = () => {
    const formData = new FormData();
    formData.append("file", createGroupFile);
    formData.append("group_name", createGroupName);
    formData.append("group_email", createGroupEmail);
    //The dateTime will automatically set up.
    formData.append("create_time", createGroupDate.format());
    postGroupAPIMethod(formData).then((res) => {
      console.log("post group: ", res);
      if (res.status === 201) {
        handleCloseGroupCreationModal();
      }
    });
  };

  //When the user clicks the logo on the top, then will go to the home table.
  const handleClickLogo = () => {
    setValue("home");
  };

  //Profile
  const [openProfile, setOpenProfile] = React.useState(false);
  const handleOpenProfile = () => setOpenProfile(true);
  const handleCloseProfile = () => setOpenProfile(false);

  //Alert Logout
  const [openLogout, setOpenLogout] = React.useState(false);
  const handleClickOpenLogout = () => {
    setOpenLogout(true);
  };
  const handleCloseLogout = () => {
    setOpenLogout(false);
  };
  const handleLogout = () => {
    console.log("logout");
    deleteLogoutAPIMethod().then((res) => {
      if (res.status === 200) {
        window.location.replace(
          urlJoin(process.env.REACT_APP_FRONTEND_URL, "/")
        );
      } else {
        console.log("logout failed: ", res);
      }
    });
  };

  //Alert Withdrawal
  const [openWithdrawal, setOpenWithdrawal] = React.useState(false);
  const handleClickOpenWithdrawal = () => {
    setOpenWithdrawal(true);
  };
  const handleCloseWithdrawal = () => {
    setOpenWithdrawal(false);
  };

  const [user, setUser] = useState(null);

  //When the user enter the Homepage, we will automatically get the user information. If there are no information in the DB, then will show the initial page.
  useEffect(() => {
    getUserAPIMethod().then((user) => {
      console.log("get user: ", user);
      if (user.status === 200) {
        setUser(user.body);
      } else if (user.status === 201) {
        window.location.replace(
          urlJoin(process.env.REACT_APP_FRONTEND_URL, "/InitialSetup")
        );
        setUser(user.body);
      } else {
        //create refresh, refresh 가 실패시 authorize. refresh가 성공하면 다시 getUser
        //check if the token has expired
        postRefreshAPIMethod().then((data) => {
          if (data.status === 200) {
            getUserAPIMethod().then((user) => {
              if (user.status === 200) {
                window.location.replace(
                  urlJoin(process.env.REACT_APP_FRONTEND_URL, "/Homepage")
                );
              } else if (user.status === 201) {
                window.location.replace(
                  urlJoin(process.env.REACT_APP_FRONTEND_URL, "/InitialSetup")
                );
              } else {
                getAuthorizeAPIMethod().then((data) => {
                  window.location.replace(data.body);
                });
              }
            });
          } else {
            getAuthorizeAPIMethod().then((data) => {
              window.location.replace(data.body);
            });
          }
        });
      }
    });
  }, []);

  const [groups, setGroups] = useState([]);
  //getGroup
  useEffect(() => {
    getGroupAPIMethod().then((data) => {
      setGroups(data.body);
      console.log("get groups: ", data);
    });
  }, [openGroupCreationModal]);

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
            }}
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
            {/*show groups*/}
            <div
              style={{
                height: "90%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div className="groupSelect" style={{ height: "93%" }}>
                <List
                  sx={{
                    height: "90%",
                    overflowY: "auto",
                  }}
                >
                  {groups.map((data, i) => {
                    return (
                      <List
                        sx={{
                          width: "90%",
                          // maxWidth: 560,
                          bgcolor: "background.paper",
                          marginTop: "10px",
                          maxHeight: "185px",
                        }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        key={i}
                      >
                        <ListItem key={i}>
                          <ListItemIcon>
                            <PeopleIcon />
                          </ListItemIcon>
                          <ListItemText primary={data["group_name"]} />
                        </ListItem>
                        <List
                          sx={{
                            maxHeight: "125px",
                            overflowY: "auto",
                          }}
                        >
                          {data["memberships"].map(
                            (membership, membershipIndex) => {
                              return (
                                <List
                                  component="div"
                                  disablePadding
                                  key={membershipIndex}
                                >
                                  <ListItem
                                    sx={{ pl: 4, marginLeft: "40px" }}
                                    key={membershipIndex}
                                  >
                                    <ListItemText
                                      style={{ marginBottom: "10px" }}
                                      primary={membership["email"]}
                                    />
                                  </ListItem>
                                </List>
                              );
                            }
                          )}
                        </List>
                      </List>
                    );
                  })}
                </List>
              </div>
              <Button
                variant="contained"
                style={{ width: "60%", margin: "0px 20%" }}
                onClick={handleOpenGroupCreationModal}
              >
                Make a Group
              </Button>
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "90%",
                overflowY: "auto",
              }}
            >
              {groups.map((data) => {
                return (
                  <img
                    src="/img/groupSelected.png"
                    style={{
                      width: "35px",
                      height: "25px",
                      margin: "5px 0px 30px 24px",
                    }}
                    key={data["group_name"]}
                  />
                );
              })}
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

      <div className="Tab" style={{ width: "100%" }}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              {/*tabs: Home, Access Control, Compare Snapshots*/}
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
              <Home searchInput={searchInput} setSearchInput={setSearchInput} />
            </TabPanel>
            <TabPanel value="accessControl">
              <AccessControl
                setValue={setValue}
                setSearchInput={setSearchInput}
              />
            </TabPanel>
            <TabPanel value="compareSnapshots">
              <CompareSnapshots />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
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
              <ListItemButton onClick={handleClickOpenLogout}>
                <ListItem disablePadding>
                  <ListItemText primary="Logout" />
                </ListItem>
              </ListItemButton>
              <ListItemButton onClick={handleClickOpenWithdrawal}>
                <ListItem disablePadding>
                  <ListItemText primary="Close your account" />
                </ListItem>
              </ListItemButton>
            </List>
          </nav>
        </Box>
      </Modal>
      <Dialog
        open={openLogout}
        onClose={handleCloseLogout}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure want to logout?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseLogout}>Cancel</Button>
          <Button onClick={handleLogout} autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openWithdrawal}
        onClose={handleCloseWithdrawal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure want to close your account?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseWithdrawal}>Cancel</Button>
          <Button onClick={handleCloseWithdrawal} autoFocus>
            Withdrawal
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
        open={openGroupCreationModal}
        onClose={handleCloseGroupCreationModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/*Modal for taking group membership snapshots*/}
        <Box sx={styleForGroupCreationModal}>
          <form>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2 style={{ margin: "0px" }}>Create Group</h2>
              <ClearIcon
                fontSize="medium"
                onClick={handleCloseGroupCreationModal}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div
              style={{
                width: "100%",
                marginTop: "30px",
                marginBottom: "30px",
              }}
            >
              <TextField
                id="outlined-read-only-input"
                label="Group Name"
                style={{ marginBottom: "15px", width: "95%" }}
                onChange={handleChangeCreateGroupName}
              />
              <TextField
                id="outlined-read-only-input"
                label="Group Email"
                style={{ marginBottom: "15px", width: "95%" }}
                onChange={handleChangeCreateGroupEmail}
              />
              <div
                style={{
                  width: "95%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  style={{ marginBottom: "15px", width: "95%" }}
                >
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Created Date"
                    value={createGroupDate}
                    onChange={(newValue) => {
                      setCreateGroupDate(newValue);
                    }}
                    maxDateTime={dayjs(new Date())}
                  />
                </LocalizationProvider>
                <div>
                  <Button
                    variant="contained"
                    component="label"
                    style={{
                      marginTop: "10px",
                      height: "35px",
                      marginLeft: "10px",
                    }}
                  >
                    Upload File
                    <input
                      hidden
                      accept="text/html"
                      type="file"
                      onChange={handleCreateGroupFile}
                    />
                  </Button>
                  <div style={{ marginTop: "5px", marginLeft: "10px" }}>
                    {createGroupFileValue}
                  </div>
                </div>

                <Button
                  variant="contained"
                  component="label"
                  style={{ marginTop: "10px", height: "35px" }}
                  onClick={handleClickCreateGroup}
                >
                  Create
                </Button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Homepage;
