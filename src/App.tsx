import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CongressMemberList from "./screens/congressMember/congressMember.list";
import CongressMemberListGrid from "./screens/congressMember-grid/congressMember-grid.list";
import "./App.css";

import "./assets/main.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Route
        exact
        path="/congressMemberGrid"
        component={CongressMemberListGrid}
      />
      <Route exact path="/" component={CongressMemberList} />
    </BrowserRouter>
  );
};

export default App;
