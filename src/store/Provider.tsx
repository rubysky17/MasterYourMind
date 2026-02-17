import { useReducer } from "react";

import { AppContext } from "./Context";
import { appReducer, initialState } from "./Store";

export function AppProvider(props) {
  const { children } = props;
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext value={{state, dispatch}}>
      {children}
    </AppContext>
  );
}
