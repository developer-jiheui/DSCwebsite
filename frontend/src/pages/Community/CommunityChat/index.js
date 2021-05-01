import React from "react";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ContentContainer from "../../../components/ContentContainer";

import { Container } from "semantic-ui-react";

import "./index.css";

const CommunityChat = () => {
  return (
    <>
      <Navbar />
      <Container>
        <ContentContainer>
          <p>The community chat page is under construction. For now, you can check us out on <b>WhatsApp!</b></p>
        </ContentContainer>
      </Container>
      <Footer />
    </>
  );
}

export default CommunityChat;