import React from "react";
import { useParams } from "react-router-dom";

const Authorization = () => {
  const { state, code } = useParams();

  return (
    <div>
      <div>state: {state}</div>
      <div>code: {code}</div>
    </div>
  );
};

export default Authorization;
