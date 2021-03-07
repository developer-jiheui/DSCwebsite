import React, { useRef, useState } from "react";
import Footer from "../../components/Footer";
import {
  Form,
  Checkbox,
  Container,
  Message,
  Breadcrumb,
  FormField,
} from "semantic-ui-react";
import Navbar from "../../components/Navbar";
import "./index.css";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(false);

  const [studentNumber, setStudentNumber] = useState("");
  const [studentNumberError, setStudentNumberError] = useState("");

  const [wppNumber, setWppNumber] = useState("");
  const [wppNumberError, setWppNumberError] = useState("");

  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [equalPassword, setEqualPassword] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [wppNumberCheckbox, setWppNumberCheckbox] = useState(false);
  const [numberCheckbox, setNumberCheckbox] = useState(false);
  const [conditionsError, setConditionsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName === "") {
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
    }
    if (lastName === "") {
      setLastNameError(true);
    } else {
      setLastNameError(false);
    }
    if (studentNumber === "") {
      setStudentNumberError(true);
    } else {
      setStudentNumberError(false);
    }
    if (number === "") {
      setNumberError(true);
    } else {
      setNumberError(false);
    }
    if (wppNumber === "") {
      setWppNumberError(true);
    } else {
      setWppNumberError(false);
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
    <>
      <Navbar>
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
            id="firstName"
            label="First Name*"
            control="input"
            type="text"
            // placeholder="Name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            error={firstNameError ? "Please enter your first name" : null}
          ></Form.Field>
          <Form.Field
            id="lastName"
            label="Last Name*"
            control="input"
            type="text"
            // placeholder="Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            error={lastNameError ? "Please enter your last name" : null}
          ></Form.Field>
          <Form.Field
            id="studentNumber"
            label="Student Number*"
            control="input"
            type="text"
            onChange={(e) => {
              setStudentNumber(e.target.value);
            }}
            error={
              studentNumberError ? "Please insert your student number" : null
            }
          ></Form.Field>
          <FormField>
            <Form.Field
              id="number"
              label="Number*"
              control="input"
              type="text"
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              error={
                numberError && !numberCheckbox
                  ? "Please insert your canadian number"
                  : null
              }
            ></Form.Field>
            <Checkbox
              label="I do not posses a canadian number"
              onClick={(e, data) => {
                e.preventDefault();
                setNumberCheckbox(data.checked);
              }}
            />
          </FormField>
          <FormField>
            <Form.Field
              id="number"
              label="Whatsapp Number*"
              control="input"
              type="text"
              onChange={(e) => {
                setWppNumber(e.target.value);
              }}
              error={
                wppNumberError && !wppNumberCheckbox
                  ? "Please insert your Whatsapp number"
                  : null
              }
            ></Form.Field>
            <Checkbox
              label="I do not posses a Whatssapp number"
              onClick={(e, data) => {
                e.preventDefault();
                setWppNumberCheckbox(data.checked);
              }}
            />
          </FormField>
          <Form.Field
            id="email"
            label="Email*"
            control="input"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            error={emailError ? "Please insert an email" : null}
          ></Form.Field>
          <Form.Field
            label="Preferred Name"
            control="input"
            type="text"
          ></Form.Field>
          <Form.Group inline>
            <label>Preferred Pronouns</label>
            <Form.Field label="He/Him" control="input" type="checkbox" />
            <Form.Field label="She/Her" control="input" type="checkbox" />
            <Form.Field label="They/Them" control="input" type="checkbox" />
          </Form.Group>
          <Form.Field
            id="password"
            label="Password*"
            control="input"
            type="password"
            // placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            error={passwordError ? "Please insert a password" : null}
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
            error={
              confirmPasswordError
                ? "please confirm the password"
                : password !== confirmPassword
                ? "please insert the same password"
                : null
            }
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
      </Navbar>
    </>
  );
};

export default Signup;
