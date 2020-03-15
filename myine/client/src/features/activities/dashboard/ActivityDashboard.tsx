import React from "react";
import { Grid, GridColumn, List } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import ActivityList from "../list/ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface IProps {
  activities: IActivity[];
  handleSelectedActivity: (id: string) => void;
  selectedActivity: IActivity; // | null
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
  handleCreateAcitivty: (activity: IActivity) => void;
  handleEditAcitivty: (activity: IActivity) => void;
  handleDeleteAcitivty: (id: string) => void;
}

const ActivityDashboard: React.FC<IProps> = ({
  activities,
  handleSelectedActivity,
  selectedActivity,
  editMode,
  setEditMode,
  setSelectedActivity,
  handleCreateAcitivty,
  handleEditAcitivty,
  handleDeleteAcitivty
}) => {
  return (
    <Grid>
      <GridColumn width={10}>
        <ActivityList
          activities={activities}
          handleSelectedActivity={handleSelectedActivity}
          handleDeleteAcitivty={handleDeleteAcitivty}
        />
      </GridColumn>
      <GridColumn width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
          />
        )}
        {editMode && (
          <ActivityForm
            key={(selectedActivity && selectedActivity.id) || 0}
            setEditMode={setEditMode}
            activity={selectedActivity}
            handleCreateAcitivty={handleCreateAcitivty}
            handleEditAcitivty={handleEditAcitivty}
          />
        )}
      </GridColumn>
    </Grid>
  );
};

export default ActivityDashboard;
