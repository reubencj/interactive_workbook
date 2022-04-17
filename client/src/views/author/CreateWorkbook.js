import Textbox from "../../components/Textbox";

import Alert from "../../components/Alert";
import { useState, React } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AuthorNav from "../../components/AuthorNav";
import TextEditor from "../../components/TextEditor";
const CreateWorkbook = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const SERVER_URL = process.env.REACT_APP_SEVER_URL;

  const [errors, setError] = useState({});
  const [success, setSuccess] = useState({});
  const nav = useNavigate();
  const HEADER = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    },
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    const data = {
      name,
      description,
    };

    axios
      .post(`${SERVER_URL}/create_workbook`, data, HEADER)
      .then((resp) => {
        console.log(resp.data);
        setSuccess(resp.data);
        setError({});
        nav(`/create_chapter/${resp.data.workbook_id}/1`);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status >= 400 && err.response.status < 500) {
          nav("/");
        }
      });
  };

  return (
    <>
      <AuthorNav />
      <div className="container-md">
        <form onSubmit={handleSumbit}>
          <h2>Create A New Workbook</h2>

          <Textbox
            label="Name of your Workbook"
            name="name"
            value={name}
            setState={setName}
          />

          {errors.name && <Alert label={errors.name} />}

          <TextEditor
            label="Provide a brief description of the workbook"
            value={description}
            setValue={setDescription}
          />

          {errors.description && <Alert label={errors.description} />}

          <button type="sumbit" className="btn btn-success">
            Create Workbook
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateWorkbook;
