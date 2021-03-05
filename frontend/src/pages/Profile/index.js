import React, { useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  FormField,
  Image,
  TextArea,
} from "semantic-ui-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import "./index.css";

const Profile = () => {
  const [edit, setEdit] = useState(true);
  return (
    <>
      <Navbar />
      <Container>
        <div className="body" style={{ borderRadius: "5px" }}>
          <Image
            style={{ borderRadius: "50%" }}
            size="small"
            src="./images/profile.jpeg"
            centered
          />
          <h1 style={{ textAlign: "center" }}>Welcome Joana Doe</h1>

          <Form>
            <Form.Field
              label="Name"
              control="input"
              type="text"
              placeholder="Name"
              disabled={edit}
            ></Form.Field>
            <Form.Field
              label="Email"
              control="input"
              type="email"
              placeholder="example@email.com"
              disabled={edit}
            ></Form.Field>
            <Form.Field
              label="Github"
              control="input"
              type="text"
              placeholder="Github"
              disabled={edit}
            ></Form.Field>
            <Form.Field
              label="LinkedIn"
              control="input"
              type="text"
              placeholder="LinkedIn"
              disabled={edit}
            ></Form.Field>
            <Form.Field
              label="Website"
              control="input"
              type="text"
              placeholder="Website"
              disabled={edit}
            ></Form.Field>
            <FormField>
              <TextArea
                placeholder="Tell us a bit about yourself..."
                disabled={edit}
              ></TextArea>
            </FormField>
            {edit ? (
              <>
                <Button
                  type="submit"
                  onClick={() => {
                    setEdit(false);
                  }}
                  style={{
                    backgroundColor: "var(--douglas-gray)",
                    color: "white",
                  }}
                >
                  Edit
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="submit"
                  onClick={() => {
                    setEdit(true);
                  }}
                  positive
                >
                  Confirm
                </Button>
                <Button
                  type="submit"
                  onClick={() => {
                    setEdit(true);
                  }}
                  negative
                >
                  Cancel
                </Button>
              </>
            )}
          </Form>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
