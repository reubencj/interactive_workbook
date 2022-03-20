import { createContext, useMemo, useState } from "react";

const UserContext = createContext();

export const UserContextWrapper = (props) => {
  const [userContext, setUserContext] = useState();

  return (
    <UserContext.Provider value={{ userContext, setUserContext }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
