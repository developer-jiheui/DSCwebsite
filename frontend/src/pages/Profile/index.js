import React, { useState, useEffect } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContentContainer from "../../components/ContentContainer";
import PhotoUploader from "../../components/PhotoUploader";

import {
  Button,
  Container,
  Form,
  FormField,
  TextArea,
} from "semantic-ui-react";

import "./index.css";

const Profile = () => {
  const [currUser, setCurrUser] = useState({});
  const [edit, setEdit] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/user/self", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${localStorage.getItem("jwt")}`
      }
    }).then(response => response.json())
      .then(res => {
        console.log(res);
        if(res && res.firstName) {
          setCurrUser(res);
        }                
      });
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <ContentContainer>
          <h1 style={{ textAlign: "center" }}>Welcome {currUser.firstName + " " + currUser.lastName}</h1>
          <Form>      
            <FormField>
              <PhotoUploader src="./images/profile.jpeg" circular/>
            </FormField>          
            <Form.Field
              label="Name"
              control="input"
              type="text"
              placeholder={edit ? currUser.firstName : "Name"}
              disabled={edit}
            ></Form.Field>
            <Form.Field
              label="Email"
              control="input"
              type="email"
              placeholder={edit ? currUser.email : "example@email.com"}
              disabled={edit}
            ></Form.Field>
            <Form.Field
              label="Github"
              control="input"
              type="text"
              placeholder={edit ? currUser.avatar : "Github"}
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
                    ? currUser.bio
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
