import axios from "axios";
import { useEffect, useState } from "react";
import UserNav from "../../components/UserNav";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import parse from "html-react-parser";
import ItemCard from "../../components/ItemCard";
import bookmark from "../../assets/bookmark.png";

const UserChaptersView = (props) => {
  const HEADER = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    },
  };
  const nav = useNavigate();
  const [chapters, setChapters] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { workbook_id } = useParams();
  const SERVER_URL = process.env.REACT_APP_SEVER_URL;
  const loc = useLocation();
  const workbook_data = loc.state;

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/get_chapters/${workbook_id}`, HEADER)
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
  }, []);

  return (
    <div>
      <UserNav />
      <div className="container-md mt-3">
        <div className="row">
          <div className="col mt-4 ">
            <h1 className="text-center">{workbook_data.name}</h1>
            <h4 className="text-center">By: {workbook_data.author_name}</h4>
            <div>{parse(workbook_data.description)}</div>
          </div>
        </div>
        <div className="row">
          {loaded &&
            chapters.map((chp) => {
              return (
                <div className="col-md-4 mt-4" key={chp.id}>
                  <ItemCard
                    title={chp.title}
                    description={`Chapter ${chp.chapter_number}`}
                    image={bookmark}
                  >
                    <button
                      className="btn btn-primary btn-block"
                      onClick={(e) =>
                        nav(`/user_chapter/${workbook_id}/${chp.id}`)
                      }
                    >
                      View
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

export default UserChaptersView;
