import { getByDisplayValue } from "@testing-library/react";
import React from "react";

import {
  Icon,
  Modal,
  Button,
  Input,
  Form,
  Checkbox,
  Grid,
  Container,
  ModalDescription,
} from "semantic-ui-react";
import Navbar from "../../components/Navbar";
import "./index.css";
import GoogleAuth from "../../api/GoogleAuth";

const Signup = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Navbar></Navbar>
      <Container id="sign-up-container">
        <h2>Sign Up Now!</h2>
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
            <Form.Field
              label="Email"
              control="input"
              type="email"
              placeholder="email@email.com"
            ></Form.Field>
            <Form.Group inline>
              <label>Preferred Pronouns</label>
              <Form.Field label="He/Him" control="input" type="checkbox" />
              <Form.Field label="She/Her" control="input" type="checkbox" />
              <Form.Field label="They/Them" control="input" type="checkbox" />
            </Form.Group>
            <Form.Field
              control={Checkbox}
              label={{ children: "I agree to the Terms and Conditions" }}
            />
            <Button
              content="Set focused"
              fluid
              type="submit"
              className="black-color"
              content="Submit"
            />
            <GoogleAuth />
          </Form.Field>
        </Form>
      </Container>
    </div>
  );
};

export default Signup;
