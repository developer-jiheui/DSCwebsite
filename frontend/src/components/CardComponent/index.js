import React from "react";
import { Divider, Card, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

// import "./index.css";

const CardComponent = ({ title, children, isEvent, isNews, date }) => {
  return (
    <Card className="card" fluid>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Divider></Divider>
        <Card.Description>{children}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <i className="calendar alternate outline icon"></i>
        {date}

        {isEvent ? (
          <Link to={"/events"}>
            <Button className="event-more-button">See More</Button>
          </Link>
        ) : null}

        {isNews ? <div>Bla</div> : null}
      </Card.Content>
    </Card>
  );
};

export default CardComponent;
