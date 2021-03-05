import React, { useState } from "react";
import { Container, Grid, Segment, Image, Button } from "semantic-ui-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContentContainer from "../../components/ContentContainer";

import './index.css';
import { Link } from "react-router-dom";

const Events = () => {
  const [coundDownDay, setCountDownDay] = useState(0);
  const [coundDownHour, setCountDownHour] = useState(0);
  const [coundDownMin, setCountDownMin] = useState(0);
  const [coundDownSec, setCountDownSec] = useState(0);

  const events = [{}, {}, {}, {}];
  const coundDownDate = new Date("March 6, 2021 17:00:00").getTime();

  let x = setInterval(function () {
    let now = new Date().getTime();
    let timeToDeadline = coundDownDate - now;

    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (timeToDeadline > 0) {
      days = Math.floor(timeToDeadline / (1000 * 60 * 60 * 24));
      hours = Math.floor((timeToDeadline % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((timeToDeadline % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((timeToDeadline % (1000 * 60)) / 1000);
    }

    setCountDownDay(days);
    setCountDownHour(hours);
    setCountDownMin(minutes);
    setCountDownSec(seconds);
  }, 1000);

  return (
    <>
      <Navbar />
      <Container>
        <ContentContainer>
          <h1>Featured Event</h1>
          <div id="event-featured">
            <div id="event-featured-overlay"></div>
            <h1 id="event-featured-title">WEBSITE CONTEST</h1>
            <p id="event-featured-description">Pellentesque tempor urna sapien, at sollicitudin nunc scelerisque in. Proin maximus euismod lectus vitae fermentum. Fusce iaculis urna in massa efficitur, id porta felis malesuada.</p>
            <h2 id="event-featured-headline">Countdown to Deadline</h2>
            <h1 id="event-featured-countdown">{coundDownDay} days : {coundDownHour} hrs : {coundDownMin} mins : {coundDownSec} sec</h1>
          </div>
          <h1>Upcoming Events</h1>
          <Grid columns="3" stackable doubling>
            {events.map((event, id) =>
              <Grid.Column key={`event-${id}`} className="event-container" textAlign="center">
                <Image
                  size="medium"
                  src="https://react.semantic-ui.com/images/wireframe/image.png"
                />
                <h2>Event Title</h2>
                <p>Pellentesque tempor urna sapien, at sollicitudin nunc scelerisque in. Nullam odio nibh, rhoncus ut quam sed, porttitor luctus sem. Proin maximus euismod lectus vitae fermentum. Fusce iaculis urna in massa efficitur, id porta felis malesuada. Maecenas odio elit, rutrum in pharetra sed, tristique sit amet est. Suspendisse in hendrerit mauris, ut aliquam quam.</p>
                <h3>Important Dates</h3>
                <ul>
                  <li><b>Feb 12th, 2021 - 5pm:</b> Introductory Meeting</li>
                  <li><b>Mar 4th, 2021 - 5pm:</b> Judgment Day</li>
                </ul>
                <Button
                  color="purple"
                  as={Link}
                  to={`/event/${id}`}>See More</Button>
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
