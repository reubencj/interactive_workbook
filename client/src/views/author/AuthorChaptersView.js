import axios from "axios";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import AuthorNav from "../../components/AuthorNav";
import ItemCard from "../../components/ItemCard";
import bookmark from "../../assets/bookmark.png";

const AuthorChaptersView = (props) => {
  const HEADER = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    },
  };
  const nav = useNavigate();
  const [chapters, setChapters] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { workbook_id } = useParams();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/get_chapters/${workbook_id}`, HEADER)
      .then((res) => {
        setChapters(res.data.result);
        setLoaded(true);
        console.log(res.data.result);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status >= 400 && err.response.status < 500) {
          nav("/");
        }
      });
  }, [toggle]);

  const handleDelete = (e, id, workbook_id) => {
    const data = { id, workbook_id };
    e.preventDefault();
    axios
      .post("http://localhost:8000/delete_chapter", data, HEADER)
      .then((res) => {
        console.log(res);
        setToggle(!toggle);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div>
      <AuthorNav />
      <div className="container-md mt-3">
        <div className="row">
          {loaded &&
            chapters.map((chp) => {
              return (
                <div className="col-md-4 mt-4" key={chp.id}>
                  <ItemCard
                    description={chp.title}
                    title={`Chapter ${chp.chapter_number}`}
                    image={bookmark}
                  >
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDelete(e, chp.id, workbook_id)}
                    >
                      Delete Chapter
                    </button>
                  </ItemCard>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AuthorChaptersView;
