import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IActivity, IActivityFormValues } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { RouteComponentProps } from "react-router";
import { Form as FinalForm, Field } from "react-final-form";
import TextInputCustom from "../../../app/common/form/TextInputCustom";
import TextInputArea from "../../../app/common/form/TextInputArea";
import SelectInput from "../../../app/common/form/SelectInput";
import { category } from "../../../app/common/options/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";
import { combineDateAndTimes } from "../../../app/common/utils/util";
import { ActivityFormValues } from "./../../../app/models/activity";
interface IProps {
  // activity: IActivity | undefined;
}

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
    activity: initialFormState,
    loadActivitiy,
    createActivity,
    editActivity,
    submitting,
    clearActivity
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

  // const handleInputChange = (
  //   event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = event.currentTarget;
  //   setActivity({ ...activity, [name]: value });
  // };

  // const handleSubmit = () => {
  //   console.log(activity);
  //   if (activity.id.length === 0) {
  //     let newActivity = {
  //       ...activity,
  //       id: uuid()
  //     };
  //     createActivity(newActivity).then(() =>
  //       history.push(`/activities/${newActivity.id}`)
  //     );
  //   } else {
  //     editActivity(activity).then(() =>
  //       history.push(`/activities/${activity.id}`)
  //     );
  //   }
  // };

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
      editActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            initialValues={activity}
            // pass this to handleSubmit and form handle submit is this func.
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
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
                  disabled={loading}
                  floated="right"
                  positive
                  type="submit"
                  content="submit"
                />
                <Button
                  onClick={() => history.push("/activities")}
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
