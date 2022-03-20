import axios from "axios";
import { useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
const UserPage = (props) => {
  const { userContext } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("http://localhost:8000/welcome", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return <div className="container">Hello </div>;
};

export default UserPage;
