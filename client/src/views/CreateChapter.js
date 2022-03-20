import Textbox from "../components/Textbox";
import Textarea from "../components/Textarea";
import Alert from "../components/Alert";
import { useState, React, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateChapter = (props) => {
  const { workbooks_id, chapter_number } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [video_url, setVideoUrl] = useState("");
  const [numOfQuest, setNumOfQuest] = useState(0);
  const [questions, setQuestions] = useState({});
  const [qlist, setQList] = useState([]);
  const [errors, setError] = useState({});
  const [success, setSuccess] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    let ls = [];
    for (let i = 1; i <= numOfQuest; i++) {
      ls.push(i);
    }
    setQList(ls);
  }, [numOfQuest]);

  const handleSumbit = (e) => {
    e.preventDefault();

    const data = {
      workbooks_id,
      title,
      content,
      questions,
      chapter_number,
      video_url,
    };

    axios
      .post("http://localhost:8000/create_chapter", data)
      .then((resp) => {
        console.log(resp.data);
        setSuccess(resp.data);
        setError({});
      })
      .catch((err) => setError(err.response.data));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md">
          <form>
            <h2>Chapter {chapter_number}</h2>
            <Textbox
              name="title"
              value={title}
              setState={setTitle}
              label="Chapter Title"
            />
            <Textbox
              name="video"
              value={video_url}
              setState={setVideoUrl}
              label="Video Url"
            />
            <Textarea
              name="content"
              value={content}
              setState={setContent}
              label="Content"
            />
            <Textbox
              name="number_of_question"
              value={numOfQuest}
              setState={setNumOfQuest}
              label="Number of Questions"
              type="number"
            />
            {numOfQuest > 0 &&
              qlist.map((num) => {
                return (
                  <div key={num}>
                    <label className="form-label">Question{num}</label>
                    <input
                      className="form-control"
                      type="text"
                      name="question"
                      onChange={(e) =>
                        setQuestions({
                          ...questions,
                          [`question${num}`]: e.target.value,
                        })
                      }
                    />
                  </div>
                );
              })}
            <button
              onClick={(e) => {
                handleSumbit(e);
                // const next_chapter = parseInt(chapter_id) + 1;
                // navigate(`/create_chapter/${workbook_id}/${next_chapter}`);
              }}
              className="btn btn-primary"
            >
              Next Chapter
            </button>

            <button
              onClick={(e) => {
                handleSumbit(e);
                // navigate("/dashboard");
              }}
              className="btn btn-success"
            >
              Complete Workbook
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateChapter;
