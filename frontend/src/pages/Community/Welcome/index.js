import React from "react";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ContentContainer from "../../../components/ContentContainer";
import { Container } from "semantic-ui-react";

import "./index.css";

const Welcome = () => {
    return (
        <>
          <Navbar>
          <Container>
            <ContentContainer>Welcome Under construction...</ContentContainer>
          </Container>
          <Footer />
          </Navbar>
        </>
      );
}

export default Welcome;