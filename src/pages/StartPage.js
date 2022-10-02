// import { Link } from "react-router-dom";
import React from "react";

const startPage = () => {
  return (
    <div style={{ height: "100vh" }}>
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
            marginLeft: "10%",
            alignItems: "center",
            display: "flex",
            minHeight: "56px",
          }}
        ></img>
        <input
          type="button"
          value="Sign in"
          style={{
            borderRadius: "20px",
            borderColor: "#1976D2",
            color: "#1976D2",
            backgroundColor: "#ffffff",
            height: "40px",
            padding: "8px 25px 10px 25px",
            margin: "10px",
            marginRight: "10%",
            fontFamily: "Poppins",
            fontSize: "14px",
          }}
        ></input>
      </div>
      <div
        style={{
          justifyContent: "space-evenly",
          display: "flex",
          position: "absolute",
          top: "20%",
        }}
      >
        <div>
          <img
            src="/img/startImg.png"
            style={{
              height: "80%",
              marginLeft: "40%",
            }}
          ></img>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "250px",
            justifyContent: "space-evenly",
            marginTop: "5%",
            marginLeft: "200px",
          }}
        >
          <div style={{ fontFamily: "Poppins", fontSize: "30px" }}>Sign In</div>
          <img src="./img/signin_google.png" style={{ height: "50px" }}></img>
          <img src="./img/signin_dropbox.png" style={{ height: "50px" }}></img>
        </div>
      </div>
    </div>
  );
};

export default startPage;
