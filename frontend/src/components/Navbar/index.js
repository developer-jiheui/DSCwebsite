import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

import "./index.css";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("");

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
      </Menu>
    </>
  );
};

export default Navbar;
