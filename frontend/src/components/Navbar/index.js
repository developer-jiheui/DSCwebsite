import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { Menu } from "semantic-ui-react";
import "./index.css";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("home");

  const onItemClick = (name) => {
    setActiveItem(name);
  };

  console.log(activeItem);

  return (
    <Menu text>
      <Menu.Item
        exact
        as={NavLink}
        to="/"
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
        name=" team"
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
      <Menu.Item
        as={NavLink}
        to="/login"
        name="login"
        icon="user circle"
        active={activeItem === "login"}
        onClick={() => onItemClick("login")}
      />
    </Menu>
  );
};

export default Navbar;
