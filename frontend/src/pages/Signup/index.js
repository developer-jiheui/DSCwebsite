import React from "react";
import Footer from "../../components/Footer";
import { Button, Form, Checkbox, Container, Icon } from "semantic-ui-react";
import Navbar from "../../components/Navbar";
import "./index.css";

const Signup = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Container id="sign-up-container">
        <h2>Create an account</h2>
        <Form>
          <Form.Field>
            <Form.Field
              label="First Name"
              control="input"
              type="text"
              placeholder="First Name"
            ></Form.Field>
            <Form.Field
              label="Last Name"
              control="input"
              type="text"
              placeholder="Last Name"
            ></Form.Field>
            <Form.Group inline>
              <label>Preferred Pronouns</label>
              <Form.Field label="He/Him" control="input" type="checkbox" />
              <Form.Field label="She/Her" control="input" type="checkbox" />
              <Form.Field label="They/Them" control="input" type="checkbox" />
            </Form.Group>
            <Form.Field
              label="Email"
              control="input"
              type="email"
              placeholder="example@email.com"
            ></Form.Field>
            <Form.Field
              label="Password"
              control="input"
              type="password"
              placeholder="Password"
            ></Form.Field>
            <Form.Field
              label="Reenter the password"
              control="input"
              type="password"
              placeholder="Reenter the password"
            ></Form.Field>
            <Form.Field
              control={Checkbox}
              label={{ children: "I agree to the Terms and Conditions" }}
            />
            <Button
              content="Set focused"
              fluid
              type="sign up"
              style={{
                backgroundColor: "var(--douglas-gray)",
                color: "white",
              }}
            >
              Sign Up
            </Button>
            <div className="my"></div>
            <Button fluid color="facebook">
              <Icon name="facebook" /> Facebook
            </Button>
            <div className="my"></div>
            <Button fluid color="google plus">
              <Icon name="google plus" /> Google
            </Button>
            {/* <div className="my"></div>
              <Button fluid color="linkedin">
                <Icon name="linkedin" /> LinkedIn
              </Button> */}
          </Form.Field>
        </Form>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default Signup;
