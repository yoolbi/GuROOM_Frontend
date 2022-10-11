import React from "react";
import { Link } from "react-router-dom";

const LoginFailed = () => {
  return (
    <div>
      <h4>Login Failed. Go back to the</h4>
      <Link to="/">
        <h4>Start Page</h4>
      </Link>
    </div>
  );
};

export default LoginFailed;
