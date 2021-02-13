import { getByDisplayValue } from "@testing-library/react";
import React from "react";

import {
  Icon,
  Modal,
  Button,
  Input,
  Form,
  Grid,
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
      <div className="ui container">
        <h2>Sign Up Now</h2>

        <Form>
          <Form.Field>
            <Grid columns={1} textAlign="justify" verticalAlign="middle">
              <Grid.Column width="8">
                <label>First Name</label>
                <Input placeholder="First name"></Input>
                <br />
                <br />
                <label>Last Name</label>
                <Input placeholder="Last name"></Input>
                <br />
                <br />
                {/* </Grid.Column>
              <Grid.Column> */}
                <Form.Field label="Preferred Pronoun:" control="select">
                  <option value="select">Select</option>
                  <option value="he">He</option>
                  <option value="she">She</option>
                  <option value="they">They</option>
                  <option value="not-listed">A pronoum not listed</option>
                  <option value="no-preference">No pronoum preference</option>
                </Form.Field>
                {/* <br /> */}
                {/* <br /> */}
                <label>Email</label>
                <Input placeholder="example@email.com"></Input>
                <Button
                  content="Set focused"
                  fluid
                  type="submit"
                  className="black-color"
                  content="Submit"
                />
                <GoogleAuth />
              </Grid.Column>
            </Grid>
          </Form.Field>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
