import React from "react";
import { Grid, Card } from "semantic-ui-react";
import Featured from "../../components/Featured";
import Footer from "../../components/Footer";

import Navbar from "../../components/Navbar";
import News from "../../components/News";
import Event from "../../components/Event";
import "./index.css";

const Homepage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Featured></Featured>
      <Grid stackable id="events-news-container">
        <Grid.Column width={10} id="events-container">
          <h1>Events</h1>
          <Card.Group>
            <Event></Event>
            <Event></Event>
            <Event></Event>
            <Event></Event>
          </Card.Group>
        </Grid.Column>
        <Grid.Column width={6} id="news-container">
          <h1>News</h1>
          <Card.Group>
            <News></News>
            <News></News>
          </Card.Group>
        </Grid.Column>
      </Grid>
      <Footer></Footer>
    </div>
  );
};

export default Homepage;
