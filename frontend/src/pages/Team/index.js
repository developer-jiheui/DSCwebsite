import React from "react";
import {
  Card,
  Container,
  Grid,
  Image,
  Reveal,
  Icon
}
  from "semantic-ui-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContentContainer from "../../components/ContentContainer";


import './index.css';

const admins = [
  { firstname: "", lastname: "", bio: "", img: "" },
  { firstname: "", lastname: "", bio: "", img: "" },
  { firstname: "", lastname: "", bio: "", img: "" },
];

const members = [
  { firstname: "", lastname: "", bio: "" },
  { firstname: "", lastname: "", bio: "" },
  { firstname: "", lastname: "", bio: "" },
  { firstname: "", lastname: "", bio: "" },
  { firstname: "", lastname: "", bio: "" },
  { firstname: "", lastname: "", bio: "" },
  { firstname: "", lastname: "", bio: "" },

  { firstname: "", lastname: "", bio: "" },
];

const Team = () => {
  return (
    <>
      <Navbar />
      <Container>
        <ContentContainer>
          <h1>Meet the Admins</h1>
          <Grid columns="4" stackable centered>
            {admins.map((admin) =>
              <Grid.Column>
                <Card>
                  <Image circular src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' wrapped ui={false} />
                  <Card.Content>
                    <Card.Header><i class="chess queen icon"></i>Daniel</Card.Header>
                    <Card.Meta>Joined in 2016</Card.Meta>
                    <Card.Description>
                      Daniel is a comedian living in Nashville.
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra textAlign="center">
                  <a target="_blank" rel="noreferrer"
                    href="">
                    <Icon size="large" name="linkedin"></Icon>
                  </a>        
                  <a target="_blank" rel="noreferrer"
                    href="">
                    <Icon size="large" name="github"></Icon>
                  </a>  
                  <a target="_blank" rel="noreferrer"
                    href="">
                    <Icon size="large" name="facebook"></Icon>
                  </a> 
                  <a target="_blank" rel="noreferrer"
                    href="">
                    <Icon size="large" name="instagram"></Icon>
                  </a> 
                  <a target="_blank" rel="noreferrer"
                    href="">
                    <Icon size="large" name="linkedin"></Icon>
                  </a>                                       
                  </Card.Content>
                </Card>
              </Grid.Column>
            )}
          </Grid>
          <h1>Meet the Members</h1>
          <Grid columns="4" stackable centered>
            {members.map((member) =>
              <Grid.Column>
                <Reveal animated='small fade'>
                  <Reveal.Content visible>
                    <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='small' />
                  </Reveal.Content>
                  <Reveal.Content hidden>
                    <Image src='https://react.semantic-ui.com/images/avatar/large/ade.jpg' size='small' />
                  </Reveal.Content>
                </Reveal>
              </Grid.Column>
            )}
          </Grid>
        </ContentContainer>
      </Container>
      <Footer />
    </>
  );
};

export default Team;
