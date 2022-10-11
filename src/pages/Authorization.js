import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Authorization = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    console.log("code: ", code);
    console.log("state: ", state);

    // BE에 받은 code(access_code) 보내주기
    // post해서 받은 걸 확인하고 괜찮으면 redirect
  }, []);

  return (
    <div>
      <h4>processing authorization...</h4>
    </div>
  );
};

export default Authorization;
