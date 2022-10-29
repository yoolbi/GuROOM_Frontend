import { Link } from "react-router-dom";
import React from "react";
import {
  getAuthorizeAPIMethod,
  getAuthorizeDropboxAPIMethod,
  getUserAPIMethod,
  getUserDropboxAPIMethod,
  postRefreshAPIMethod,
  postRefreshDropboxAPIMethod,
} from "../api/client";
import urlJoin from "url-join";

//Starting page of GuRoom where user selects to log in with Google or Dropbox
const startPage = () => {
  const googleAuth = () => {
    //get user info
    getUserAPIMethod().then((user) => {
      console.log(user); //log user info
      //if user is valid and have a file snapshot, goto Homepage
      if (user.status === 200) {
        window.location.replace(
          urlJoin(process.env.REACT_APP_FRONTEND_URL, "/Homepage")
        );
      } else if (user.status === 201) {
        //if the user is valid but do not have a file snapshot, goto initial setup
        window.location.replace(
          urlJoin(process.env.REACT_APP_FRONTEND_URL, "/InitialSetup")
        );
      } else {
        //if the user is invalid, refresh the token to check if the token has expired
        postRefreshAPIMethod().then((data) => {
          //if the token has successfully refreshed, get user info again
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
                //if the user is invalid, go to authorization
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
            //if the token has failed refreshing, authorize
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

  const dropboxAuth = () => {
    //get user info
    getUserDropboxAPIMethod().then((user) => {
      console.log(user); //log user info
      //if user is valid and have a file snapshot, goto Homepage
      if (user.status === 200) {
        window.location.replace(
          urlJoin(process.env.REACT_APP_FRONTEND_URL, "/HomepageDropbox")
        );
      } else if (user.status === 201) {
        //if the user is valid but do not have a file snapshot, goto initial setup
        window.location.replace(
          urlJoin(process.env.REACT_APP_FRONTEND_URL, "/InitialSetupDropbox")
        );
      } else {
        //if the user is invalid, refresh the token to check if the token has expired
        postRefreshDropboxAPIMethod().then((data) => {
          //if the token has successfully refreshed, get user info again
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
                //if the user is invalid, go to authorization
                getAuthorizeDropboxAPIMethod().then((data) => {
                  console.log("authorize data: " + JSON.stringify(data));
                  console.log(
                    "authorize data.body: " + JSON.stringify(data.body)
                  );
                  window.location.replace(data.body);
                });
              }
            });
          } else {
            //if the token has failed refreshing, authorize
            getAuthorizeDropboxAPIMethod().then((data) => {
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
            onClick={dropboxAuth}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default startPage;
