import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import Dropdown from "../Dropdown";
import Sidebar from "../Sidebar";
import {
  Button,
  Form,
  Grid,
  Image,
  Input,
  Message,
  Modal,
  TextArea,
  Icon,
  Divider
} from "semantic-ui-react";

import "./index.css";

const MIN_WIDTH = 899;

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("jwt") !== null);

  const handleLogout = () => {
    fetch("http://localhost:5000/login/logout", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(response => response.json())
      .then(res => {
        if (res.status === 'OK') {
          console.log("LOGOUT", res);
          localStorage.clear();
          setIsLoggedIn(false);
        }
      })
  }

  const items = [
    {
      label: "Home",
      icon: "home",
      path: "/",
    },
    {
      label: "About Us",
      icon: "group",
      path: "#",
    },
    {
      label: "Events",
      icon: "calendar alternate outline",
      path: "/events",
    },
    {
      label: "Community",
      icon: "cubes",
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

  const itemsDropdownUserMenu = [
    {
      label: "Profile",
      icon: "user",
      path: "/profile"
    },
    {
      label: "Logout",
      icon: "sign out",
      path: "#",
      onClick: handleLogout
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
    {
      label: "Q & A",
      icon: "question circle outline icon",
      path: "/qanda"
    }
  ];

  const dropdowns = {
    "About Us": itemsDropdownAbout,
    "Community": itemsDropdownCommunity,
    "Login": itemsDropdownUserMenu
  }

  const [width, setWidth] = useState(window.innerWidth);
  const [toggle, setToggle] = useState(false);

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openContactUsModal, setOpenContactUsModal] = useState(false);

  const menuRef = useRef();

  const onToggleMenu = () => {
    setToggle(!toggle);
  };

  const ContactModal = () => {
    return (
      <Modal
        onClose={() => setOpenContactUsModal(false)}
        onOpen={() => setOpenContactUsModal(true)}
        open={openContactUsModal}
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
              src="../images/Contact2.jpg"
              wrapped
            />
          </div>
        </Modal.Content>
        <Modal.Description style={{ padding: "30px 60px" }}>
          <Form>
            <Grid columns="equal">
              <Grid.Column>
                <Form.Field>
                  <Input
                    icon="user circle"
                    placeholder="Name"
                    iconPosition="left"
                    type="text"
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    iconPosition="left"
                    placeholder="+x (xxx) xxx-xxxx"
                    type="text"
                    icon="phone"
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <Input
                    iconPosition="left"
                    placeholder="email@example.com"
                    type="email"
                    icon="envelope outline"
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    iconPosition="left"
                    placeholder="Subject"
                    type="text"
                    icon="pencil alternate"
                  />
                </Form.Field>
              </Grid.Column>
            </Grid>
            <br></br>
            <Form.Field>
              <TextArea placeholder="Tell us more" />
            </Form.Field>
            <Button
              fluid
              type="submit"
              color="purple"
            >
              Send
              </Button>
          </Form>
        </Modal.Description>
        <Modal.Actions>
          <Button
            content="Cancel"
            icon="close"
            color="red"
            onClick={() => setOpenContactUsModal(false)}
          />
        </Modal.Actions>
      </Modal>
    )
  }

  const LoginModal = () => {
    const [emailUsername, setEmailUsername] = useState("");
    const [password, setPassword] = useState("");
    const [emailUsernameError, setEmailUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleLoginSubmit = () => {
      setEmailUsernameError(emailUsername === "");
      setPasswordError(password === "");

      if (emailUsername !== "" && password !== "") {
        fetch("http://localhost:5000/auth", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': `Bearer ${localStorage.getItem("jwt")}`
          },
          body: JSON.stringify({
            email: emailUsername,
            password: password
          })
        }).then(response => response.json())
          .then((res) => {
            if (res.errors) {
              alert(res.errors[0].msg);
            } else if (res.error) {
              alert(res.error)
            } else {
              console.log("JUST LOGGED IN", res);
              localStorage.setItem("jwt", res.token);
              setIsLoggedIn(true);
              setOpenLoginModal(false);
            }
          })
      }
    };

    return (
      <Modal
        onClose={() => setOpenLoginModal(false)}
        onOpen={() => setOpenLoginModal(true)}
        open={openLoginModal}
        size="small"
      >
        <Modal.Header>Log In</Modal.Header>
        <Modal.Content>
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
              <Modal.Description>
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
                    style={{
                      backgroundColor: "var(--douglas-gray)",
                      color: "white",
                    }}
                    onClick={() => {
                      handleLoginSubmit();
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
                      Join us!
                      </Link>
                  </span>
                </Form>
              </Modal.Description>
            </Grid.Column>
            <Grid.Column>
              <Image
                src="../images/DSC_logo_brand.png"
                wrapped
                size="medium"
              />
            </Grid.Column>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Cancel"
            icon="close"
            onClick={() => setOpenLoginModal(false)}
            color="red"
          />
        </Modal.Actions>
      </Modal>
    )
  }

  const itemList = items.map(({ label, icon, path }) => {
    if (label === "About Us"
      || label === "Community") {
      return <Dropdown key={label} icon={icon} label={label} itemList={dropdowns[label]} />;
    }

    if (label === "Contact") {
      return (
        <div
          key={label}
          onClick={() => { setOpenContactUsModal(true) }}
        >
          <div className="ui item">
            <i className={`${icon} icon`}></i> {label}
            <ContactModal />
          </div>
        </div>
      );
    }

    if (label === "Login") {
      if (isLoggedIn) {
        return <Dropdown key="usermenu" label={`Hi, ${"bob"}`} icon="user" itemList={itemsDropdownUserMenu} />
      } else {
        return (
          <div
            key={label}
            onClick={() => { setOpenLoginModal(true) }}
          >
            <div className="ui item">
              <i className={`${icon} icon`}></i> {label}
              <LoginModal />
            </div>
          </div>
        );
      }
    }

    return (
      <NavLink to={`${path}`} exact={path === "/"} key={icon}>
        <div className={`item`} key={label}>
          <i className={`${icon} icon`}></i> {label}
        </div>
      </NavLink>
    );
  });

  useEffect(() => {
    console.log("BEFORE: ", localStorage.getItem("jwt"));
    fetch("http://localhost:5000/user/self", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(response => response.json())
      .then(res => {
        console.log("AFTER: ", localStorage.getItem("jwt"));
        console.log("HAHAHAHHAH", res);
        if (res && res.isExec) {
          //if this is admin, add their special menu
          itemsDropdownUserMenu.push({
            label: "Admin Settings",
            icon: "cogs",
            path: "/admin"
          });
        }
        if (res.msg) {
          // console.log("Setting isLoggedIn to false", res.error);
          // setIsLoggedIn(false);
          // localStorage.clear();
        } else {
          console.log("Setting isLoggedIn to Something: ", localStorage.getItem("jwt"));
          setIsLoggedIn(localStorage.getItem("jwt") !== null);
        }
      }, []);
  })

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
    </>
  );
};

export default Navbar;
