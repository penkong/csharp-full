import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/stores/activityStore";
import { Item, Label, Segment } from "semantic-ui-react";

import ActivityListItem from "../ListItem/ActivityListItem";

interface IProps {}

const ActivityList: React.FC<IProps> = () => {
  const { activitiesByDate } = useContext(ActivityStore);
  return (
    <>
      {activitiesByDate.map(([group, activities]) => (
        <>
          <Label key={group} size="large" color="blue">
            {group}
          </Label>
          <Item.Group divided>
            {activities.map(activity => (
              <ActivityListItem activity={activity} key={activity.id} />
            ))}
          </Item.Group>
        </>
      ))}
    </>
  );
};

export default observer(ActivityList);
