import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Textbox from "../../components/Textbox";
import Textarea from "../../components/Textarea";
import Alert from "../../components/Alert";
import AuthorNav from "../../components/AuthorNav";
import TextEditor from "../../components/TextEditor";
const EditChapter = (props) => {
  const HEADER = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    },
  };
  const [chapter, setChapter] = useState();
  const [questions, setQuestions] = useState();
  const [loaded, setLoaded] = useState(false);
  const [updated, setUpdated] = useState(false);
  const { chapter_id, workbook_id } = useParams();
  const SERVER_URL = process.env.REACT_APP_SEVER_URL;
  const nav = useNavigate();

  //closure function that is used to update the state of chapter and question which
  const handleChange = (state, setStateFunction, property, index = null) => {
    const changeValue = (value) => {
      try {
        if (index === null) {
          setStateFunction({ ...state, [property]: value });
        } else if (Number.isInteger(index)) {
          const newArray = [...state];
          newArray[index] = { ...newArray[index], [property]: value };
          setStateFunction(newArray);
        } else {
          throw new Error("Not an integer. Make sure it is an index");
        }
      } catch (err) {
        console.log(err);
      }
    };

    return changeValue;
  };

  //update chapter and questions
  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .post(`${SERVER_URL}/update_chapter`, { chapter, questions }, HEADER)
      .then((res) => {
        setUpdated(true);
        setTimeout(() => nav(`/author_chapters_view/${workbook_id}`), 1500);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/get_chapter/${chapter_id}`, HEADER)
      .then((res) => {
        console.log(res.data);
        setChapter(res.data.chapter[0]);
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

  return (
    <>
      <AuthorNav />

      {loaded && (
        <div className="container">
          <div className="row">
            <div className="col-md">
              <form>
                <h2>Chapter {chapter.chapter_number}</h2>
                <Textbox
                  name="title"
                  value={chapter.title}
                  setState={handleChange(chapter, setChapter, "title")}
                  label="Chapter Title"
                />
                <Textbox
                  name="video"
                  value={chapter.video_url}
                  setState={handleChange(chapter, setChapter, "video_url")}
                  label="Youtube Video Id"
                />

                <TextEditor
                  value={chapter.content}
                  setValue={handleChange(chapter, setChapter, "content")}
                  label="Content"
                />

                {questions.map((question, index) => {
                  return (
                    <div key={question.id}>
                      <Textbox
                        name={question.id}
                        value={question.content}
                        label={`Question ${question.question_number}`}
                        setState={handleChange(
                          questions,
                          setQuestions,
                          "content",
                          index
                        )}
                      />
                    </div>
                  );
                })}

                <div className="d-flex mt-2 ">
                  <div className="mx-1">
                    <button
                      onClick={(e) => {
                        handleUpdate(e);
                      }}
                      className="btn btn-success mb-2"
                    >
                      Update
                    </button>
                  </div>

                  <div>
                    <button
                      onClick={(e) => {
                        nav(`/author_chapters_view/${workbook_id}`);
                      }}
                      className="btn btn-primary mb-2 "
                    >
                      Go Back
                    </button>
                  </div>
                </div>
                {updated && (
                  <Alert label="Chapter updated" success className="mt-2" />
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditChapter;
