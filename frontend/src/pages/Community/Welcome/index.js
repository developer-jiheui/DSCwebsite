import React, { useState } from "react";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ContentContainer from "../../../components/ContentContainer";

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
import ContentToggler from "../../../components/ContentToggler";
import CommentFeed from "../../../components/CommentFeed";

const Welcome = () => {
  const posts = [{}, {}, {}];

  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);

  const handleOpenCreateModal = () => {
    setOpenCreatePostModal(true);
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
      <Navbar>
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
            <Card.Group itemsPerRow="3">
              {posts.map((post, id) =>
                <Card raised >
                  <Card.Content>
                  <Image size="huge" floated="left" circular avatar src="../images/Profiles/Jiheui.jpeg" />
                    <Card.Header>Hello I am Jiheui!</Card.Header>
                    <Card.Meta>CSIS - 2nd Year</Card.Meta>
                    <Card.Description>I am new here, hello.</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Card.Meta textAlign="right">
                      <Button color="blue">Get in Touch!</Button>
                    </Card.Meta>
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
        <Footer />
      </Navbar>
    </>
  );
}

export default Welcome;