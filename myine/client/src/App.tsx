import React, { Component } from "react";
import axios from "axios";
import { Header, List } from "semantic-ui-react";

class App extends Component {
  state = {
    values: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/weatherforecast")
      .then(res => this.setState({ values: res.data }))
      .catch(e => e.message);
  }

  render() {
    return (
      <div>
        <Header as="h2" icon="users" content="netReact" />
        <List>
          {this.state.values.map((value: any) => {
            return <List.Item key={value.id}>{value.name}</List.Item>;
          })}
        </List>
      </div>
    );
  }
}

export default App;
