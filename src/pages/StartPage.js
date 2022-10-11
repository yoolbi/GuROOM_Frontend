import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { deleteRevokeAPIMethod, getAuthorizeAPIMethod } from "../api/client";

const startPage = () => {
  const [user, setUser] = useState(false);

  const [, , removeCredentials] = useCookies(["credentials"]);
  const [, , removeState] = useCookies(["state"]);

  const handleClickLogout = () => {
    removeCredentials("credentials");
    removeState("state");
    console.log("로그아웃");
  };

  const [accessTokenRevoke, , removeAccessTokenRevoke] = useCookies([
    "access_token_cookie",
  ]);
  const handleClickRevoke = () => {
    console.log("after revoke: ", accessTokenRevoke);
    removeAccessTokenRevoke("access_token_cookie");
    deleteRevokeAPIMethod(accessTokenRevoke).then((res) => {
      console.log("revoke: ", res);
    });
  };

  const googleAuth = () => {
    // getUserAPIMethod().then((user) => {
    //   console.log("user: " + JSON.stringify(user));
    //   console.log("user.status: ", user.status);
    //   if (user.status === 200) {
    //     console.log("user status 200: " + JSON.stringify(user));
    //     setUser(true);
    //   } else {
    //     getAuthorizeAPIMethod().then((data) => {
    //       console.log("authorize data: " + JSON.stringify(data));
    //       console.log("authorize data.body: " + JSON.stringify(data.body));
    //       window.location.replace(data.body);
    //     });
    //   }
    // });
    setUser(false);
    getAuthorizeAPIMethod().then((data) => {
      console.log("authorize data: " + JSON.stringify(data));
      console.log("authorize data.body: " + JSON.stringify(data.body));
      window.location.replace(data.body);
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
          {user ? (
            <Link to={"/Homepage"}>
              <img
                src="./img/signin_google.png"
                style={{ height: "50px" }}
                onClick={googleAuth}
              ></img>
            </Link>
          ) : (
            <Link to={"/InitialSetup"}>
              <img
                src="./img/signin_google.png"
                style={{ height: "50px" }}
                onClick={googleAuth}
              ></img>
            </Link>
          )}
          <Link to={"/InitialSetup"}>
            <img
              src="./img/signin_dropbox.png"
              style={{ height: "50px" }}
            ></img>
          </Link>
        </div>
      </div>
      <div onClick={handleClickLogout}>로그아웃</div>
      <div onClick={handleClickRevoke}>revoke</div>
    </div>
  );
};

export default startPage;
