import React, { Component } from "react";
import { CongressMemberGridItem } from "./congressMember-grid.interface";
import { Grid, Typography, GridListTile } from "@material-ui/core";

interface CongressMemberItemState {}

interface CongressMemberItemProps {
  congressMemberItem: CongressMemberGridItem;
}

export default class CongressMemberItem extends Component<
  CongressMemberItemProps,
  CongressMemberItemState
> {
  constructor(props: CongressMemberItemProps) {
    super(props);
  }

  render() {
    const { congressMemberItem } = this.props;
    return (
      <div>
        <Grid>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="h5" component="h1" gutterBottom>
                {congressMemberItem.title}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              ...
            </Grid>
          </Grid>
          <Grid item xs={12}>
            id or sku: {congressMemberItem.id}
          </Grid>
          <Grid item xs={12} style={{ backgroundColor: "#DDDDDD" }}>
            first_name: {congressMemberItem.first_name}
          </Grid>
          <Grid container style={{ fontSize: 10 }}>
            <Grid item xs={6}>
              middle_name: {congressMemberItem.middle_name}
            </Grid>
            <Grid item xs={6}>
              gender: {congressMemberItem.gender}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
