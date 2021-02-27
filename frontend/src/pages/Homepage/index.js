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


import "./index.css";
import ContentContainer from "../../components/ContentContainer";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Image src="./images/cover.png"></Image>
        {/* <Button id="getToKnowUs" floated="right">
          Get To Know Us
        </Button>
        <h1 id="featuredText">&#123;Creative Minds </h1>
        <h1 id="featuredText2">&#125;</h1> */}
        <ContentContainer>
        <Grid stackable>
          <Grid.Column width={10} id="events-container">
            <h1>Events</h1>
            <Card.Group>
              <Card className="card" fluid>
                <Card.Content>
                  <Card.Header>Title</Card.Header>
                  <Divider></Divider>
                  <Card.Description>
                    <Grid>
                      <Grid.Column width={6}>
                        <Image
                          src="https://react.semantic-ui.com/images/wireframe/image.png"
                          size="small"
                        />
                      </Grid.Column>
                      <Grid.Column width={10}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </Grid.Column>
                    </Grid>
                    <Divider></Divider>
                    <Card.Content extra>
                      <i className="calendar alternate outline icon"></i>
                      February 19th, 2020
                      <Link to={"/events"}>
                        <Button className="event-more-button">See More</Button>
                      </Link>
                    </Card.Content>
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card className="card" fluid>
                <Card.Content>
                  <Card.Header>Title</Card.Header>
                  <Divider></Divider>
                  <Card.Description>
                    <Grid>
                      <Grid.Column width={6}>
                        <Image
                          src="https://react.semantic-ui.com/images/wireframe/image.png"
                          size="small"
                        />
                      </Grid.Column>
                      <Grid.Column width={10}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </Grid.Column>
                    </Grid>
                    <Divider></Divider>
                    <Card.Content extra>
                      <i className="calendar alternate outline icon"></i>
                      February 19th, 2020
                      <Link to={"/events"}>
                        <Button className="event-more-button">See More</Button>
                      </Link>
                    </Card.Content>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </Grid.Column>
          <Grid.Column width={6} id="news-container">
            <h1>News</h1>
            <Card.Group>
              <Card className="card" fluid>
                <Card.Content>
                  <Card.Header>Title</Card.Header>
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </Card.Description>
                    </Card.Content>
                  </Card.Description>
                </Card.Content>
              </Card>
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
