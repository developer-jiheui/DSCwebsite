import React, { useRef, useState } from "react";
import Footer from "../../components/Footer";
import { Form, Checkbox, Container, Message } from "semantic-ui-react";
import Navbar from "../../components/Navbar";
import "./index.css";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [equalPassword, setEqualPassword] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [conditionsError, setConditionsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fullName === "") {
      setFullNameError(true);
    } else {
      setFullNameError(false);
    }
    if (email === "") {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (password === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (confirmPassword === "") {
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }

    if (password !== confirmPassword) {
      setEqualPassword(true);
    } else {
      setEqualPassword(false);
    }

    if (termsAndConditions) {
      setConditionsError(false);
    } else {
      setConditionsError(true);
    }

    // console.log(termsAndConditions);
  };
  return (
    <div>
      <Navbar></Navbar>
      <Container id="sign-up-container">
        <h2 style={{ color: "black" }}>Create an account</h2>
        {equalPassword ? (
          <Message
            error
            header={"Submission Error"}
            content={"Your passwords must match!"}
          />
        ) : null}
        {conditionsError ? (
          <Message
            error
            header={"Submission Error"}
            content={"You need to check the terms and agreement conditions box"}
          />
        ) : null}
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Form.Field
            id="name"
            label="Name*"
            control="input"
            type="text"
            // placeholder="Name"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            error={fullNameError}
          ></Form.Field>
          <Form.Field
            label="Nickname"
            control="input"
            type="text"
            // placeholder="nickname"
          ></Form.Field>
          <Form.Group inline>
            <label>Preferred Pronouns</label>
            <Form.Field label="He/Him" control="input" type="checkbox" />
            <Form.Field label="She/Her" control="input" type="checkbox" />
            <Form.Field label="They/Them" control="input" type="checkbox" />
          </Form.Group>
          <Form.Field
            id="email"
            label="Email*"
            control="input"
            type="email"
            // placeholder="example@email.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            error={emailError}
          ></Form.Field>
          <Form.Field
            id="password"
            label="Password*"
            control="input"
            type="password"
            // placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            error={passwordError}
          ></Form.Field>
          <Form.Field
            id="confirmPassword"
            label="Confirm the password*"
            control="input"
            type="password"
            // placeholder="Reenter the password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            error={confirmPasswordError}
          ></Form.Field>
          <Form.Field
            label="Github"
            control="input"
            type="text"
            // placeholder="Github"
          ></Form.Field>
          <Form.Field
            label="LinkedIn"
            control="input"
            type="text"
            // placeholder="LinkedIn"
          ></Form.Field>
          <Form.Field
            label="Website"
            control="input"
            type="text"
            // placeholder="Website"
          ></Form.Field>
          <Form.Field>
            <Checkbox
              label="I agree with the terms and conditions"
              onClick={(e, data) => {
                e.preventDefault();
                setTermsAndConditions(data.checked);
              }}
            />
          </Form.Field>
          <Form.Button
            content="Set focused"
            fluid
            type="sign up"
            style={{
              backgroundColor: "var(--douglas-gray)",
              color: "white",
            }}
            // disabled={!fullName || !email || !password || !confirmPassword}
          >
            Sign Up
          </Form.Button>
        </Form>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default Signup;
