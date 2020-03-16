import React, { useEffect, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import "./styles.css";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import Loading from "./Loading";
import ActivityStore from "../stores/activityStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <Loading content="loading activities ..." />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7rem" }}>
        <ActivityDashboard />
      </Container>
    </>
  );
};

export default observer(App);
