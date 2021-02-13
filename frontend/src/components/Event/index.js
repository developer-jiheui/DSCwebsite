import React from "react";
import { Container, 
         Divider, 
         Segment, 
         Icon, 
         Reveal, 
         Image, 
         Button,
         Card} 
         from "semantic-ui-react";

import "./index.css";

const Event = () => {
    return <Card className="event" fluid>
        <Card.Content>
                <Card.Header>Title</Card.Header>
                <Divider></Divider>
                {/* <Reveal animated='small fade'>
                    <Reveal.Content visible>
                    <Image verticalAlign="middle" src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='small' />
                    </Reveal.Content>
                    <Reveal.Content hidden>
                    <Image verticalAlign="middle" src='https://react.semantic-ui.com/images/avatar/large/ade.jpg' size='small' />
                    </Reveal.Content>
                </Reveal> */}
                <Card.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Card.Description>                
            </Card.Content>
            <Card.Content extra>
                <i class="calendar alternate outline icon"></i> 
                February 19th, 2020
                <Button className="event-more-button">See More</Button>
            </Card.Content>
           </Card>;
}

export default Event;