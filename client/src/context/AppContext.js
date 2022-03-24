import { createContext, useMemo, useState } from "react";

const AppContext = createContext();

export const AppContextWrapper = (props) => {
  const [appContext, setAppContext] = useState();

  return (
    <AppContext.Provider value={{ appContext, setAppContext }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
