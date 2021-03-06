import React, { useEffect, useState, useContext } from "react";
import { match } from "react-router";
import { Link } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { CongressMember } from "./congressMember.interface";
import { AppContext } from "../../state/customContext";
import { Button } from "@material-ui/core";

interface CongressMemberDetailState {
  CongressMemberList: CongressMember[];
}

interface Props {
  match: match<{
    congressMemberId: string;
  }>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: 800,
    },
    paperBackButton: {
      margin: "auto",
      maxWidth: 800,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    },
  })
);

const CongressMemberDetail: React.SFC<Props> = (props: Props) => {
  const classes = useStyles();
  const [congressMemberId, setCongressMemberId] = useState("");
  const { state } = useContext(AppContext);

  useEffect(() => {
    const { congressMemberId } = props.match.params;
    setCongressMemberId(congressMemberId);
  }, []);

  const renderKeyValueInsideGrid = (key: string, value: string) => {
    return (
      <div>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
                {key}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">{value}</Typography>
          </Grid>
        </Grid>
      </div>
    );
  };

  const configContent = () => {
    // let content = <ReactLoading type="bubbles" color="blue" />;

    let content: any[] = [];
    if (
      state.congressMembers.congressMembers !== undefined &&
      congressMemberId.length > 1
    ) {
      const congressMember = state.congressMembers.congressMembers.filter(
        (val: any, index: number) => val.id === congressMemberId
      )[0];

      const arryKey = Object.keys(congressMember).map((key: any) => [
        key,
        congressMember[key],
      ]);

      content = arryKey;
    }

    return content;
  };

  return (
    <Container id="congressList">
      <Box my={12}>
        <Paper className={classes.paper}>
          <Typography variant="h4" component="h1" gutterBottom>
            {`Member Detail View Id : ${congressMemberId}`}
          </Typography>
        </Paper>
        <Paper className={classes.paper}>
          {configContent()
            .filter((val: any) => val[0] !== "tableData")
            .map((val: any, index: number) => (
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column">
                  <strong>{`${val[0]} `}</strong>
                </Grid>
                <Grid item>
                  <div>{`${val[1] === null ? "No Information" : val[1]}`}</div>
                </Grid>
              </Grid>
            ))}
        </Paper>
        <Paper className={classes.paperBackButton}>
          <Button variant="outlined" color="secondary">
            <Link to="/"> Back to member list</Link>
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default CongressMemberDetail;
