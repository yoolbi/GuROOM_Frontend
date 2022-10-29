import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getUserDropboxAPIMethod,
  postAccessTokenDropboxAPIMethod,
} from "../api/client";
import urlJoin from "url-join";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

//This is the management of authorization. (Dropbox)
//When the user is on the first time to use our website, then the status would be 201. The website will go to the initial setup page.
//When the user already uses our website before, then the status would be 200. The website will go to the homepage.
const AuthorizationDropbox = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    console.log("code: ", code);

    // BE에 받은 code(access_code) 보내주기
    // post해서 받은 걸 확인하고 괜찮으면 redirect
    postAccessTokenDropboxAPIMethod(code).then((res) => {
      console.log(res);
      console.log(res.status);
      if (res.status === 201) {
        getUserDropboxAPIMethod().then((data) => {
          if (data.status === 201) {
            window.location.replace(
              urlJoin(
                process.env.REACT_APP_FRONTEND_URL,
                "/InitialSetupDropbox"
              )
            );
          } else if (data.status === 200) {
            window.location.replace(
              urlJoin(process.env.REACT_APP_FRONTEND_URL, "/HomepageDropbox")
            );
          } else {
            window.location.replace(
              urlJoin(process.env.REACT_APP_FRONTEND_URL, "/LoginFailed")
            );
          }
        });
      } else {
        console.log("login error");
        window.location.replace(
          urlJoin(process.env.REACT_APP_FRONTEND_URL, "/LoginFailed")
        );
      }
    });
  }, []);

  return (
    <div>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "200px" }}
      >
        <CircularProgress />
        <h4 style={{ marginLeft: "10px" }}>Processing authorization...</h4>
      </Box>
    </div>
  );
};

export default AuthorizationDropbox;
