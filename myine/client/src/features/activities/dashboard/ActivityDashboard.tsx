import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import ActivityList from "../list/ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityStore from "../../../app/stores/activityStore";
import { Grid, GridColumn } from "semantic-ui-react";

interface IProps {}

const ActivityDashboard: React.FC<IProps> = () => {
  const { editMode, selectedActivity } = useContext(ActivityStore);
  return (
    <Grid>
      <GridColumn width={10}>
        <ActivityList />
      </GridColumn>
      <GridColumn width={6}>
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && (
          <ActivityForm
            key={(selectedActivity && selectedActivity.id) || 0}
            activity={selectedActivity}
          />
        )}
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivityDashboard);
