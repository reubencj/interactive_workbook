import axios from "axios";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import UserNav from "../../components/UserNav";
import ItemCard from "../../components/ItemCard";
import book from "../../assets/book.png";

const UserDashboard = (props) => {
  const HEADER = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    },
  };
  const nav = useNavigate();
  const [workbooks, setWorkbooks] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [toggleRefresh, setToggleRefresh] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/get_all_workbooks", HEADER)
      .then((res) => {
        setWorkbooks(res.data.result);
        setLoaded(true);
        console.log(res.data.result);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status >= 400 && err.response.status < 500) {
          nav("/");
        }
      });
  }, [toggleRefresh]);

  const handleAdd = (e, workbook_id, index) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8000/add_workbook/${workbook_id}`, HEADER)
      .then((res) => setToggleRefresh(!toggleRefresh))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <UserNav />
      <div className="container-md mt-3">
        <div className="row">
          {loaded &&
            workbooks.map((wrk, index) => {
              return (
                <div className="col-md-4 mt-4" key={wrk.id}>
                  <ItemCard
                    title={wrk.name}
                    description={wrk.description}
                    image={book}
                  >
                    {wrk.workbook_added === 1 ? (
                      <button
                        className="btn btn-primary "
                        onClick={(e) => nav(`/user_chapters_view/${wrk.id}`)}
                      >
                        View Chapters
                      </button>
                    ) : (
                      <button
                        onClick={(e) => handleAdd(e, wrk.id, index)}
                        className="btn btn-success"
                      >
                        Add Workbook
                      </button>
                    )}
                  </ItemCard>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
