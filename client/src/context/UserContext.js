import { createContext, useMemo, useState } from "react";

const UserContext = createContext();

export const UserContextWrapper = (props) => {
  const [userContext, setUserContext] = useState();

  const value = useMemo(() => ({ userContext, setUserContext }), [userContext]);

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export default UserContext;
