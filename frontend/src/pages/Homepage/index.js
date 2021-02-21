import React from "react";
import { Container, Image, Grid, Card } from "semantic-ui-react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CardComponent from "../../components/CardComponent";

import "./index.css";

const Homepage = () => {
  return (
    <>
      <Container>
        <Navbar />
        <Image src="./images/cover.png"></Image>
        {/* <Button id="getToKnowUs" floated="right">
          Get To Know Us
        </Button>
        <h1 id="featuredText">&#123;Creative Minds </h1>
        <h1 id="featuredText2">&#125;</h1> */}
        <Grid stackable id="events-news-container">
          <Grid.Column width={10} id="events-container">
            <h1>Events</h1>
            <Card.Group>
              <CardComponent title="Title" isEvent date="February 19th, 2020">
                <Grid>
                  <Grid.Column width={6}>
                    <Image
                      src="https://react.semantic-ui.com/images/wireframe/image.png"
                      size="small"
                    />
                  </Grid.Column>
                  <Grid.Column width={10}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Grid.Column>
                </Grid>
              </CardComponent>
              <CardComponent title="Title" isEvent date="February 19th, 2020">
                <Grid>
                  <Grid.Column width={6}>
                    <Image
                      src="https://react.semantic-ui.com/images/wireframe/image.png"
                      size="small"
                    />
                  </Grid.Column>
                  <Grid.Column width={10}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Grid.Column>
                </Grid>
              </CardComponent>
            </Card.Group>
          </Grid.Column>
          <Grid.Column width={6} id="news-container">
            <h1>News</h1>
            <Card.Group>
              <CardComponent title="COVID-19 Update" date="February 19th, 2020">
                <Image
                  size="tiny"
                  centered
                  src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                  wrapped
                  ui={false}
                />
                <Card.Content>
                  <br></br>
                  <Card.Description>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Card.Description>
                </Card.Content>
              </CardComponent>
            </Card.Group>
          </Grid.Column>
        </Grid>
        <Footer />
      </Container>
    </>
  );
};

export default Homepage;
