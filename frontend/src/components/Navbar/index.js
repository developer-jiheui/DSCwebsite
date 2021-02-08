import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
  Icon,
  Menu,
  Modal,
  Button,
  Input,
  Form,
  Image,
  ModalDescription,
  Grid,
} from "semantic-ui-react";
import "./index.css";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("");
  const [open, setOpen] = React.useState(false);

  const onItemClick = (name) => {
    setActiveItem(name);
  };

  <Icon className="logo" size="large"></Icon>;

  return (
    <Menu text>
      <Menu.Item
        as={NavLink}
        exact
        to="/"
        icon={{ className: "logo" }}
        name="developer student club"
        active={activeItem === "developer student clubs"}
        onClick={(e) => onItemClick("developer student clubs")}
      />
      <Menu.Item
        as={NavLink}
        exact
        to="/"
        name="home"
        icon="home"
        position="right"
        active={activeItem === "home"}
        onClick={() => onItemClick("home")}
      />
      <Menu.Item
        as={NavLink}
        to="/events"
        name="events"
        icon="calendar alternate outline"
        active={activeItem === "events"}
        onClick={() => onItemClick("events")}
      />
      <Menu.Item
        as={NavLink}
        to="/team"
        name="team"
        icon="users"
        active={activeItem === "team"}
        onClick={() => onItemClick("team")}
      />
      <Menu.Item
        as={NavLink}
        to="/community"
        name="community"
        icon="cubes"
        active={activeItem === "community"}
        onClick={() => onItemClick("community")}
      />
      <Menu.Item
        as={NavLink}
        to="/contact"
        name="contact"
        icon="address book"
        active={activeItem === "contact"}
        onClick={() => onItemClick("contact")}
      />
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button className="theme-color">Login</Button>}
        size="medium"
      >
        <Modal.Header>Log In</Modal.Header>
        <Modal.Content>
          <Grid columns={2} divided textAlign="center">
            <Grid.Column>
              <Image
                src="../../images/pngkey.com-google-cloud-logo-png-7884107.png"
                wrapped
                size="medium"
              />
            </Grid.Column>
            <Grid.Column>
              <ModalDescription>
                <Form>
                  <Form.Field>
                    <Input
                      icon
                      placeholder="Username/Email"
                      iconPosition="left"
                    >
                      <input />
                      <Icon name="user circle" />
                    </Input>
                  </Form.Field>
                  <Form.Field>
                    <Input
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                    >
                      <Icon name="lock" />
                      <input />
                    </Input>
                  </Form.Field>
                  <span>
                    Not a member yet?
                    <Link to="/signup" exact>
                      <span> </span>Click here
                    </Link>
                  </span>
                  <br />
                  <br />
                  <Button type="submit" className="black-color">
                    Submit
                  </Button>
                </Form>
              </ModalDescription>
            </Grid.Column>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          {/* <Button
            content="Ok"
            icon="checkmark"
            onClick={() => setOpen(false)}
            positive
          /> */}
          <Button
            content="Close"
            icon="close"
            onClick={() => setOpen(false)}
            color="red"
          />
        </Modal.Actions>
      </Modal>
    </Menu>
  );
};

export default Navbar;

{
  /* <Input icon placeholder="Username/Email" iconPosition="left">
            <input />
            <Icon name="user circle" />
          </Input>
          <br />
          <br />
          <Input iconPosition="left" placeholder="Password" typep="password">
            <Icon name="lock" />
            <input />
          </Input> */
}
