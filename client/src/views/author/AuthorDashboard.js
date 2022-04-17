import axios from "axios";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import AuthorNav from "../../components/AuthorNav";
import ItemCard from "../../components/ItemCard";
import book from "../../assets/book.png";

const AuthorDashboard = (props) => {
  const HEADER = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    },
  };
  const nav = useNavigate();
  const [workbooks, setWorkbooks] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const SERVER_URL = process.env.REACT_APP_SEVER_URL;

  useEffect(() => {
    console.log(SERVER_URL);
    axios
      .get(`${SERVER_URL}/get_author_workbooks`, HEADER)
      .then((res) => {
        setWorkbooks(res.data.result);
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
    <div>
      <AuthorNav />
      <div className="container-md mt-3">
        <div className="row">
          {loaded &&
            workbooks.map((wrk) => {
              return (
                <div className="col-md-4 mt-4" key={wrk.id}>
                  <ItemCard title={wrk.name} image={book}>
                    <button
                      className="btn btn-primary "
                      onClick={(e) => nav(`/edit_summary/${wrk.id}`)}
                    >
                      Edit Summary
                    </button>
                    <button
                      className="btn btn-success mt-2"
                      onClick={(e) => nav(`/author_chapters_view/${wrk.id}`)}
                    >
                      View Chapters
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

export default AuthorDashboard;
