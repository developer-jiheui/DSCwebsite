import React, { useState, useEffect } from "react";
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
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    // fetch all the featured news
    fetch("http://localhost:5000/posts/news/featured", {
      method: 'GET',
      headers: {
        'Content-Type': 'applicaton/json'
      }
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        setNews(data.data);
      }).catch(error => {
        // in case there's a terrible error
        // could use some refining
        alert("Oops! Something went wrong :s");
        console.log(error);
      });

    // fetch all the featured events
    fetch("http://localhost:5000/posts/events/featured", {
      method: 'GET',
      headers: {
        'Content-Type': 'applicaton/json'
      }
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        setEvents(data.data);
      }).catch(error => {
        // in case there's a terrible error
        // could use some refining
        alert("Oops! Something went wrong :s");
        console.log(error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <div id="cover-container">
          <Image id="cover-image" src="./images/newCover.png"></Image>
          <Link to="/gettoknowus">
            <Button id="getToKnowUs">Get To Know Us</Button>
          </Link>
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
                {events.map((eventItem, id) => (
                  <Card className="card" fluid key={id}>
                    <Card.Content>
                      <Card.Header>{eventItem.title}</Card.Header>
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
                          <Grid.Column width={10}>{eventItem.description}</Grid.Column>
                        </Grid>
                        <Divider></Divider>
                        <Card.Content extra>
                          <i className="calendar alternate outline icon"></i>
                            February 19th, 2020
                            <Link to={`/events/${eventItem._id}`}>
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
                {news.map((newsItem, index) => (
                  <Card className="card" fluid key={index}>
                    <Card.Content>
                      <Card.Header>{newsItem.title}</Card.Header>
                      <Card.Meta>
                        {new Date(newsItem.post_date).toDateString()}
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
                          <Card.Description>{newsItem.description}</Card.Description>
                          <Divider></Divider>
                          <Link to={`/news/${newsItem._id}`}>
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
