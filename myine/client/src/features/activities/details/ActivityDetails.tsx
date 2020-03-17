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
  match
}) => {
  const { activity, loadActivitiy, loadingInitial } = useContext(ActivityStore);

  useEffect(() => {
    loadActivitiy(match.params.id);
  }, [loadActivitiy, match.params.id]);

  if (loadingInitial || !activity)
    return <Loading content="Loading Activity ..." />;

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
// <Card fluid>
//   <Image
//     src={`/assets/categoryImages/${activity!.category}.jpg`}
//     wrapped
//     ui={false}
//   />
//   <Card.Content>
//     <Card.Header>{activity!.title}</Card.Header>
//     <Card.Meta>
//       <span>{activity!.date}</span>
//     </Card.Meta>
//     <Card.Description>{activity!.description}</Card.Description>
//   </Card.Content>
//   <Card.Content extra>
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
//     </Button.Group>
//   </Card.Content>
// </Card>

export default observer(ActivityDetails);
