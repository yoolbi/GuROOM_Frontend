import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Authorization = () => {
  const { state, code } = useParams();

  useEffect(() => {
    console.log("state: ", state);
    console.log("code: ", code);
  }, [state, code]);

  return (
    <div>
      <h4>processing authorization...</h4>
    </div>
  );
};

export default Authorization;
