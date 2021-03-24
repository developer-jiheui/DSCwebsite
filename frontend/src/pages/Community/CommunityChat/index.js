import React from "react";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ContentContainer from "../../../components/ContentContainer";
import { Container } from "semantic-ui-react";

import "./index.css";

const CommunityChat = () => {
    return (
        <>
          <Navbar>
          <Container>
            <ContentContainer>Check us out on WhatsApp!</ContentContainer>
          </Container>
          <Footer />
          </Navbar>
        </>
      );
}

export default CommunityChat;