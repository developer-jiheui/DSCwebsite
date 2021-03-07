import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Image, Divider, Form, Comment, Button, Grid } from "semantic-ui-react";
import ContentContainer from "../../components/ContentContainer";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

import './index.css';

const defaultProfilePicURL = "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=612x612&w=0&h=rvt5KGND3z8kfrHELplF9zmr8d6COZQ-1vYK9mvSxnc=";

const stubComments = [
    { name: "Ron Weisley", timestamp: "Fri Mar 08 2021", text: "Maecenas massa ipsum, aliquet ac diam ut, pharetra vestibulum sapien. Sed tincidunt tincidunt sapien vel aliquet. Aliquam at libero ut leo euismod porttitor. Etiam vestibulum nulla bibendum leo lobortis fermentum eu ut arcu. Etiam ornare massa non enim lobortis, eu finibus mi faucibus. " },
    { name: "Hermione9.3/4", timestamp: "Fri Mar 05 2021", text: "Morbi porta vehicula pellentesque. " },
    { name: "Harry Potter", timestamp: "Fri Mar 03 2021", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada sollicitudin consectetur. Ut egestas lobortis venenatis. Pellentesque magna augue, tempor in rhoncus dignissim, congue nec turpis. Nullam vehicula sed orci maximus aliquam. Quisque interdum nec dui eget maximus." },
];

const Event = () => {
    const { id } = useParams();

    const [emptyComment, setEmptyComment] = useState(false);
    const [comment, setComment] = useState("");

    const [comments, setComments] = useState(stubComments);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment === "") {
            setEmptyComment(true);
        } else {
            setComment("");
            comments.push({ name: "Bob", timestamp: new Date().toDateString(), text: comment });
            setEmptyComment(false);
        }
    };

    return (
        <>
            <Navbar>
                <Container>
                    <ContentContainer>
                        <Grid columns="2" stackable centered textAlign="justified">
                            <Grid.Row>
                                <Image id="event-page-image" fluid src="https://react.semantic-ui.com/images/wireframe/image.png" />
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <h2>Date</h2>
                                    <p><i>March 2, 2021</i></p>
                                </Grid.Column>
                                <Grid.Column width={12}>
                                    <h2>Event Title</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Divider horizontal>Comments</Divider>
                        <Comment.Group threaded minimal>
                            {comments.map((c, id) =>
                                <Comment>
                                    <Comment.Avatar src={defaultProfilePicURL} />
                                    <Comment.Content>
                                        <Comment.Author>{c.name}</Comment.Author>
                                        <Comment.Metadata>
                                            <div>{c.timestamp}</div>
                                        </Comment.Metadata>
                                        <Comment.Text>{c.text}</Comment.Text>
                                        {/* Uncomment below for Reply link to be visible */}
                                        {/* <Comment.Actions>
                                        <Comment.Action>Reply</Comment.Action>
                                    </Comment.Actions> */}
                                    </Comment.Content>
                                    {/* Adding replies to a comment - uncomment below*/}
                                    {/* <Comment.Group>
                                    <Comment>
                                        <Comment.Avatar src={defaultProfilePicURL} />
                                        <Comment.Content>
                                            <Comment.Author>Jenny Hess</Comment.Author>
                                            <Comment.Metadata>
                                                <div>Just now</div>
                                            </Comment.Metadata>
                                            <Comment.Text>Elliot you are always so right :)</Comment.Text>
                                            <Comment.Actions>
                                                <Comment.Action>Reply</Comment.Action>
                                            </Comment.Actions>
                                        </Comment.Content>
                                    </Comment>
                                </Comment.Group> */}
                                </Comment>
                            )}
                            <Form
                                reply
                                onSubmit={(e) => {
                                    handleSubmit(e);
                                }}>
                                <Form.TextArea
                                    placeholder="What do you think?"
                                    error={emptyComment}
                                    value={comment}
                                    onChange={(e) => {
                                        setComment(e.target.value);
                                        setEmptyComment(comment.length < 1);
                                    }}
                                />
                                <Button
                                    content='Comment'
                                    labelPosition='left'
                                    icon='edit'
                                    color="purple"
                                />
                            </Form>
                        </Comment.Group>
                    </ContentContainer>
                </Container>
                <Footer />
            </Navbar>
        </>
    );
}

export default Event;