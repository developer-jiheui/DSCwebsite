import React from "react";
import { Link } from "react-router-dom";
import { Divider, Button, Card, Image, Grid } from "semantic-ui-react";

import "./index.css";

const Event = () => {
  return (
    <Card className="event" fluid>
      <Card.Content>
        <Card.Header>Title</Card.Header>
        <Divider></Divider>
        <Card.Description>
          <Grid>
            <Grid.Column width={6}>
        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small'  /> 
        </Grid.Column>
        <Grid.Column width={10}>
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
          </Grid.Column>
          </Grid>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <i className="calendar alternate outline icon"></i>
        February 19th, 2020
        <Link to="/eventfeed">
          <Button className="event-more-button">See More</Button>
        </Link>
      </Card.Content>
    </Card>
  );
};

export default Event;
