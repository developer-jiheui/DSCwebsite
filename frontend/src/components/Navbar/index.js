import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { Icon, Menu, Modal, Button, Input } from "semantic-ui-react";
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
        active={activeItem === "developer student club"}
        onClick={(e) => onItemClick("developer student club")}
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
        trigger={
          <Button
            color="violet"
            // as={NavLink}
            // to="/login"
            // name="login"
            // icon="user circle"
            // active={activeItem === "login"}
            // onClick={() => onItemClick("login")}
            // className="basic round"
          >
            Login
          </Button>
        }
      >
        <Modal.Header>Log In</Modal.Header>
        <Modal.Content>
          <Input icon placeholder="Username/Email" iconPosition="left">
            <input />
            <Icon name="user circle" />
          </Input>
          <br />
          <br />
          <Input iconPosition="left" placeholder="Password" typep="password">
            <Icon name="lock" />
            <input />
          </Input>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Ok"
            icon="checkmark"
            onClick={() => setOpen(false)}
            positive
          />
          <Button
            content="Cancel"
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
