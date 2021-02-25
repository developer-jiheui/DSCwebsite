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
  TextArea,
} from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";

import "./index.css";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("");
  const [openContact, setOpenContact] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);

  const handleOnItemClick = (name) => {
    setActiveItem(name);
  };

  return (
    <>
      <Menu text>
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
          onClose={() => setOpenContact(false)}
          onOpen={() => setOpenContact(true)}
          open={openContact}
          style={{ color: "black" }}
          trigger={<Menu.Item icon="address book" name="contact" />}
          size="small"
        >
          <Modal.Header>Get In Touch</Modal.Header>
          {/* <Grid columns={2}>
            <Grid.Column> */}
          <Modal.Content image>
            <div
              style={{
                display: "block",
                width: "90%",
                textAlign: "center",
                margin: "auto",
              }}
            >
              <Image
                size="medium"
                // src="https://www.nonotes.com/assets/img/contact-img.svg"
                src="./images/Contact2.jpg"
                wrapped
              />
            </div>
          </Modal.Content>
          {/* </Grid.Column>
            <Grid.Column> */}
          <Modal.Description style={{ padding: "20px 80px" }}>
            <Form>
              <Form.Field>
                <Input
                  icon="user circle"
                  placeholder="Name"
                  iconPosition="left"
                  type="text"
                ></Input>
              </Form.Field>
              <Form.Field>
                <Input
                  iconPosition="left"
                  placeholder="email@example.com"
                  type="email"
                  icon="envelope outline"
                ></Input>
              </Form.Field>
              <Form.Field>
                <Input
                  iconPosition="left"
                  placeholder="+x (xxx) xxx-xxxx"
                  type="text"
                  icon="phone"
                ></Input>
              </Form.Field>
              <Form.Field>
                <Input
                  iconPosition="left"
                  placeholder="Subject"
                  type="text"
                  icon="pencil alternate"
                ></Input>
              </Form.Field>
              <Form.Field>
                <TextArea placeholder="Tell us more"></TextArea>
              </Form.Field>
              <Button
                fluid
                type="submit"
                style={{
                  backgroundColor: "var(--douglas-gray)",
                  color: "white",
                }}
              >
                Send
              </Button>
            </Form>
          </Modal.Description>
          {/* </Grid.Column>
          </Grid> */}
          <Modal.Actions>
            <Button
              content="Close"
              icon="close"
              onClick={() => setOpenContact(false)}
              color="red"
            />
          </Modal.Actions>
        </Modal>
        <Modal
          onClose={() => setOpenLogin(false)}
          onOpen={() => setOpenLogin(true)}
          open={openLogin}
          trigger={<Menu.Item name="login" icon="user circle" />}
          size="small"
        >
          <Modal.Header>Log In</Modal.Header>
          <ModalContent>
            <Grid columns={2} divided textAlign="center" verticalAlign="middle">
              <Grid.Column>
                <ModalDescription>
                  <Form>
                    <Form.Field>
                      <Input
                        icon="user circle"
                        placeholder="Username/Email"
                        iconPosition="left"
                      ></Input>
                    </Form.Field>
                    <Form.Field>
                      <Input
                        iconPosition="left"
                        placeholder="Password"
                        type="password"
                        icon="lock"
                      ></Input>
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
                    {/* <Button fluid color="facebook">
                      <Icon name="facebook" /> Facebook
                    </Button> */}
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
              onClick={() => setOpenLogin(false)}
              color="red"
            />
          </Modal.Actions>
        </Modal>
      </Menu>
    </>
  );
};

export default Navbar;
