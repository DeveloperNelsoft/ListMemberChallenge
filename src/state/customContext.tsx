import React, { createContext, useReducer, Dispatch } from "react";
import {
  congressMemberReducer,
  CongressMemberActions,
} from "./congressMemberReducer";

import { CongressMember } from "../screens/congressMember/congressMember.interface";

type InitialStateType = {
  congressMembers: CongressMember[];
};

const initialState = {
  congressMembers: [],
};

const AppContext = createContext<{
  state: any;
  dispatch: Dispatch<CongressMemberActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { congressMembers }: InitialStateType,
  action: CongressMemberActions
) => ({
  congressMembers: congressMemberReducer(congressMembers, action),
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
