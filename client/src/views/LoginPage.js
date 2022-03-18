import Signup from "../components/Signup";
import Login from "../components/Login";
import UserContext from "../context/UserContext";
import { useState, React } from "react";

const LoginPage = (props) => {
  return (
    <div className="container-md">
      <div className="row">
        <div className="col-md">
          <Signup />
        </div>
        <div className="col-md">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
