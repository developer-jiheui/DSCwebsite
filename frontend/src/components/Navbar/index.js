import React, { useState, createRef } from "react";
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
  Header,
  TextArea,
  Divider,
} from "semantic-ui-react";
import GoogleAuth from "../../api/GoogleAuth";
import "./index.css";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("");
  const [open, setOpen] = React.useState(false);
  const [opencontact, setopencontact] = React.useState(false);
  const [login, setLogin] = React.useState(false);

  const onItemClick = (name) => {
    setActiveItem(name);
  };

  <Icon className="logo"></Icon>;

  return (
    // <div className="stick">
    <div>
      <Menu text id="navbar">
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
        <Modal
          onClose={() => setopencontact(false)}
          onOpen={() => setopencontact(true)}
          open={opencontact}
          trigger={<Menu.Item className="theme-color">Contact</Menu.Item>}
        >
          <Modal.Header>Contact Us</Modal.Header>
          <Modal.Content image>
            <Image
              size="medium"
              src="https://www.nonotes.com/assets/img/contact-img.svg"
              wrapped
            />
            <Modal.Description>
              <Header>Send us a message</Header>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                magnam reiciendis, sit corrupti ullam ducimus in sunt, doloribus
                inventore eos eius porro, neque ipsum temporibus sapiente
                suscipit nobis iste voluptatum?
              </p>
              <div className="contact">
                <Form>
                  <Form.Field
                    label="Full name"
                    control="input"
                    type="text"
                    placeholder="Full name"
                  ></Form.Field>
                  <Form.Field
                    label="Phone"
                    control="input"
                    type="text"
                    placeholder="(xxx) xxx-xxxx"
                  ></Form.Field>
                  <Form.Field
                    label="Email"
                    control="input"
                    type="email"
                    placeholder="example@email.com"
                  ></Form.Field>
                  <Form.Field
                    label="Subject"
                    control="input"
                    type="text"
                    placeholder="Subject"
                  ></Form.Field>
                  <TextArea label="Message"></TextArea>
                </Form>
              </div>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Send"
              // labelPosition="right"
              // icon="checkmark"
              onClick={() => setopencontact(false)}
              positive
            />
            <Button color="red" onClick={() => setopencontact(false)}>
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>

        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={
            login ? (
              <Button className="theme-color">Login</Button>
            ) : (
              <Button
                className="theme-color"
                onClick={() => {
                  setOpen(false);
                  setLogin(true);
                }}
              >
                Logout
              </Button>
            )
          }
          size="small"
        >
          <Modal.Header>Log In</Modal.Header>

          <Modal.Content>
            <Grid columns={2} divided textAlign="center" verticalAlign="middle">
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
                    Forgot your password?
                    <Link exact to="/" className="link-color">
                      <span> </span>Click here!
                    </Link>
                    <br />
                    <br />
                    <Button
                      content="Set focused"
                      fluid
                      className="black-color"
                      content="Login"
                      onClick={() => {
                        setLogin(false);
                        setOpen(false);
                      }}
                    />
                    <div className="my"></div>
                    <Button fluid color="facebook">
                      <Icon name="facebook" /> Facebook
                    </Button>
                    <div className="my"></div>
                    <Button fluid color="google plus">
                      <Icon name="google plus" /> Google
                    </Button>
                    {/* <GoogleAuth /> */}
                    <Divider horizontal>Or</Divider>
                    <span>
                      Not a member yet?
                      <Link to="/signup" exact className="link-color">
                        <span> </span>Join us!
                      </Link>
                    </span>
                  </Form>
                </ModalDescription>
              </Grid.Column>
              <Grid.Column>
                <Image
                  src="../../images/pngkey.com-google-cloud-logo-png-7884107.png"
                  wrapped
                  size="large"
                />
              </Grid.Column>
            </Grid>
          </Modal.Content>
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
    </div>
  );
};

export default Navbar;
