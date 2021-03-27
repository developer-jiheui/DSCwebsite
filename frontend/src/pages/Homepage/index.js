import React from "react";
import {
  Container,
  Image,
  Grid,
  Card,
  Button,
  Divider,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContentContainer from "../../components/ContentContainer";

import "./index.css";

const Homepage = () => {
  const stubEvents = [{}, {}, {}, {}];
  const stubNews = [{}, {}, {}];

  return (
    <>
      <Navbar />
      <Container>
        <div id="cover-container">
          <Image id="cover-image" src="./images/newCover.png"></Image>
          <div id="getToKnowUs-container">
            <Link to="/gettoknowus">
              <Button id="getToKnowUs">Get To Know Us</Button>
            </Link>
          </div>
          <h1 className="featured-text" id="featuredText">
            &#123;Creative Minds{" "}
          </h1>
          <h1 className="featured-text" id="featuredText2">
            &#125;
            </h1>
        </div>
        <ContentContainer>
          <Grid stackable>
            <Grid.Column width={10} id="events-container">
              <h1>EVENTS</h1>
              <Card.Group>
                {stubEvents.map((eventItem, id) => (
                  <Card className="card" fluid key={id}>
                    <Card.Content>
                      <Card.Header>Title</Card.Header>
                      <Divider></Divider>
                      <Card.Description>
                        <Grid stackable={false}>
                          <Grid.Column width={6} textAlign="center">
                            <Image
                              src="https://react.semantic-ui.com/images/wireframe/image.png"
                              className="poster-size-image"
                              centered
                            />
                          </Grid.Column>
                          <Grid.Column width={10}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore
                            et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est
                            laborum.
                            </Grid.Column>
                        </Grid>
                        <Divider></Divider>
                        <Card.Content extra>
                          <i className="calendar alternate outline icon"></i>
                            February 19th, 2020
                            <Link to={"/events/0"}>
                            <Button color="purple" floated="right">
                              See More
                              </Button>
                          </Link>
                        </Card.Content>
                      </Card.Description>
                    </Card.Content>
                  </Card>
                ))}
              </Card.Group>
            </Grid.Column>
            <Grid.Column width={6} id="news-container">
              <h1>NEWS</h1>
              <Card.Group>
                {stubNews.map((newsItem, id) => (
                  <Card className="card" fluid key={id}>
                    <Card.Content>
                      <Card.Header>COVID 19 - UPDATES</Card.Header>
                      <Card.Meta>
                        February 19th, 2020
                        </Card.Meta>
                      <Divider></Divider>
                      <Card.Description>
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore
                            et dolore magna aliqua.
                            </Card.Description>
                          <Divider></Divider>
                          <Link to={"/news/0"}>
                            <Button color="purple" floated="right">
                              See More
                              </Button>
                          </Link>
                        </Card.Content>
                      </Card.Description>
                    </Card.Content>
                  </Card>
                ))}
              </Card.Group>
            </Grid.Column>
          </Grid>
        </ContentContainer>
      </Container>
      <Footer />
    </>
  );
};

export default Homepage;
