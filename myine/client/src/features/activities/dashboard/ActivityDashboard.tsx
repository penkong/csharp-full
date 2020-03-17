import React from "react";
import { observer } from "mobx-react-lite";
import ActivityList from "../list/ActivityList";
import { Grid, GridColumn } from "semantic-ui-react";

interface IProps {}

const ActivityDashboard: React.FC<IProps> = () => {
  return (
    <Grid>
      <GridColumn width={10}>
        <ActivityList />
      </GridColumn>
      <GridColumn width={6}>
        <h2>Activity folders</h2>
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivityDashboard);
