import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../app/stores/activityStore";

interface IProps {}

const NavBar: React.FC<IProps> = () => {
  const { openCreateForm } = useContext(ActivityStore);
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "2rem" }}
          />
          NetReact
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button onClick={() => openCreateForm()} positive content="Create" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
