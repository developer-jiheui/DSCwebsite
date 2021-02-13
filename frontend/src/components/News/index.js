import React from "react";
import { Card, Image } from "semantic-ui-react";

import "./index.css";

const News = () => {
  return (
    <Card href="#" fluid>
      <Image
        size="tiny"
        centered
        src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>COVID 19 Updates</Card.Header>
        <Card.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <i className="calendar alternate outline icon"></i>
        February 19th, 2020
      </Card.Content>
    </Card>
  );
};

export default News;
