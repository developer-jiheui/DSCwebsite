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

const EventCounter = ({ dateToCountDown }) => {
  const [countDownDay, setCountDownDay] = useState(0);
  const [countDownHour, setCountDownHour] = useState(0);
  const [countDownMin, setCountDownMin] = useState(0);
  const [countDownSec, setCountDownSec] = useState(0);

  useEffect(() => {
    const countDownDate = new Date(dateToCountDown).getTime();
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
  const [dateToCountDown, setDateToCountdown] = useState({});
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/posts/events", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => {
        setEvents(data.data);
        let countdownEvents = data.data.filter(d => d.is_countdown && (new Date(d.event_date) - new Date() > 0)).sort((a, b) => a.event_date - b.event_date);
        setDateToCountdown(countdownEvents[0]);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <ContentContainer>
          {dateToCountDown && dateToCountDown.event_date &&
            <>
              <h1>FEATURED EVENT</h1>
              <div id="event-featured">
                <div id="event-featured-overlay"></div>
                <h1 id="event-featured-title">{dateToCountDown.title}</h1>
                <p id="event-featured-description">{dateToCountDown.description}</p>
                <h2 id="event-featured-headline">Countdown to Deadline</h2>
                <h1 id="event-featured-countdown">
                  <EventCounter dateToCountDown={dateToCountDown.event_date} />
                </h1>
              </div>
            </>
          }
          <h1>UPCOMING EVENTS</h1>
          <Grid columns="3" stackable doubling>
            {events.map((event, index) =>
              <Grid.Column key={`event-${index}`}>
                <Image
                  className="poster-size-image"
                  src="https://react.semantic-ui.com/images/wireframe/image.png"
                />
                <h2>{event.title}</h2>
                <p className="justified-text">{event.description}</p>
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
