import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IActivity } from "./../models/activity";
import NavBar from "../../features/nav/NavBar";
import "./styles.css";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
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

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then(res => {
        let activities: IActivity[] = [];
        res.data.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          activities.push(activity);
        });
        setActivities(activities);
      })
      .catch(e => e.message);
  }, []);

  const handleCreateAcitivty = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleEditAcitivty = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleDeleteAcitivty = (id: string) => {
    setActivities([...activities.filter(a => a.id !== id)]);
  };

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
