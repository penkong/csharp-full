import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
interface IProps {
  activity: IActivity | undefined;
}

const ActivityForm: React.FC<IProps> = ({ activity: initialFormState }) => {
  //
  const {
    createActivity,
    editActivity,
    submitting,
    cancelFormOpen
  } = useContext(ActivityStore);
  const initailizeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: ""
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initailizeForm);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    console.log(activity);
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder="title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          rows={2}
          placeholder="description"
          name="description"
          value={activity.description}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="category"
          name="category"
          value={activity.category}
          onChange={handleInputChange}
        />
        <Form.Input
          type="datetime-local"
          placeholder="date"
          name="date"
          value={activity.date}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="city"
          name="city"
          value={activity.city}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="venue"
          name="venue"
          value={activity.venue}
          onChange={handleInputChange}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="submit"
        />
        <Button
          onClick={cancelFormOpen}
          floated="right"
          type="button"
          content="cancel"
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
