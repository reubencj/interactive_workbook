import axios from "axios";
import { useEffect, useState } from "react";
import UserNav from "../../components/UserNav";
import { useNavigate, useParams } from "react-router-dom";

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
  }, []);

  return (
    <div>
      <UserNav />
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
