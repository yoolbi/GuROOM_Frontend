import { Link } from "react-router-dom";
import React from "react";
import {
  getAuthorizeAPIMethod,
  getUserAPIMethod,
  postRefreshAPIMethod,
} from "../api/client";
import urlJoin from "url-join";

const startPage = () => {
  const googleAuth = () => {
    getUserAPIMethod().then((user) => {
      console.log(user);
      console.log(user.status);
      console.log(user.body);
      if (user.status === 200) {
        window.location.replace(
          urlJoin(process.env.REACT_APP_FRONTEND_URL, "/Homepage")
        );
      } else if (user.status === 201) {
        window.location.replace(
          urlJoin(process.env.REACT_APP_FRONTEND_URL, "/InitialSetup")
        );
      } else {
        //Todo: create refresh, refresh 가 실패시 authorize. refresh가 성공하면 다시 getUser
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
                  console.log("authorize data: " + JSON.stringify(data));
                  console.log(
                    "authorize data.body: " + JSON.stringify(data.body)
                  );
                  window.location.replace(data.body);
                });
              }
            });
          } else {
            getAuthorizeAPIMethod().then((data) => {
              console.log("authorize data: " + JSON.stringify(data));
              console.log("authorize data.body: " + JSON.stringify(data.body));
              window.location.replace(data.body);
            });
          }
        });
      }
    });
  };

  return (
    <div style={{ height: "100vh" }}>
      <div
        style={{
          height: "65px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link to="/">
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
        <Link to={"/"} style={{ margin: "10px", marginRight: "10%" }}>
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

              fontFamily: "Poppins",
              fontSize: "14px",
            }}
          ></input>
        </Link>
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
          <img
            src="./img/signin_google.png"
            style={{ height: "50px", cursor: "pointer" }}
            onClick={googleAuth}
          ></img>
          <img
            src="./img/signin_dropbox.png"
            style={{ height: "50px", cursor: "pointer" }}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default startPage;
