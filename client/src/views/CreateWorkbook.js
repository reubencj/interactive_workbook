import Textbox from "../components/Textbox";
import Textarea from "../components/Textarea";
import Alert from "../components/Alert";
import { useState, React } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CreateWorkbook = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [noOfChapters, setNoOfChapters] = useState("");
  const [errors, setError] = useState({});
  const [success, setSuccess] = useState({});
  const { author_id } = useParams();
  const navigate = useNavigate();

  const handleSumbit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      description: description,
      number_of_chapters: noOfChapters,
      author_id: author_id,
    };

    axios
      .post("http://localhost:8000/create_workbook", data)
      .then((resp) => {
        console.log(resp.data);
        setSuccess(resp.data);
        setError({});
        navigate(`/create_chapter/${resp.data.workbook_id}/1`);
      })
      .catch((err) => setError(err.response.data));
  };

  return (
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

        <Textarea
          label="Provide a brief description of the workbook"
          name="description"
          value={description}
          setState={setDescription}
        />

        {errors.description && <Alert label={errors.description} />}

        <Textbox
          name="noOfChapters"
          label="Numbber of Chapters"
          type="number"
          value={noOfChapters}
          setState={setNoOfChapters}
        />
        {errors.number_of_chapters && (
          <Alert label={errors.number_of_chapters} />
        )}

        <button type="sumbit" className="btn btn-success">
          Create Workbook
        </button>
      </form>
    </div>
  );
};

export default CreateWorkbook;
