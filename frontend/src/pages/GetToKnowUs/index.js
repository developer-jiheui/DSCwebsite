import React from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContentContainer from "../../components/ContentContainer";

import { Container, Image, Grid, Card, Divider, GridColumn } from "semantic-ui-react";

import './index.css';

const GetToKnowUs = () => {
  return (
    <>
      <Navbar />
      <Container>
        <ContentContainer>
          <p className="bigtext centered-text">
          Welcome to Developer Student Club!
          </p>

          <Grid Stackable>
          <Grid.Column width={15} id="photo Container">
              <Image
                  size="fit"
                  src="images/GTKUs/IMG_0745.jpg"
                  wrapped
                />
            </Grid.Column>
            <Grid.Column width={15} id = "gettoknowdescription">
            <p className="middletext">Developer Student Club builds <span class="highlight">a safe community</span> for who loves to code. <br></br>We do activities that help us to become <span class="orange_highlight">a professional developer</span></p>
            </Grid.Column>

            {/* <Grid.Column width={5} id="photo Container">
              <Image
                  size="fit"
                  src="images/GTKUs/thumbnail_Image (1).jpg"
                  wrapped
                />
            </Grid.Column> */}

            

          </Grid>
          {/* <img src="images/GTKUs/thumbnail_Image (1).jpg" alt="Girl in a jacket" width="500" height="600"/> */}
        </ContentContainer>
      </Container>
      <Footer />
    </>
  );
};

export default GetToKnowUs;
