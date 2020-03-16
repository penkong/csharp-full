import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "./../models/activity";
import NavBar from "../../features/nav/NavBar";
import "./styles.css";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import Loading from "./Loading";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [targeted, setTargeted] = useState("");
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );

  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };
  // ================== CRUD ===================================
  useEffect(() => {
    // axios
    //   .get<IActivity[]>("http://localhost:5000/api/activities")
    agent.Activities.list()
      .then(res => {
        let activities: IActivity[] = [];
        res.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          activities.push(activity);
        });
        setActivities(activities);
      })
      .then(() => setLoading(false))
      .catch(e => e.message);
  }, []);

  const handleCreateAcitivty = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleEditAcitivty = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity)
      .then(() => {
        setActivities([
          ...activities.filter(a => a.id !== activity.id),
          activity
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleDeleteAcitivty = (
    event: React.SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setSubmitting(true);
    setTargeted(event.currentTarget.name);
    agent.Activities.delete(id)
      .then(() => {
        setActivities([...activities.filter(a => a.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };

  if (loading) return <Loading content="loading activities ..." />;

  return (
    <>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7rem" }}>
        <ActivityDashboard
          activities={activities}
          handleSelectedActivity={handleSelectedActivity}
          selectedActivity={selectedActivity!}
          setSelectedActivity={setSelectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          handleCreateAcitivty={handleCreateAcitivty}
          handleEditAcitivty={handleEditAcitivty}
          handleDeleteAcitivty={handleDeleteAcitivty}
          submitting={submitting}
          targeted={targeted}
        />
      </Container>
    </>
  );
};

export default App;

// interface IState {
//   activities: IActivity[];
// }

// class App extends Component<{}, IState> {
//   readonly state: IState = {
//     activities: []
//   };

//   componentDidMount() {
//     axios
//       .get<IActivity[]>("http://localhost:5000/api/activities")
//       .then(res => this.setState({ activities: res.data }))
//       .catch(e => e.message);
//   }

//   render() {
//     return (
//       <div>
//         <Header as="h2" icon="users" content="netReact" />
//         <List>
//           {this.state.activities.map(activity => (
//             <List.Item key={activity.id}>{activity.title}</List.Item>
//           ))}
//         </List>
//       </div>
//     );
//   }
// }

// export default App;
