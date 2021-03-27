import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import Dropdown from "../Dropdown";

import Sidebar from "../Sidebar";
import Modal from "../Modal";

import "./index.css";

const MIN_WIDTH = 899;

const items = [
  {
    label: "Home",
    icon: "home",
    path: "/",
  },
  {
    label: "About Us",
    path: "#",
  },
  {
    label: "Events",
    icon: "calendar alternate outline",
    path: "/events",
  },
  {
    label: "Community",
    path: "#",
  },
  {
    label: "Contact",
    icon: "address book",
    path: "# ",
  },
  {
    label: "Login",
    icon: "sign in",
    path: "#",
  },
];

const itemsDropdownCommunity = [
  {
    label: "Welcome!",
    icon: "bullhorn",
    path: "/community/welcome",
  },
  {
    label: "Career",
    icon: "briefcase",
    path: "/community/career",
  },
  {
    label: "Tips",
    icon: "comment outline",
    path: "/community/tips",
  },
  {
    label: "Buy & Sell",
    icon: "money bill alternate icon",
    path: "/community/buyandsell",
  },
  {
    label: "Chat",
    icon: "chat icon",
    path: "/community/chat",
  },
];
const itemsDropdownAbout = [
  {
    label: "Get to Know Us",
    icon: "globe",
    path: "/gettoknowus",
  },
  {
    label: "News",
    icon: "newspaper outline",
    path: "/news",
  },
  {
    label: "Team",
    icon: "group",
    path: "/team",
  },
];

const Navbar = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [toggle, setToggle] = useState(false);
  const [login, setLogin] = useState(false);

  const menuRef = useRef();

  const onToggleMenu = () => {
    setToggle(!toggle);
  };

  const itemList = items.map(({ label, icon, path }) => {
    if (label === "About Us") {
      return <Dropdown icon="group" label={label} itemList={itemsDropdownAbout} />;
    }

    if (label === "Community") {
      return <Dropdown icon="cubes" label={label} itemList={itemsDropdownCommunity} />;
    }

    if (label === "Contact") {
      return (
        <div
          key={label}
          onClick={() => {
            console.log(label);
          }}
        >
          <div className="ui item">
            <i className={`${icon} icon`}></i> {label}
            {/* <Modal></Modal> */}
          </div>
        </div>
      );
    }

    if (label === "Login") {
      return (
        <div
          key={label}
          onClick={() => {
            setLogin(!login);
          }}
        >
          <div className="ui item">
            <i className={`${icon} icon`}></i> {label}
            {login ? <Modal /> : null}
          </div>
        </div>
      );
    }

    return (
      <NavLink to={`${path}`} exact={path === "/"} key={icon}>
        <div className={`item`} key={label}>
          <i className={`${icon} icon`}></i> {label}
        </div>
      </NavLink>
    );
  });

  // use Effect to keep track of the browser window width:
  useEffect(() => {
    const handleWindowSize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowSize);

    return () => {
      window.removeEventListener("resize", handleWindowSize);
    };
  }, []);

  // use Effect to keep track of the mouse click outside vertical menu:
  useEffect(() => {
    const onBodyClick = (e) => {
      if (menuRef.current && menuRef.current.contains(e.target)) {
        return;
      }
      setToggle(false);
    };
    document.body.addEventListener("click", onBodyClick);
    return () => {
      document.removeEventListener("click", onBodyClick);
    };
  }, []);
  return (
    <>
      <div
        ref={width > MIN_WIDTH ? null : menuRef}
        className="ui top text menu stick"
      >
        <NavLink to="/" exact>
          <div className={`item `}>
            <i className="icon logo">
              <img src="/images/DSC_logo_color.png" alt="" />
            </i>
            <span className="no-shadow">Developer Student Clubs</span>
          </div>
        </NavLink>

        {width > MIN_WIDTH ? (
          <>
            <div className="right menu">{itemList}</div>
          </>
        ) : (
            <>
              <div
                className="item right floated link"
                onClick={() => { onToggleMenu(); }}
              >
                <i className="bars large icon"></i>
              </div>
              <Sidebar toggle={toggle} itemList={itemList} />
            </>
          )}
      </div>
      {children}
    </>
  );
};

export default Navbar;
