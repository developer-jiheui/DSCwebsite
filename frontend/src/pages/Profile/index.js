import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  FormField,
  TextArea,
} from "semantic-ui-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import "./index.css";
import ContentContainer from "../../components/ContentContainer";
import PhotoUploader from "../../components/PhotoUploader";

const Profile = () => {
  const [edit, setEdit] = useState(true);
  return (
    <>
      <Navbar />
      <Container>
        <ContentContainer>
          <h1 style={{ textAlign: "center" }}>Welcome Joana Doe</h1>
          <Form>      
            <FormField>
              <PhotoUploader src="./images/profile.jpeg" circular/>
            </FormField>          
            <Form.Field
              label="Name"
              control="input"
              type="text"
              placeholder={edit ? "Joana Doe" : "Name"}
              disabled={edit}
            ></Form.Field>
            <Form.Field
              label="Email"
              control="input"
              type="email"
              placeholder={edit ? "joanadoe@email.com" : "example@email.com"}
              disabled={edit}
            ></Form.Field>
            <Form.Field
              label="Github"
              control="input"
              type="text"
              placeholder={edit ? "https://github.com/joanadoe" : "Github"}
              disabled={edit}
            ></Form.Field>
            <Form.Field
              label="LinkedIn"
              control="input"
              type="text"
              placeholder={edit ? "" : "LinkedIn"}
              disabled={edit}
            ></Form.Field>
            <Form.Field
              label="Website"
              control="input"
              type="text"
              placeholder={edit ? "" : "Website"}
              disabled={edit}
            ></Form.Field>
            <FormField>
              <TextArea
                placeholder={
                  edit
                    ? "Hi there, My name is Joana and I am not good to talk about myself. Except that I like to code and make new friends."
                    : "Tell us a bit about yourself..."
                }
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
        </ContentContainer>
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
