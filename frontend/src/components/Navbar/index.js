import React, { useState } from "react";
import {
  Grid,
  Menu,
  Modal,
  ModalContent,
  Form,
  Icon,
  Button,
  ModalDescription,
  Input,
  Image,
  Divider,
} from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";

import "./index.css";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleOnItemClick = (name) => {
    setActiveItem(name);
  };

  return (
    <>
      <Menu text className="navbar">
        <Menu.Item
          as={NavLink}
          exact
          to="/"
          icon={{ className: "logo" }}
          name="developer student club"
          active={activeItem === "developer student clubs"}
          onClick={(e) => handleOnItemClick("developer student clubs")}
        />
        <Menu.Item
          as={NavLink}
          exact
          to="/"
          name="home"
          icon="home"
          position="right"
          active={activeItem === "home"}
          onClick={() => handleOnItemClick("home")}
        />
        <Menu.Item
          as={NavLink}
          to="/events"
          name="events"
          icon="calendar alternate outline"
          active={activeItem === "events"}
          onClick={() => handleOnItemClick("events")}
        />
        <Menu.Item
          as={NavLink}
          to="/team"
          name="team"
          icon="users"
          active={activeItem === "team"}
          onClick={() => handleOnItemClick("team")}
        />
        <Menu.Item
          as={NavLink}
          to="/community"
          name="community"
          icon="cubes"
          active={activeItem === "community"}
          onClick={() => handleOnItemClick("community")}
        />
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={
            <Button
              style={{ backgroundColor: "var(--basic-purple", color: "white" }}
            >
              Login
            </Button>
          }
          size="small"
        >
          <Modal.Header>Log In</Modal.Header>
          <ModalContent>
            <Grid columns={2} divided textAlign="center" verticalAlign="center">
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
                    <Button
                      fluid
                      type="submit"
                      style={{
                        backgroundColor: "var(--douglas-gray)",
                        color: "white",
                      }}
                    >
                      Login
                    </Button>
                    <div className="my"></div>
                    <Button fluid color="google plus">
                      <Icon name="google plus" /> Google
                    </Button>
                    <div className="my"></div>
                    <Button fluid color="facebook">
                      <Icon name="facebook" /> Facebook
                    </Button>
                    <Divider horizontal>Or</Divider>
                    <span>
                      Not a member yet?
                      <Link to="/signup" style={{ color: "blue" }}>
                        <span> </span>Join us!
                      </Link>
                    </span>
                  </Form>
                </ModalDescription>
              </Grid.Column>
              <Grid.Column>
                <Image
                  src="./images/DSC_logo_brand.png"
                  wrapped
                  size="medium"
                />
              </Grid.Column>
            </Grid>
          </ModalContent>
          <Modal.Actions>
            <Button
              content="Close"
              icon="close"
              onClick={() => setOpen(false)}
              color="red"
            />
          </Modal.Actions>
        </Modal>
      </Menu>
    </>
  );
};

export default Navbar;
