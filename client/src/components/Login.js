import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Textbox from "./Textbox";
import Alert from "./Alert";

import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [success, setSuccess] = useState({});
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      login_email: loginEmail,
      login_password: loginPassword,
    };

    axios
      .post("http://localhost:8000/login", data)
      .then((resp) => {
        setSuccess(resp.data);
        console.log(success.session_data);

        setErrors({});
        navigate("/user");
      })
      .catch((err) => setErrors(err.response.data));
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <Textbox
        label="Email"
        value={loginEmail}
        setState={setLoginEmail}
        name="loginEmail"
      />
      {errors.login_email && <Alert label={errors.login_email} />}

      <Textbox
        label="Password"
        value={loginPassword}
        setState={setLoginPassword}
        name="loginPassword"
        type="password"
      />
      {errors.login_password && <Alert label={errors.login_password} />}

      <button type="submit" className="btn btn-success">
        Login
      </button>
      {success.message && <Alert label={success.message} success />}
    </form>
  );
};

export default Login;
