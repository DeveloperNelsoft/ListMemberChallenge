import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
  },
  grow: {
    flexGrow: 0.5,
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="transparent" className={classes.appBar}>
        <Toolbar>
          <div className={classes.grow} />
          <Typography variant="subtitle2" gutterBottom>
            Powered by Nelson Acosta
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Footer;
