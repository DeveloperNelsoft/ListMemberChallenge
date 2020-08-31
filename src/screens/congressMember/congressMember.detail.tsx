import React, { useEffect, useState, useContext } from "react";
import { withRouter, match } from "react-router";
import { Link } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ReactLoading from "react-loading";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { CongressMember } from "./congressMember.interface";
import { AppContext } from "../../state/customContext";
import { Types } from "../../state/congressMemberReducer";

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
      maxWidth: 500,
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
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const { congressMemberId } = props.match.params;
    setCongressMemberId(congressMemberId);
  }, []);

  const configContent = () => {
    let content = <ReactLoading type="bubbles" color="blue" />;

    // content = {state.congressMembers.congressMembers.map( (value: any, index:number) => {
    //       <Grid item xs={12} sm container>
    //         <Grid item xs container direction="column" spacing={2}>
    //           <Grid item xs>
    //             <Typography gutterBottom variant="subtitle1">
    //               {`Standard license id: ${value.id}`}
    //             </Typography>
    //           </Grid>
    //         </Grid>
    //         <Grid item>
    //           <Typography variant="subtitle1">$19.00</Typography>
    //         </Grid>
    //       </Grid>
    //     })};

    return content;
  };

  return (
    <Container id="congressList">
      <Box my={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          {`Congress Member Detail View Id : ${congressMemberId}`}
        </Typography>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            {configContent()}
          </Grid>
          <Grid item>
            <Link to="/">
              <Typography variant="subtitle2" gutterBottom>
                Back to member list
              </Typography>
            </Link>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default CongressMemberDetail;
