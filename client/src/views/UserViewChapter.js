import Textbox from "../components/Textbox";
import Textarea from "../components/Textarea";
import Alert from "../components/Alert";
import { useState, React, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserViewChapter = (props) => {
  const [chapterData, setChapterData] = useState({});
  const { chapter_id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/get_chapter/${chapter_id}`)
      .then((res) => setChapterData(res.data))
      .catch((err) => {
        console.log(err.response);
        if (err.response.status >= 400 && err.response.status < 500) {
          nav("/");
        }
      });
  }, []);

  return (
    <div className="container-md">
      <div className="row">
        <div className="col">
          <h1>Chapter Name</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p>video url</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p>content</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p>questions</p>
        </div>
      </div>
    </div>
  );
};
