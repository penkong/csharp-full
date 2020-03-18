import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import Loading from "../../../app/layout/Loading";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";

// interface IProps {}
interface DetailParams {
  id: string;
}

// some where in this we need inform it from id type
const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const { activity, loadActivitiy, loadingInitial } = useContext(ActivityStore);

  useEffect(() => {
    loadActivitiy(match.params.id);
  }, [loadActivitiy, match.params.id]);

  if (loadingInitial) return <Loading content="Loading Activity ..." />;

  if (!activity) return <h2>activity not found</h2>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailsHeader activity={activity} />
        <ActivityDetailsInfo activity={activity} />
        <ActivityDetailsChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailsSidebar />
      </Grid.Column>
    </Grid>
  );
};

//     <Button.Group widths={2}>
//       <Button
//         as={Link}
//         to={`/manage/${activity!.id}`}
//         basic
//         color="blue"
//         content="edit"
//       />
//       <Button
//         onClick={() => history.push("/activities")}
//         basic
//         color="grey"
//         content="cancel"
//       />

export default observer(ActivityDetails);
