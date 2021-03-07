import React, { useState, useEffect } from "react";
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
  Segment,
  Sidebar, Header
} from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";

import "./index.css";

const Navbar = ({ children }) => {
  const [activeItem, setActiveItem] = useState("");
  const [openContact, setOpenContact] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [emailUsername, setEmailUsername] = useState("");
  const [emailUsernameError, setEmailUsernameError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [visible, setVisible] = useState(false);

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
      setOpenLogin(false);
    }
  };

  const [isDesktop, setDesktop] = useState(window.innerWidth > 780);
  const updateMedia = () => {
    setDesktop(window.innerWidth > 780);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const NavbarWeb = () => {
    return (
      <>
        <Menu text className="stick">
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
          <Dropdown item text="About Us" floating button labeled>
            <Dropdown.Menu
              className="left"
              style={{ backgroundColor: "var(--douglas-gray)" }}
            >
              <Dropdown.Item
                icon="object ungroup outline"
                text="Get to Know Us"
                as={Link}
                to="/gettoknowus"
                color="white"
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
            to="/community"
            name="community"
            icon="cubes"
            active={activeItem === "community"}
            onClick={() => handleOnItemClick("community")}
          />
          <Menu.Item
            icon="address book"
            name="contact"
            onClick={() => setOpenContact(true)}
          />
          {openProfile ? (
            <Dropdown item icon="user circle large">
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
              <Menu.Item
                name="login"
                icon="sign-in"
                onClick={() => setOpenLogin(true)} />
            )}
        </Menu>
        <>
          {children}
        </>
      </>
    );
  };

  const NavbarTablet = () => {
    return (
      <>
      <Menu text className="stick">
              <Menu.Item
                as={NavLink}
                exact
                to="/"
                icon={{ className: "logo" }}
                name="developer student club"
              />
              <Menu.Item
                as={Button}
                position="right"
                onClick={() => setVisible(true)}>
                <Icon name="bars" size="large" />
              </Menu.Item>
            </Menu>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            id="sidebar-hamburger-menu"
            as={Menu}
            animation="overlay"
            onHide={() => setVisible(false)}
            vertical
            visible={visible}
            width='wide'
            direction="right"
            inverted
          >       
          <Menu.Item id="sidebar-header">Welcome!</Menu.Item>     
            <Menu.Item
              as={Link}
              to="/">
              <Icon name="home"></Icon>
              Home
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/gettoknowus">
              <Icon name="object group outline" />
              About Us
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/news">
              <Icon name="bullhorn" />
              News
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              to="/events">
              <Icon name="calendar alternate outline" />
              Events
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/team">
              <Icon name="users" />
              Team
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              to="/community">
              <Icon name="cubes" />
                Community
              </Menu.Item>
            <Menu.Item
              as={Link}
              to="/policies">
              <Icon name="exclamation" />
              Policies & Bylaws
            </Menu.Item>
            <Menu.Item
              onClick={() => setOpenContact(true)}>
              <Icon name="mail" />
              Contact Us
            </Menu.Item>
            {openProfile ? (
              <Menu.Item id="user-menu-sidebar">
                <Image circular size="small" src="https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=612x612&w=0&h=rvt5KGND3z8kfrHELplF9zmr8d6COZQ-1vYK9mvSxnc=" />
                <p>Hello Jiheui!</p>
                <Menu.Menu>
                  <Menu.Item
                    as={Link}
                    to="/profile">
                  <Icon name="edit"/>
                  Edit Profile
                  </Menu.Item>
                  <Menu.Item
                    as={Link}
                    to="/admin">
                  <Icon name="settings"/>
                  Admin Settings
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      setOpenProfile(false);
                      setOpenLogin(false);
                    }}>
                  <Button fluid color="red" size="tiny" icon="sign out">Sign Out</Button>
                  </Menu.Item>
                </Menu.Menu>
              </Menu.Item>
            ) : (
                <Menu.Item
                  name="login"
                  icon="sign-in"
                  onClick={() => setOpenLogin(true)}>
                  <Button fluid color="purple" icon="sign-in">Sign in</Button>
                </Menu.Item>
              )}
          </Sidebar>
            
          <Sidebar.Pusher dimmed={visible}>
            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </>
    );
  };

  return (
    <>
      {isDesktop ?
        (<NavbarWeb></NavbarWeb>)

        : (<NavbarTablet></NavbarTablet>)
      }
      {/* CONTACT MODAL */}
      <Modal
        onClose={() => setOpenContact(false)}
        onOpen={() => setOpenContact(true)}
        open={openContact}
        style={{ color: "black" }}
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
      {/* LOGIN MODAL */}
      <Modal
        onClose={() => setOpenLogin(false)}
        onOpen={() => setOpenLogin(true)}
        open={openLogin}
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
    </>
  );
};

export default Navbar;
