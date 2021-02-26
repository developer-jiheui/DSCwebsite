import React from "react";
import { Container, Form, Image } from "semantic-ui-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import "./index.css";

const Profile = () => {
  return (
    <>
      <Navbar />
      <Container>
        <div className="body">
          <Image src="https://unsplash.com/photos/Xi0SAAHOc-k"></Image>
          <Form>
            <Form.Field>
              <Form.Field
                label="Name"
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
            </Form.Field>
          </Form>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
