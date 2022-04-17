import axios from "axios";
import { useEffect, useState } from "react";
import Alert from "../../components/Alert";
import { useNavigate, useParams } from "react-router-dom";
import UserNav from "../../components/UserNav";
import parse from "html-react-parser";
import Video from "../../components/Video";

const UserChapter = (props) => {
  const [chapter, setChapter] = useState({});
  const [questions, setQuestions] = useState([]);
  const { chapter_id, workbook_id } = useParams();
  const [completed, setCompleted] = useState();
  const nav = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const SERVER_URL = process.env.REACT_APP_SEVER_URL;
  const HEADER = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    },
  };

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/chapter_response/${chapter_id}`, HEADER)
      .then((res) => {
        setChapter(res.data.chapter);
        setQuestions(res.data.questions);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status >= 400 && err.response.status < 500) {
          nav("/");
        }
      });
  }, []);

  const handleChange = (value, index) => {
    const newState = [...questions];
    newState[index] = { ...newState[index], response_text: value };
    setQuestions(newState);
  };

  const handleComplete = (e) => {
    e.preventDefault();
    const data = {
      chapter_id,
      questions,
    };
    axios
      .post("http://localhost:8000/save_response", data, HEADER)
      .then((res) => {
        setCompleted("Chapter Completed!");
        setTimeout(() => nav(-1), 1000);
      })
      .catch((err) => console.log(err));
  };
  // `/user_chapters_view/${workbook_id}`
  return (
    <>
      {loaded && (
        <div>
          <UserNav />

          <div className="container-md mt-3 shadow p-3 my-5 bg-white rounded  ">
            <h1 className="mt-3 text-center">{chapter.title}</h1>

            <div className="mt-3">{parse(chapter.content)}</div>
            <div className="align-self-center mt-3  ">
              {chapter.video_url !== "" && (
                <Video youtube_id={chapter.video_url} />
              )}
            </div>
            <h4 className="text-muted mt-4">Questions</h4>
            {questions.map((q, index) => {
              return (
                <div className="mt-3" key={q.questions_id}>
                  <h4 className="text-muted">{q.content}</h4>
                  <textarea
                    rows={3}
                    className="form-control"
                    value={q.response_text || ""}
                    onChange={(e) => handleChange(e.target.value, index)}
                  ></textarea>
                </div>
              );
            })}
            <button
              className="btn btn-success my-3 w-20 align-self-center"
              onClick={(e) => handleComplete(e)}
            >
              Complete
            </button>
            {completed && <Alert success label={completed} />}
          </div>
        </div>
      )}
    </>
  );
};

export default UserChapter;
