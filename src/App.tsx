import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CongressMemberList from "./screens/congressMember/congressMember.list";
import CongressMemberDetail from "./screens/congressMember/congressMember.detail";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { AppProvider } from "./state/customContext";

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <AppProvider>
        <Header />
        <Paper square className={classes.paper}>
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path="/congressMemberDetail/:congressMemberId"
                component={CongressMemberDetail}
              />
              <Route exact path="/" component={CongressMemberList} />
            </Switch>
          </BrowserRouter>
        </Paper>
        <Footer />
      </AppProvider>
    </div>
  );
};

export default App;
