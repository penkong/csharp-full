import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/stores/activityStore";
import { Item, Button, Label, Segment } from "semantic-ui-react";

interface IProps {}

const ActivityList: React.FC<IProps> = () => {
  const {
    selectActivity,
    activitiesByDate,
    deleteActivity,
    submitting,
    target
  } = useContext(ActivityStore);
  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map(
          ({ id, title, date, description, venue, city, category }) => (
            <Item key={id}>
              <Item.Content>
                <Item.Header as="a">{title}</Item.Header>
                <Item.Meta>{date}</Item.Meta>
                <Item.Description>
                  <div>{description}</div>
                  <div>
                    {venue},{city}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    onClick={() => selectActivity(id)}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={id}
                    loading={target === id && submitting}
                    onClick={e => deleteActivity(e, id)}
                    floated="right"
                    content="Delete"
                    color="red"
                  />
                  <Label basic content={category} />
                </Item.Extra>
              </Item.Content>
            </Item>
          )
        )}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
