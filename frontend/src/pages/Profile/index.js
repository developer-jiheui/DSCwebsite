import React, { useState } from "react";
import { Button, Card, Container, Form, Image } from "semantic-ui-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import "./index.css";

const Profile = () => {
  const [edit, setEdit] = useState(false);
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

          {edit ? (
            <Card>
              <div>Name: Joana Doe</div>
              <div>Email: joanadoe@gmail.com</div>
              <div>Email: joanadoe@gmail.com</div>
              <div>Github: </div>
              <div>LinkedIn: </div>
              <div>Website: </div>
              <Button
                type="submit"
                style={{
                  backgroundColor: "var(--douglas-gray)",
                  color: "white",
                }}
                onClick={() => {
                  setEdit(false);
                }}
              >
                Edit
              </Button>
            </Card>
          ) : (
            <Form>
              <Form.Field>
                <Form.Field
                  label="Name"
                  control="input"
                  type="text"
                  placeholder="Name"
                ></Form.Field>
                <Form.Field
                  label="Email"
                  control="input"
                  type="email"
                  placeholder="example@email.com"
                ></Form.Field>
                <Form.Field
                  label="Github"
                  control="input"
                  type="text"
                  placeholder="Github"
                ></Form.Field>
                <Form.Field
                  label="LinkedIn"
                  control="input"
                  type="text"
                  placeholder="LinkedIn"
                ></Form.Field>
                <Form.Field
                  label="Website"
                  control="input"
                  type="text"
                  placeholder="Website"
                ></Form.Field>
              </Form.Field>
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
            </Form>
          )}
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
