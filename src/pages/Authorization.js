import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { postAccessTokenAPIMethod } from "../api/client";

const Authorization = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    console.log("code: ", code);

    // BE에 받은 code(access_code) 보내주기
    // post해서 받은 걸 확인하고 괜찮으면 redirect
    postAccessTokenAPIMethod(code).then((res) => {
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
