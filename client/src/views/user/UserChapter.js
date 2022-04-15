import axios from "axios";
import { useEffect, useState } from "react";
import Alert from "../../components/Alert";
import { useNavigate, useParams } from "react-router-dom";
import UserNav from "../../components/UserNav";
import ItemCard from "../../components/ItemCard";
import bookmark from "../../assets/bookmark.png";
import Video from "../../components/Video";

const UserChapter = (props) => {
  const [chapter, setChapter] = useState({});
  const [questions, setQuestions] = useState([]);
  const { chapter_id, workbook_id } = useParams();
  const [completed, setCompleted] = useState();
  const nav = useNavigate();
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
        setTimeout(() => nav(`/user_chapters_view/${workbook_id}`), 1000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <UserNav />

      <div className="d-flex flex-column shadow p-3 my-5 bg-white rounded align-items-center ">
        <h1 className="mt-3">{chapter.title}</h1>
        {chapter.video_url !== "" && <Video youtube_id={chapter.video_url} />}

        <p className="mt-3">{chapter.content}</p>
        {questions.map((q, index) => {
          return (
            <div className="mt-3" key={q.questions_id}>
              <label className="form-label">{q.content}</label>
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
          className="btn btn-success my-3"
          onClick={(e) => handleComplete(e)}
        >
          Complete
        </button>
        {completed && <Alert success label={completed} />}
      </div>
    </div>
  );
};

export default UserChapter;
