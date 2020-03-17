import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import ActivityList from "../list/ActivityList";
import { Grid, GridColumn } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import Loading from "../../../app/layout/Loading";

interface IProps {}

const ActivityDashboard: React.FC<IProps> = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <Loading content="loading activities ..." />;

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
