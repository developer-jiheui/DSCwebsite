import React, { useState } from "react";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ContentContainer from "../../../components/ContentContainer";
import ContentToggler from "../../../components/ContentToggler";
import CommentFeed from "../../../components/CommentFeed";

import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Icon,
  Image,
  Search,
  Modal,
  Form,
  Input,
  TextArea
} from "semantic-ui-react";

import "./index.css";

const Welcome = () => {
  const posts = [{}, {}, {}];

  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const [openContactModal, setOpenContactModal] = useState(false);
  const [activeMember, setActiveMember] = useState({});

  const handleOpenCreateModal = () => {
    setOpenCreatePostModal(true);
  }

  const handleOpenContactModal = (member) => {
    setActiveMember(member)
    setOpenContactModal(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: data validation
    // TODO: create post and save to DB
    // TODO: update post list
    setOpenCreatePostModal(false);
  }

  return (
    <>
      <Navbar />
      <Container>
        <ContentContainer>
          <h1>Welcome Newcomers!</h1>
          <p className="centered-text">Feel free to introduce yourself here, greet new members, and make new friends!</p>
          <Grid columns="2" stackable={false}>
            <Grid.Column width="12" textAlign="center">
              <Search className="full-width-search " placeholder="Search people" />
            </Grid.Column>
            <Grid.Column width="4" textAlign="right">
              <Button color="purple" onClick={handleOpenCreateModal}>Introduce Yourself!</Button>
            </Grid.Column>
          </Grid>
          <Divider></Divider>
          <Card.Group itemsPerRow="1">
            {posts.map((post, id) =>
              <Card raised >
                <Card.Content>
                  <Image size="huge" floated="left" circular avatar src="../images/Profiles/Jiheui.jpeg" />
                  <Card.Header>
                    <Button
                      color="blue"
                      floated="right"
                      onClick={() => handleOpenContactModal({})}
                    >
                      Get in Touch!
                      </Button>
                      Hello I am Jiheui!
                    </Card.Header>
                  <Card.Meta>CSIS - 2nd Year</Card.Meta>
                  <Card.Description>I am new here, hello.</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <ContentToggler title="1 Comment">
                    <CommentFeed centered comments={[{}]}></CommentFeed>
                  </ContentToggler>
                </Card.Content>
              </Card>
            )}
          </Card.Group>
        </ContentContainer>
      </Container>
      <Modal
        id="create-welcome-post-modal"
        onClose={() => setOpenCreatePostModal(false)}
        onOpen={() => setOpenCreatePostModal(true)}
        size="tiny"
        open={openCreatePostModal}
      >
        <Modal.Content>
          <Modal.Description>
            <h1>Introduce Yourself!</h1>
            <Form>
              <Form.Field
                control={Input}
                placeholder="Hello, I'm..."
                name="title"
                label="What is your name?"
              />
              <Form.Field
                control={Input}
                placeholder="CSIS - 3rd year"
                name="program"
                label="What program are you in?"
              />
              <Form.Field
                control={TextArea}
                placeholder="Which courses are you taking? What are your dreams and goals?"
                name="description"
                label="Tell us more about you!"
              />
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Cancel"
            onClick={() => setOpenCreatePostModal(false)}
          />
          <Button
            content="Post"
            onClick={handleSubmit}
            positive
          />
        </Modal.Actions>
      </Modal>
      <Modal
        id="contact-modal"
        onClose={() => setOpenContactModal(false)}
        onOpen={() => setOpenContactModal(true)}
        open={openContactModal}
        size="tiny">
        <Modal.Content>
          <Modal.Description>
            <Grid columns="2" stackable centered>
              <Grid.Column width="5" verticalAlign="middle">
                <Image
                  size="small"
                  circular
                  src="../images/Profiles/Jiheui.jpeg"
                  wrapped
                />
              </Grid.Column>
              <Grid.Column width="11" verticalAlign="middle">
                <Grid.Row><h1>Jiheui Lee</h1></Grid.Row>
                <Grid.Row className="centered-text">
                  <p>You can reach me at the following:</p>
                  <div className="member-media-links">
                    <a target="_blank" rel="noreferrer"
                      href="#">
                      <Icon size="large" name="linkedin"></Icon>
                    </a>
                    <a target="_blank" rel="noreferrer"
                      href="#">
                      <Icon size="large" name="github"></Icon>
                    </a>
                    <a target="_blank" rel="noreferrer"
                      href="#">
                      <Icon size="large" name="globe icon"></Icon>
                    </a>
                    <a target="_blank" rel="noreferrer"
                      href="#">
                      <Icon size="large" name="mail icon"></Icon>
                    </a>
                  </div>
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Cool Beans"
            labelPosition="right"
            icon="thumbs up outline"
            onClick={() => setOpenContactModal(false)}
          />
        </Modal.Actions>
      </Modal>
      <Footer />
    </>
  );
}

export default Welcome;