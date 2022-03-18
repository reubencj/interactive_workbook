import UserContext from "../context/UserContext";
import { useContext, React } from "react";

const UserPage = (props) => {
  const [user, setUser] = useContext(UserContext);
  return <div className="container">Hello</div>;
};

export default UserPage;
