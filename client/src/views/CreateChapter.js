import Textbox from "../components/Textbox";
import Textarea from "../components/Textarea";
import Alert from "../components/Alert";
import { useState, React, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CreateChapter = (props) => {
  const { workbook_id, chapter_id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [numOfQuest, setNumOfQuest] = useState(0);
  const [questions, setQuestions] = useState({});
  const [qlist, setQList] = useState([]);
  //   const handle_num_of_question = (num = 1) => {
  //     let render_questions = [];
  //     for (let i = 1; i <= 1; i++) {
  //       setQuestions(...questions, (questions[`question_${i}`] = ""));

  //       render_questions.append(
  //         <div>
  //           <label>Question {i} </label>
  //           <input name="question" />
  //         </div>
  //       );
  //     }
  //     return render_questions;
  //   };

  useEffect(() => {
    let ls = [];
    for (let i = 1; i <= numOfQuest; i++) {
      ls.push(i);
    }
    setQList(ls);
  }, [numOfQuest]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md">
          <form>
            <h2>Chapter {chapter_id}</h2>
            <Textbox
              name="title"
              value={title}
              setState={setTitle}
              label="Chapter Title"
            />
            <Textbox
              name="video"
              value={videoUrl}
              setState={setVideoUrl}
              label="Video Url"
            />
            <Textbox
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateChapter;
