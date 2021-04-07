import React, { useState } from "react";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ContentContainer from "../../../components/ContentContainer";
import CommentFeed from "../../../components/CommentFeed";
import ContentToggler from "../../../components/ContentToggler";

import {
  Container,
  Grid,
  Button,
  Card,
  Modal,
  Form,
  Input,
  TextArea,
  Search,
  Divider
} from "semantic-ui-react";

import "./index.css";

const stubPosts = [
  {}, {}, {}, {}, {}, {}
];

const TipsAndTricks = () => {
  const [openCreateTipPostModal, setOpenCreateTipPostModal] = useState(false);

  const handleOpenCreateModal = () => {
    setOpenCreateTipPostModal(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: data validation
    // TODO: create post and save to DB
    // TODO: update post list
    setOpenCreateTipPostModal(false);
  }

  return (
    <>
      <Navbar />
      <Container>
        <ContentContainer>
          <h1>Tips & Tricks For Success</h1>
          <p className="centered-text">Need some advice? Ask a question to your fellow members, or browse some of the common Q&As</p>
          <Grid columns="3" stackable={false} relaxed>
            <Grid.Column width="4">
              <Button color="purple" onClick={handleOpenCreateModal}>Create Post</Button>
            </Grid.Column>
            <Grid.Column width="8" textAlign="center">
              <Search className="full-width-search " placeholder="Search posts" />
            </Grid.Column>
            <Grid.Column textAlign="right" width="4">
              <Button icon="filter" color="purple"></Button>
              <Button icon="list" color="purple"></Button>
            </Grid.Column>
          </Grid>
          <Divider />
          <Card.Group centered itemsPerRow="1">
            {stubPosts.length === 0 && <p>No posts to show...</p>}
            {stubPosts.map((post, id) =>
              <Card raised>
                <Card.Content>
                  <Card.Header>Post Title</Card.Header>
                  <Card.Meta>Posted March 2nd, 2021</Card.Meta>
                  <Card.Description>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <ContentToggler title="13 Comments">
                    <CommentFeed comments={[{}, {}]} />
                  </ContentToggler>
                </Card.Content>
              </Card>
            )}
          </Card.Group>
        </ContentContainer>
      </Container>
      <Modal
        id="create-sale-post-modal"
        onClose={() => setOpenCreateTipPostModal(false)}
        onOpen={() => setOpenCreateTipPostModal(true)}
        open={openCreateTipPostModal}
        size="tiny"
      >
        <Modal.Content>
          <Modal.Description>
            <h1>Create Post</h1>
            <Form>
              <Form.Field
                control={Input}
                placeholder="What on your mind?"
                name="title"
                label="Title"
              />
              <Form.Field
                control={TextArea}
                placeholder="Tell us about it!"
                name="description"
                label="Description"
              />
              <Form.Field
                control={Input}
                placeholder="#tag"
                name="tags"
                label="Search Tags"
              />
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Cancel"
            onClick={() => setOpenCreateTipPostModal(false)}
          />
          <Button
            content="Post"
            onClick={handleSubmit}
            positive
          />
        </Modal.Actions>
      </Modal>
      <Footer />
    </>
  );
}

export default TipsAndTricks;