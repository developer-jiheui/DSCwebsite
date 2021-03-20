import React, { useState } from "react";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ContentContainer from "../../../components/ContentContainer";
import CommentFeed from "../../../components/CommentFeed";
import ContentToggler from "../../../components/ContentToggler";

import { Button, Card, Container, Divider, Form, Grid, Icon, Input, Modal, Search, TextArea } from "semantic-ui-react";

import "./index.css";

const stubPosts = [{}, {}, {}];

const CareerPage = () => {
    const [openCreateCareerPostModal, setOpenCreateCareerPostModal] = useState(false);
    
    const createJobPost = (e) =>{
        //TODO: validate
        //TODO: create job post and add to jobs list
        setOpenCreateCareerPostModal(false);
    }

    return (
        <>
            <Navbar>
                <Container>
                    <ContentContainer>
                        <h1>Launch Your Career</h1>
                        <p className="centered-text">Found a cool job post? Need career advice? This is where that all happens!</p>
                        <Grid columns="4">
                            <Grid.Column width="4">
                                <Button color="purple" onClick={() => setOpenCreateCareerPostModal(true)}>Create Post</Button>
                            </Grid.Column>
                            <Grid.Column width="8">
                                <Search className="full-width-search" placeholder="Search posts" />
                            </Grid.Column>
                            <Grid.Column textAlign="right" width="4">
                                <Button icon="filter" color="purple"></Button>
                                <Button icon="list" color="purple"></Button>
                            </Grid.Column>
                        </Grid>
                        <Divider></Divider>
                        <Card.Group centered itemsPerRow="1">
                            {stubPosts.length === 0 && <p>No posts to show...</p>}
                            {stubPosts.map((post, id) =>
                                <Card raised>
                                    <Card.Content>
                                        <Card.Header>Post Title</Card.Header>
                                        <Card.Meta>Posted March 3rd 2021</Card.Meta>
                                        <Card.Description>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                            <a>http://link.to.jobost.ca</a>
                                        </Card.Description>
                                        <Card.Meta id="post-tag-list">
                                            <a>#new</a>
                                            <a>#loremtag</a>
                                            <a>#ipsum</a>
                                            <a>#dolor</a>
                                        </Card.Meta>
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
                    id="create-career-post-modal"
                    onClose={() => setOpenCreateCareerPostModal(false)}
                    onOpen={() => setOpenCreateCareerPostModal(true)}
                    size="tiny"
                    open={openCreateCareerPostModal}
                >
                    <Modal.Content>
                        <Modal.Description>
                            <h1>Create Post</h1>
                            <Form>
                                <Form.Field
                                    control={Input}
                                    placeholder="What is the job title?"
                                    name="title"
                                    label="Title"
                                />
                                <Form.Field
                                    control={TextArea}
                                    placeholder="What is the job description"
                                    name="description"
                                    label="Description"
                                />
                                <Form.Field
                                    control={Input}
                                    placeholder="#junior#c++"
                                    name="tags"
                                    label="Tags"
                                />
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            content="Cancel"
                            onClick={() => setOpenCreateCareerPostModal(false)}
                        />
                        <Button
                            content="Post"
                            onClick={createJobPost}
                            positive
                        />
                    </Modal.Actions>
                </Modal>
                <Footer />
            </Navbar>
        </>
    );
}

export default CareerPage;