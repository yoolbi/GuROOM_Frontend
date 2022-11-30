import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import lottie from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";
import { postFileSnapshotDropboxAPIMethod } from "../api/client";

// // register lottie and define custom element
defineLordIconElement(lottie.loadAnimation);

const steps = [
  {
    label: "Take Snapshot of Drive",
  },
  {
    label: "Finished!",
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 400,
  bgcolor: "background.paper",
  borderRadius: "20px",
  p: 4,
};

//When the user is on the first time to use our website, then the website will go to the initial setup page.
//The user can take the first file snapshot in this page.
const InitialSetupDropbox = () => {
  const [open, setOpen] = React.useState(false);
  const [openDone, setOpenDone] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleOpenDone = () => setOpenDone(true);

  const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };
  //The modal with animation will appear while taking the first file snapshot.
  //After taking the snapshot, the modal shows the "Done!" and automatically closes.
  const handleNextModal = () => {
    handleOpen();
    postFileSnapshotDropboxAPIMethod(fileSnapshot).then((data) => {
      console.log(data.status);
      if (data.status === 201) {
        handleOpenDone();
        setTimeout(() => {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }, 3000);
      }
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [fileSnapshot, setFileSnapshot] = useState("");

  //The user can change the file snapshot name.
  const handleChangeFileSnapshot = (e) => {
    setFileSnapshot(e.target.value);
    console.log(fileSnapshot);
  };

  return (
    <div>
      <div
        style={{
          height: "65px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link to="/InitialSetupDropbox">
          <img
            src="/img/startpage_logo.png"
            style={{
              height: "60px",
              marginLeft: "10%",
              alignItems: "center",
              display: "flex",
              minHeight: "56px",
            }}
          ></img>
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          height: "92vh",
          overflowY: "hidden",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            paddingTop: "15%",
            height: "100%",
            width: "50%",
          }}
        >
          <Box>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>{step.label}</StepLabel>
                  <StepContent>
                    <Typography>{step.description}</Typography>
                    <Box sx={{ mb: 2 }}>
                      <div>
                        {index === 0 ? (
                          <TextField
                            id="outlined-basic"
                            label="Drive snapshot name"
                            variant="outlined"
                            style={{ width: "100%", marginTop: "15px" }}
                            onChange={handleChangeFileSnapshot}
                          />
                        ) : null}

                        <div style={{ marginTop: "15px" }}>
                          {index === steps.length - 1 ? (
                            <Link
                              to={"/HomepageDropbox"}
                              style={{ textDecoration: "none" }}
                            >
                              <Button variant="contained" sx={{ mt: 1, mr: 1 }}>
                                GUROOM YOUR DRIVE
                              </Button>
                            </Link>
                          ) : (
                            <>
                              <Button
                                variant="contained"
                                onClick={handleNextModal}
                                sx={{ mt: 1, mr: 1 }}
                              >
                                Continue
                              </Button>
                              {/*Here is the modal while taking the initial snapshot*/}
                              <Modal open={open}>
                                <Box sx={style}>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      top: "-10px",
                                      position: "absolute",
                                      left: "14%",
                                    }}
                                  >
                                    <lord-icon
                                      trigger="loop"
                                      src="icon_camera.json"
                                      style={{
                                        width: "350px",
                                        height: "350px",
                                        // marginLeft: "20%",
                                      }}
                                    ></lord-icon>
                                    <div
                                      style={{
                                        fontFamily: "Poppins",
                                        fontSize: "50px",
                                        textAlignLast: "center",
                                      }}
                                    >
                                      Taking A Snapshot
                                    </div>
                                  </div>
                                </Box>
                              </Modal>
                              <Modal open={openDone}>
                                <Box sx={style}>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      top: "0px",
                                      position: "absolute",
                                      left: "25%",
                                    }}
                                  >
                                    <lord-icon
                                      trigger="loop"
                                      src="icon_done.json"
                                      style={{
                                        width: "350px",
                                        height: "350px",
                                      }}
                                    ></lord-icon>
                                    <div
                                      style={{
                                        fontFamily: "Poppins",
                                        fontSize: "50px",
                                        textAlignLast: "center",
                                      }}
                                    >
                                      DONE!
                                    </div>
                                  </div>
                                </Box>
                              </Modal>
                            </>
                          )}
                          <Button
                            disabled={index === 0}
                            onClick={handleBack}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            Back
                          </Button>
                        </div>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default InitialSetupDropbox;
