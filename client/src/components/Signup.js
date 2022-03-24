import React, { useState, useContext } from "react";
import axios from "axios";
import Textbox from "./Textbox";
import Selection from "./Selection";
import Alert from "./Alert";

const Signup = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setError] = useState({});
  const [success, setSuccess] = useState({});
  //   const [loginUser, setLoginUser] = useContext(UserContext);

  //   get options for the is author selector
  const isAuthorOptions = [
    {
      id: 1,
      label: "yes",
      value: 1,
    },
    {
      id: 2,
      label: "No",
      value: 0,
    },
  ];
  //   default value for isauthor should be "No"
  const [isAuthor, setIsAuthor] = useState(isAuthorOptions[1].value);

  const handleSumbit = (e) => {
    e.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      confirm_password: confirmPassword,
      is_author: isAuthor,
    };

    axios
      .post("http://localhost:8000/create_user", data)
      .then((resp) => {
        console.log(resp.data);
        setSuccess(resp.data);
        setError({});
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((err) => setError(err.response.data));
  };

  return (
    <div className="container-md">
      <form onSubmit={handleSumbit}>
        <h2 className="mb-3">Sign Up</h2>

        <Textbox
          name="first_name"
          label="First Name"
          setState={setFirstName}
          value={firstName}
        />
        {errors.first_name && <Alert label={errors.first_name} />}

        <Textbox
          name="last_name"
          label="Last Name"
          setState={setLastName}
          value={lastName}
        />
        {errors.last_name && <Alert label={errors.last_name} />}

        <Textbox name="email" label="Email" setState={setEmail} value={email} />
        {errors.email && <Alert label={errors.email} />}

        <Textbox
          name="password"
          label="Password"
          setState={setPassword}
          value={password}
          type="password"
        />
        {errors.password && <Alert label={errors.password} />}

        <Textbox
          name="confirmPassword"
          label="Confirm Password"
          setState={setConfirmPassword}
          value={confirmPassword}
          type="password"
        />
        {errors.confirm_password && <Alert label={errors.confirm_password} />}

        <Selection
          name="isAuthor"
          label="User is an Author?"
          options={isAuthorOptions}
          setState={setIsAuthor}
          value={isAuthor}
        />
        {errors.is_author && <Alert label={errors.is_author} />}
        <button type="submit" className="btn btn-primary mt-3 mb-3">
          Sign Up
        </button>
        {success.message && <Alert label={success.message} success />}
      </form>
    </div>
  );
};

export default Signup;
