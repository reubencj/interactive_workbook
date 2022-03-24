import React, { useState, useContext } from "react";
import axios from "axios";
import Textbox from "./Textbox";
import Alert from "./Alert";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [success, setSuccess] = useState({});
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { appContext, setAppContext } = useContext(AppContext);

  const handleAuthorLogin = (e) => {
    e.preventDefault();
    const data = {
      login_email: loginEmail,
      login_password: loginPassword,
    };

    axios
      .post("http://localhost:8000/author_login", data)
      .then((resp) => {
        console.log(resp.data);
        sessionStorage.setItem("access_token", resp.data.access_token);
        setAppContext({ ...appContext, user_name: resp.data.user_name });
        setErrors({});
        navigate("/author_dashboard");
      })
      .catch((err) => setErrors(err.response.data));
  };
  const handleUserLogin = (e) => {
    e.preventDefault();
    const data = {
      login_email: loginEmail,
      login_password: loginPassword,
    };

    axios
      .post("http://localhost:8000/login", data)
      .then((resp) => {
        console.log(resp.data);
        sessionStorage.setItem("access_token", resp.data.access_token);
        setAppContext({ ...appContext, user_name: resp.data.user_name });
        setErrors({});
        navigate("/user_dashboard");
      })
      .catch((err) => setErrors(err.response.data));
  };

  return (
    <form>
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

      <button className="btn btn-success mx-2" onClick={handleAuthorLogin}>
        Login as Author
      </button>
      <button className="btn btn-primary" onClick={handleUserLogin}>
        Login as User
      </button>
      {success.message && <Alert label={success.message} success />}
    </form>
  );
};

export default Login;
