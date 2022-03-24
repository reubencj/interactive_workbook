import Signup from "../components/Signup";
import Login from "../components/Login";
import AppContext from "../context/AppContext";
import { useState, React, useEffect } from "react";

const LoginPage = (props) => {
  useEffect(() => sessionStorage.removeItem("access_token"));

  return (
    <>
      <div className="col-fluid mx-0">
        <h1 className="text-center display-1 bg-primary shadow text-white">
          iWorkbook
        </h1>
      </div>
      <div className="container-md mt-4">
        <div className="row">
          <div className="col-md">
            <Signup />
          </div>
          <div className="col-md">
            <Login />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
