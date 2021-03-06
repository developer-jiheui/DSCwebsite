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
  Dropdown,
  GridColumn,
  Message,
} from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";

import "./index.css";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("");
  const [openContact, setOpenContact] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [emailUsername, setEmailUsername] = useState("");
  const [emailUsernameError, setEmailUsernameError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handleOnItemClick = (name) => {
    setActiveItem(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailUsername === "") {
      setEmailUsernameError(true);
    } else {
      setEmailUsernameError(false);
    }
    if (password === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (emailUsernameError == false && passwordError == false) {
      setOpenProfile(true);
    }
  };

  return (
    <div className="stick">
      <Menu text>
        <Menu.Item
          style={{ color: "white" }}
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
        {/* <Menu.Item
          as={NavLink}
          to="/team"
          name="team"
          icon="users"
          active={activeItem === "team"}
          onClick={() => handleOnItemClick("team")}
        /> */}
        {/* <Menu.Item
          as={NavLink}
          to="/community"
          name="community"
          icon="cubes"
          active={activeItem === "community"}
          onClick={() => handleOnItemClick("community")}
        /> */}
        <Dropdown item text="Community" floating button labeled>
          <Dropdown.Menu
            className="left"
            style={{ backgroundColor: "var(--douglas-gray)" }}
          >
            <Dropdown.Item
              icon="object ungroup outline"
              text="Get to Know Us"
              as={Link}
              to="/community"
            />
            {/* <Dropdown.Item icon="settings" text="Account Settings" /> */}
            <Dropdown.Item
              icon="bullhorn"
              text="News"
              as={Link}
              to="/news"
              color="white"
            />
            <Dropdown.Item
              icon="users"
              text="Team"
              as={Link}
              to="/team"
              color="white"
            />
            <Dropdown.Item
              icon="exclamation"
              text="Policies & Bylaws"
              as={Link}
              to="/policies"
              color="white"
            />
          </Dropdown.Menu>
        </Dropdown>
        <Modal
          onClose={() => setOpenContact(false)}
          onOpen={() => setOpenContact(true)}
          open={openContact}
          style={{ color: "black" }}
          trigger={<Menu.Item icon="address book" name="contact" />}
          size="small"
        >
          <Modal.Header>Get In Touch</Modal.Header>
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
                size="large"
                // src="https://www.nonotes.com/assets/img/contact-img.svg"
                src="./images/Contact2.jpg"
                wrapped
              />
            </div>
          </Modal.Content>

          <Modal.Description style={{ padding: "30px 60px" }}>
            <Form>
              <Grid columns="equal">
                <GridColumn>
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
                      placeholder="+x (xxx) xxx-xxxx"
                      type="text"
                      icon="phone"
                    ></Input>
                  </Form.Field>
                </GridColumn>
                <GridColumn>
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
                      placeholder="Subject"
                      type="text"
                      icon="pencil alternate"
                    ></Input>
                  </Form.Field>
                </GridColumn>
              </Grid>
              <br></br>
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
          <Modal.Actions>
            <Button
              content="Close"
              icon="close"
              onClick={() => setOpenContact(false)}
              color="red"
            />
          </Modal.Actions>
        </Modal>
        {openProfile ? (
          <Dropdown item icon="user circle">
            <Dropdown.Menu
              className="left"
              style={{ backgroundColor: "var(--douglas-gray)" }}
            >
              <Dropdown.Item
                icon="edit"
                text="Edit Profile"
                as={Link}
                to="/profile"
              />
              {/* <Dropdown.Item icon="settings" text="Account Settings" /> */}
              <Dropdown.Item
                icon="settings"
                text="Admin Settings"
                as={Link}
                to="/admin"
                color="white"
              />
              <Dropdown.Item
                icon="sign-out"
                text="Logout"
                onClick={() => {
                  setOpenProfile(false);
                  setOpenLogin(false);
                }}
              />
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Modal
            onClose={() => setOpenLogin(false)}
            onOpen={() => setOpenLogin(true)}
            open={openLogin}
            trigger={<Menu.Item name="login" icon="sign-in" />}
            size="small"
          >
            <Modal.Header>Log In</Modal.Header>
            <ModalContent>
              {emailUsernameError || passwordError ? (
                <Message
                  error
                  header={"Submission Error"}
                  content={"Check your credentials"}
                />
              ) : null}
              <Grid
                columns={2}
                divided
                textAlign="center"
                verticalAlign="middle"
              >
                <Grid.Column>
                  <ModalDescription>
                    <Form>
                      <Form.Field>
                        <Input
                          icon="user"
                          placeholder="Username/Email"
                          iconPosition="left"
                          style={{ color: "black" }}
                          error={emailUsernameError}
                          onChange={(e) => {
                            setEmailUsername(e.target.value);
                          }}
                        ></Input>
                      </Form.Field>
                      <Form.Field>
                        <Input
                          iconPosition="left"
                          placeholder="Password"
                          type="password"
                          icon="lock"
                          error={passwordError}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        ></Input>
                      </Form.Field>
                      <Button
                        fluid
                        type="submit"
                        style={{
                          backgroundColor: "var(--douglas-gray)",
                          color: "white",
                        }}
                        onClick={(e) => {
                          handleSubmit(e);
                        }}
                      >
                        Login
                      </Button>
                      <div className="my"></div>
                      <Button fluid color="google plus">
                        <Icon name="google plus" /> Google
                      </Button>
                      <div className="my"></div>
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
        )}
      </Menu>
    </div>
  );
};

export default Navbar;
