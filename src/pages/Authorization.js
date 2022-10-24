import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { postAccessTokenAPIMethod } from "../api/client";
import urlJoin from "url-join";

const Authorization = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    console.log("code: ", code);

    // BE에 받은 code(access_code) 보내주기
    // post해서 받은 걸 확인하고 괜찮으면 redirect
    postAccessTokenAPIMethod(code).then((res) => {
      console.log(res);
      console.log(res.status);
      if (res.status === 201) {
        window.location.replace(
          urlJoin(process.env.REACT_APP_FRONTEND_URL, "/InitialSetup")
        );
      } else if (res.status === 200) {
        window.location.replace(
          urlJoin(process.env.REACT_APP_FRONTEND_URL, "/Homepage")
        );
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
      <h4>processing authorization...</h4>
    </div>
  );
};

export default Authorization;
