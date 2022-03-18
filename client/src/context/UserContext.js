import { createContext, useState } from "react";
import LoginPage from "../views/LoginPage";
import UserPage from "../views/UserPage";
import App from "../App";
const UserContext = createContext();

export const UserContextWrapper = (props) => {
  const [userContext, setUserContext] = useState();

  return (
    <UserContext.Provider value={[userContext, setUserContext]}>
      <App />
    </UserContext.Provider>
  );
};

export default UserContext;
