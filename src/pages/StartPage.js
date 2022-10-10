import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

const startPage = () => {
  const [user, setUser] = useState(false);

  const [removeCookie] = useCookies(["credentials"]);

  const handleClickLogout = () => {
    removeCookie("credentials", { path: "/" });
    console.log("로그아웃");
  };

  const googleAuth = () => {
    fetch("https://guroom.live/apps/auth/v1/google/user", {
      credentials: "include",
    })
      .then((res) =>
        res.json().then((data) => ({ status: res.status, body: data }))
      )
      .then((obj) => {
        console.log(obj);
        if (obj.status === 200) {
          //200: user가 있는 경우 바로 홈페이지로
          console.log(obj.status + "200");
          // setUser(true);
        } else {
          fetch("https://guroom.live/apps/auth/v1/google/authorize", {
            credentials: "include",
          })
            .then((res) =>
              res.json().then((data) => ({ status: res.status, body: data }))
            )
            .then((obj) => {
              window.location.replace(obj.body);
              console.log(obj.body);
              // window.open(obj.body);
              console.log(obj);
              setUser(true);
            });
          //201 & 401: user가 없는 경우
          console.log(obj.status);
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
    </div>
  );
};

export default startPage;
