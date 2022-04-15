import Textbox from "../../components/Textbox";
import Textarea from "../../components/Textarea";
import Alert from "../../components/Alert";
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
  const nav = useNavigate();
  const SERVER_URL = process.env.REACT_APP_SEVER_URL;

  const HEADER = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    },
  };

  useEffect(() => {
    let ls = [];
    for (let i = 1; i <= numOfQuest; i++) {
      ls.push(i);
    }
    setQList(ls);
  }, [numOfQuest]);

  const handleSumbit = (e, nextChapter = true) => {
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
      .post(`${SERVER_URL}/create_chapter`, data, HEADER)
      .then((resp) => {
        console.log(resp.data);
        setSuccess(resp.data);
        setError({});
        setTitle("");
        setContent("");
        setVideoUrl("");
        setNumOfQuest(0);
        setQuestions({});
        setQList([]);
        setSuccess({});

        if (nextChapter) {
          const next_chapter = parseInt(chapter_number) + 1;
          nav(`/create_chapter/${workbooks_id}/${next_chapter}`);
        } else {
          nav("/author_dashboard");
        }
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status >= 400 && err.response.status < 500) {
          nav("/");
        }
      });
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
              label="Youtube Video ID"
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

            <div className="d-flex mt-2 ">
              <div className="mx-1">
                <button
                  onClick={(e) => {
                    handleSumbit(e);
                  }}
                  className="btn btn-primary"
                >
                  Next Chapter
                </button>
              </div>

              <div>
                <button
                  onClick={(e) => {
                    handleSumbit(e, false);
                  }}
                  className="btn btn-success "
                >
                  Complete Workbook
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateChapter;
