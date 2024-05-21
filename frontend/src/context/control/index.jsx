import React, { useMemo, useReducer, createContext, useContext } from "react";
import { initialState, contextReducer } from "./reducer";
import contextActions from "./actions";
import contextSelectors from "./selectors";

const ControlContext = createContext();

function ControlContextProvider({ children }) {
  const [state, dispatch] = useReducer(contextReducer, initialState);
  const value = useMemo(() => [state, dispatch], [state]);

  return <ControlContext.Provider value={value}>{children}</ControlContext.Provider>;
}

function useControlContext() {
  const context = useContext(ControlContext);
  if (context === undefined) {
    throw new Error("useControlContext must be used within a ControlContextProvider");
  }
  const [state, dispatch] = context;
  const controlContextAction = contextActions(dispatch);
  const controlContextSelector = contextSelectors(state);
  return { state, controlContextAction, controlContextSelector };
}

export { ControlContextProvider, useControlContext };
