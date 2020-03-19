import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { RouteComponentProps } from "react-router";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan
} from "revalidate";

import { Form as FinalForm, Field } from "react-final-form";
import TextInputCustom from "../../../app/common/form/TextInputCustom";
import TextInputArea from "../../../app/common/form/TextInputArea";
import SelectInput from "../../../app/common/form/SelectInput";
import { category } from "../../../app/common/options/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";
import { combineDateAndTimes } from "../../../app/common/utils/util";
import { ActivityFormValues } from "./../../../app/models/activity";
// const handleInputChange = (
//   event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
// ) => {
//   const { name, value } = event.currentTarget;
//   setActivity({ ...activity, [name]: value });
// };

const validate = combineValidators({
  title: isRequired({ message: "The title is required." }),
  category: isRequired({ message: "The category is required." }),
  description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at lease 4 characters."
    })
  )(),
  city: isRequired({ message: "The city is required." }),
  venue: isRequired({ message: "The venue is required." }),
  date: isRequired({ message: "The date is required." }),
  time: isRequired({ message: "The time is required." })
});

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  //
  const [activity, setActivity] = useState(new ActivityFormValues());
  const [loading, setLoading] = useState(false);

  const {
    loadActivitiy,
    createActivity,
    editActivity,
    submitting
  } = useContext(ActivityStore);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivitiy(match.params.id)
        .then(activity => setActivity(new ActivityFormValues(activity)))
        .finally(() => setLoading(false));
    }
    // return () => {
    //   clearActivity();
    // };
  }, [loadActivitiy, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTimes(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;
    if (!activity.id) {
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
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={activity}
            // pass this to handleSubmit and form handle submit is this func.
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  placeholder="title"
                  value={activity.title}
                  name="title"
                  component={TextInputCustom as React.FunctionComponent}
                />
                <Field
                  placeholder="Description"
                  name="description"
                  value={activity.description}
                  rows={3}
                  component={TextInputArea as React.FunctionComponent}
                />
                <Field
                  placeholder="Category"
                  options={category}
                  name="category"
                  value={activity.category}
                  component={SelectInput as React.FunctionComponent}
                />
                <Form.Group widths="equal">
                  <Field
                    placeholder="Date"
                    name="date"
                    date={true}
                    value={activity.date}
                    component={DateInput as React.FunctionComponent}
                  />
                  <Field
                    placeholder="time"
                    name="time"
                    time={true}
                    value={activity.date}
                    component={DateInput as React.FunctionComponent}
                  />
                </Form.Group>
                <Field
                  placeholder="city"
                  name="city"
                  value={activity.city}
                  component={TextInputCustom as React.FunctionComponent}
                />
                <Field
                  placeholder="venue"
                  name="venue"
                  value={activity.venue}
                  component={TextInputCustom as React.FunctionComponent}
                />
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated="right"
                  positive
                  type="submit"
                  content="submit"
                />
                <Button
                  onClick={
                    activity.id
                      ? () => history.push(`/activities/${activity.id}`)
                      : () => history.push("/activities")
                  }
                  disabled={loading}
                  floated="right"
                  type="button"
                  content="cancel"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default ActivityForm;
