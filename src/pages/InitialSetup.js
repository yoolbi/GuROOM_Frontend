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
import { postFileSnapshotAPIMethod } from "../api/client";

// // register lottie and define custom element
defineLordIconElement(lottie.loadAnimation);

const steps = [
  {
    label: "Take Snapshot of Drive",
  },
  {
    label: "Take Snapshot of Group",
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
  // border: "2px solid #000",
  // boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

const InitialSetup = () => {
  const [open, setOpen] = React.useState(false);
  const [openDone, setOpenDone] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleOpenDone = () => setOpenDone(true);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleNextModal = () => {
    handleOpen();
    postFileSnapshotAPIMethod(fileSnapshot).then((data) => {
      console.log(data);
      console.log(data.status);
      if (data.status === 201) {
        handleOpenDone();
        setTimeout(() => {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }, 3000);
      }
    });
    // setTimeout(() => {
    //   handleOpenDone();
    //   setTimeout(() => {
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //   }, 3000);
    // }, 15000);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [fileSnapshot, setFileSnapshot] = useState("");
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
        <Link to="/InitialSetup">
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
                        ) : index === 1 ? (
                          <TextField
                            id="outlined-basic"
                            label="Group snapshot name"
                            variant="outlined"
                            style={{ width: "100%", marginTop: "15px" }}
                          />
                        ) : null}

                        <div style={{ marginTop: "15px" }}>
                          {index === steps.length - 1 ? (
                            <Link
                              to={"/Homepage"}
                              style={{ textDecoration: "none" }}
                            >
                              <Button variant="contained" sx={{ mt: 1, mr: 1 }}>
                                GUROOM YOUR DRIVE
                              </Button>
                            </Link>
                          ) : index === 0 ? (
                            <Button
                              variant="contained"
                              onClick={handleNext}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              Continue
                            </Button>
                          ) : (
                            <>
                              <Button
                                variant="contained"
                                onClick={handleNextModal}
                                sx={{ mt: 1, mr: 1 }}
                              >
                                Continue
                              </Button>
                              <Modal open={open}>
                                <Box sx={style}>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      top: "-10px",
                                      position: "absolute",
                                      left: "18%",
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

export default InitialSetup;
