import React, { useState } from "react";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ContentContainer from "../../../components/ContentContainer";
import PhotoUploader from "../../../components/PhotoUploader";

import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Search,
  Image,
  Icon,
  Modal,
  Form,
  Input,
  TextArea
} from "semantic-ui-react";

import "./index.css";
import ReportContentAction from "../../../components/ReportContentAction";

const stubPosts = [
  {}, {}, {}, {}, {}, {}
];

const BuyAndSell = () => {
  const [openCreateSalePostModal, setOpenCreateSalePostModal] = useState(false);

  const handleOpenCreateModal = () => {
    setOpenCreateSalePostModal(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: data validation
    // TODO: create post and save to DB
    // TODO: update post list
    setOpenCreateSalePostModal(false);
  }

  return (
    <>
      <Navbar />
      <Container>
        <ContentContainer>
          <h1>Buy & Sell</h1>
          <p className="centered-text">Got stuff to sell? Looking to strike a deal?</p>
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
          <Divider></Divider>
          <Card.Group centered stackable>
            {stubPosts.length === 0 && <p>No posts to show...</p>}
            {stubPosts.map((post, id) =>
              <Card raised>
                <Image size="medium" src="https://react.semantic-ui.com/images/wireframe/image.png" />
                <Card.Content>
                  <Card.Header>Post Title - $500 </Card.Header>
                  <Card.Meta>Posted March 2nd, 2021</Card.Meta>
                  <Card.Description>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Card.Description>
                  <Card.Meta id="post-tag-list">
                    <a>#new</a>
                    <a>#loremtag</a>
                    <a>#ipsum</a>
                    <a>#dolor</a>
                  </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <Grid columns="2">
                    <Grid.Column>                        
                        <p><Icon name="point" />Vancouver, BC</p>                      
                        <ReportContentAction />
                    </Grid.Column>
                    <Grid.Column textAlign="right" verticalAlign="bottom">
                      <Button color="purple">Contact</Button>
                    </Grid.Column>
                  </Grid>
                </Card.Content>
              </Card>
            )}
          </Card.Group>
        </ContentContainer>
      </Container>
      <Modal
        id="create-sale-post-modal"
        onClose={() => setOpenCreateSalePostModal(false)}
        onOpen={() => setOpenCreateSalePostModal(true)}
        open={openCreateSalePostModal}
        size="tiny"
      >
        <Modal.Content>
          <Modal.Description>
            <h1>Create Post</h1>
            <Form>
              <Form.Field>
                <PhotoUploader />
              </Form.Field>
              <Form.Field
                control={Input}
                placeholder="What are you selling?"
                name="title"
                label="Title"
              />
              <Form.Field
                control={Input}
                placeholder="What's your contact email?"
                name="email"
                label="Email"
                type="email"
              />
              <Form.Field
                control={TextArea}
                placeholder="Tell us about it..."
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
            onClick={() => setOpenCreateSalePostModal(false)}
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

export default BuyAndSell;