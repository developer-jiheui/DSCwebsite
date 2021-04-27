import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContentContainer from "../../components/ContentContainer";

import {
  Container,
  Grid,
  Image,
  Button
} from "semantic-ui-react";

import './index.css';

const EventCounter = () => {
  const [countDownDay, setCountDownDay] = useState(0);
  const [countDownHour, setCountDownHour] = useState(0);
  const [countDownMin, setCountDownMin] = useState(0);
  const [countDownSec, setCountDownSec] = useState(0);

  useEffect(() => {
    const countDownDate = new Date("April 28, 2021 17:00:00").getTime();
    const intervalId = setInterval(() => {
      const time = countDownDate - Date.parse(new Date());
      setCountDownSec(Math.floor((time / 1000) % 60));
      setCountDownMin(Math.floor((time / 1000 / 60) % 60));
      setCountDownHour(Math.floor((time / (1000 * 60 * 60)) % 24));
      setCountDownDay(Math.floor(time / (1000 * 60 * 60 * 24)));
    }, 1000);
    return () => {
      clearInterval(intervalId);
    }
  }, []);
  return <>{countDownDay} days : {countDownHour} hrs : {countDownMin} mins : {countDownSec} sec</>;
}

const Events = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {    
    fetch("http://localhost:5000/posts/events", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'      
      }    
    }).then(response => response.json())
    .then(data => {
      console.log(data.message);
      setEvents(data.data);
    });    
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <ContentContainer>
          <h1>FEATURED EVENT</h1>
          <div id="event-featured">
            <div id="event-featured-overlay"></div>
            <h1 id="event-featured-title">WEBSITE CONTEST <br /> - <i>Backend Edition</i></h1>
            <p id="event-featured-description">Pellentesque tempor urna sapien, at sollicitudin nunc scelerisque in. Proin maximus euismod lectus vitae fermentum. Fusce iaculis urna in massa efficitur, id porta felis malesuada.</p>
            <h2 id="event-featured-headline">Countdown to Deadline</h2>
            <h1 id="event-featured-countdown"><EventCounter /></h1>
          </div>
          <h1>UPCOMING EVENTS</h1>
          <Grid columns="3" stackable doubling>
            {events.map((event, index) =>
              <Grid.Column key={`event-${index}`}>
                <Image
                  className="poster-size-image"
                  src="https://react.semantic-ui.com/images/wireframe/image.png"
                />
                  <h2>{event.title}</h2>
                <p class="justified-text">{event.description}</p>
                <Grid columns="2" stackable>
                  <Grid.Column>
                    <h3 style={{ display: "inline" }}>Date</h3>
                    <p><i>{new Date(event.event_date).toDateString()}</i></p>
                  </Grid.Column>
                  <Grid.Column floated="right" width="7">
                    <Link to={`/events/${event._id}`}>
                      <Button color="purple">See More</Button>
                    </Link>
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            )}
          </Grid>
        </ContentContainer>
      </Container>
      <Footer />
    </>
  );
};

export default Events;
