import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { postAccessTokenAPIMethod } from "../api/client";
import { useCookies } from "react-cookie";

const Authorization = () => {
  const [searchParams] = useSearchParams();
  const [accessToken] = useCookies(["access_token_cookie"]);

  useEffect(() => {
    const code = searchParams.get("code");
    console.log("code: ", code);

    // BE에 받은 code(access_code) 보내주기
    // post해서 받은 걸 확인하고 괜찮으면 redirect
    postAccessTokenAPIMethod(code, accessToken).then((res) => {
      console.log(res);
      if (res === 201) {
        window.location.replace("https://guroom.live/InitialSetup");
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
