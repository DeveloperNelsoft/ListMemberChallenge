import React, { Component } from "react";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ReactLoading from "react-loading";
import { Grid, GridList, GridListTile } from "@material-ui/core";

import { CongressMemberGridItem } from "./congressMember-grid.interface";
import CongressMemberItem from "./congressMember-item.component";

interface CongressMemberGridState {
  congressMemberList: CongressMemberGridItem[];
  loading: Boolean;
}

interface CongressMemberListGridProps {}

export default class CongressMemberListGrid extends Component<
  CongressMemberListGridProps,
  CongressMemberGridState
> {
  constructor(props: CongressMemberListGridProps) {
    super(props);

    this.state = {
      congressMemberList: [],
      loading: true,
    };
  }
  componentWillMount() {
    fetch("https://api.propublica.org/congress/v1/116/senate/members.json", {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "CaJxiDIIG1NWd058ynADGpCuHAPxoN9GIrhq13RO",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          congressMemberList: responseData.results[0]
            .members as CongressMemberGridItem[],
          loading: false,
        });
      })
      .catch((error) => {
        console.log("Error loading data", error);
      });
  }

  render() {
    const { congressMemberList, loading } = this.state;
    let content: any[] = [];
    if (!loading) {
      for (const congressItem of congressMemberList) {
        content.push(
          <GridListTile className="member-item" cols={1}>
            <CongressMemberItem congressMemberItem={congressItem} />
          </GridListTile>
        );
      }
    } else {
      return <ReactLoading type="bubbles" color="#DDD" />;
    }
    return (
      <Container>
        <Box my={2}>
          <Link to="/">Back to Congress Member List </Link>
        </Box>
        <Box my={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Congress Member Detailed
          </Typography>
        </Box>
        <Box my={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              overflow: "hidden",
            }}
          >
            <GridList cellHeight={160} cols={4}>
              {content}
            </GridList>
          </div>
        </Box>
      </Container>
    );
  }
}
