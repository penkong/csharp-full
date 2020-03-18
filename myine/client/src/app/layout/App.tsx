import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, Switch, withRouter } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "./../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import { RouteComponentProps } from "react-router";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={HomePage} />
      <Route
        exact
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7rem" }}>
              <Switch>
                <Route
                  exact
                  path={["/create-activity", "/manage/:id"]}
                  component={ActivityForm}
                />
                <Route exact path="/activities" component={ActivityDashboard} />
                <Route
                  exact
                  path="/activities/:id"
                  component={ActivityDetails}
                  key={location.key}
                />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
};

export default withRouter(observer(App));
