import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import Passkey from "./Passkey";

const Index = () => {
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState(null);
  if (!passkey || error) {
    return (
      <Passkey setpasskey={setPasskey} error={error} setError={setError}/>
    );
  }
  return (
    <Outlet/>
  );
};

export default Index;
