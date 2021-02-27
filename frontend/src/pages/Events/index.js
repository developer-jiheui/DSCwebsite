import React from "react";
import { Container } from "semantic-ui-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContentContainer from "../../components/ContentContainer";

const Events = () => {
  return (
    <>
      <Container>
        <Navbar />
        <ContentContainer>
          Events
        </ContentContainer>
        <Footer />
      </Container>
    </>
  );
};

export default Events;
