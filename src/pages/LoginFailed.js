import React from "react";
import { Link } from "react-router-dom";

//When the user fails to log in, then we will show this page to try again on the main page.
const LoginFailed = () => {
  return (
    <div style={{ textAlign: "-webkit-center" }}>
      <h4>Login Failed. Go back to the</h4>
      <Link to="/">
        <h4>Start Page</h4>
      </Link>
    </div>
  );
};

export default LoginFailed;
