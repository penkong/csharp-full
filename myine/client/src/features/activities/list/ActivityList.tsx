import React from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface IProps {
  activities: IActivity[];
  handleSelectedActivity: (id: string) => void;
  submitting: boolean;
  handleDeleteAcitivty: (
    event: React.SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => void;
  targeted: string;
}

const ActivityList: React.FC<IProps> = ({
  activities,
  handleSelectedActivity,
  handleDeleteAcitivty,
  submitting,
  targeted
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map(
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
                    onClick={() => handleSelectedActivity(id)}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={id}
                    loading={targeted === id && submitting}
                    onClick={e => handleDeleteAcitivty(e, id)}
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

export default ActivityList;
