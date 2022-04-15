import Textbox from "../../components/Textbox";
import Textarea from "../../components/Textarea";
import Alert from "../../components/Alert";
import { useState, React, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AuthorNav from "../../components/AuthorNav";

const EditSummary = (props) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const SERVER_URL = process.env.REACT_APP_SEVER_URL;
  const [errors, setError] = useState({});
  const [updated, setUpdated] = useState("");
  const [deleted, setDeleted] = useState("");
  const nav = useNavigate();
  const HEADER = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    },
  };
  const { workbook_id } = useParams();

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/workbook_summary/${workbook_id}`, HEADER)
      .then((res) => {
        console.log(res.data);
        setId(res.data.result.id);
        setDescription(res.data.result.description);
        setName(res.data.result.name);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSumbit = (e) => {
    e.preventDefault();
    const data = {
      id,
      name,
      description,
    };

    axios
      .post("http://localhost:8000/update_workbook", data, HEADER)
      .then((resp) => {
        console.log(resp.data);
        setUpdated("Updated!");
        setError({});
        setTimeout(() => nav(`/author_dashboard`), 1000);
      })
      .catch((err) => setError(err.response.data));
  };

  const handleDelete = (e) => {
    const data = {
      id,
    };
    e.preventDefault();
    axios
      .post("http://localhost:8000/delete_workbook", data, HEADER)
      .then((resp) => {
        console.log(resp.data);
        setDeleted("Deleted");
        setError({});
        setTimeout(() => nav(`/author_dashboard`), 1000);
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
      <div className="d-flex flex-column shadow p-3 my-5 bg-white rounded align-items-center ">
        <form onSubmit={handleSumbit}>
          <h2>Create A New Workbook</h2>

          <Textbox
            label="Name of your Workbook"
            name="name"
            value={name}
            setState={setName}
          />

          {errors.name && <Alert label={errors.name} />}

          <Textarea
            label="Provide a brief description of the workbook"
            name="description"
            value={description}
            setState={setDescription}
          />

          {errors.description && <Alert label={errors.description} />}

          <button type="sumbit" className="btn btn-success">
            Update Workbook
          </button>
          <button
            className="btn btn-danger mx-2 "
            onClick={(e) => handleDelete(e)}
          >
            Delete
          </button>
          {updated && <Alert label={updated} success />}
          {deleted && <Alert label={deleted} />}
        </form>
      </div>
    </>
  );
};

export default EditSummary;
