import React from "react";
import { useParams } from "react-router-dom";

import CommentFeed from "../../components/CommentFeed";
import ContentContainer from "../../components/ContentContainer";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

import {
    Container,
    Image,
    Divider,
    Grid
} from "semantic-ui-react";

import './index.css';

const stubReplies = [
{ replies: [], name: "Ron Weisley", isAdmin: true, timestamp: "Fri Mar 08 2021", text: "Maecenas massa ipsum, aliquet ac diam ut, pharetra vestibulum sapien. Sed tincidunt tincidunt sapien vel aliquet. Aliquam at libero ut leo euismod porttitor. Etiam vestibulum nulla bibendum leo lobortis fermentum eu ut arcu. Etiam ornare massa non enim lobortis, eu finibus mi faucibus. " },
{ replies: [{ name: "Hermione9.3/4", timestamp: "Fri Mar 05 2021", text: "Morbi porta vehicula pellentesque. " }], name: "Hermione9.3/4", timestamp: "Fri Mar 05 2021", text: "Morbi porta vehicula pellentesque. " },
{ replies: [{ replies: [{ replies: [{ replies: [],name: "Hermione9.3/4", timestamp: "Fri Mar 05 2021", text: "Morbi porta vehicula pellentesque. " }], name: "Hermione9.3/4", timestamp: "Fri Mar 05 2021", text: "Morbi porta vehicula pellentesque. " }], name: "Hermione9.3/4", timestamp: "Fri Mar 05 2021", text: "Morbi porta vehicula pellentesque. " }], name: "Harry Potter", timestamp: "Fri Mar 03 2021", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada sollicitudin consectetur. Ut egestas lobortis venenatis. Pellentesque magna augue, tempor in rhoncus dignissim, congue nec turpis. Nullam vehicula sed orci maximus aliquam. Quisque interdum nec dui eget maximus." }];

const stubComments = [
    { replies: stubReplies, name: "Ron Weisley", isAdmin: true, timestamp: "Fri Mar 08 2021", text: "Maecenas massa ipsum, aliquet ac diam ut, pharetra vestibulum sapien. Sed tincidunt tincidunt sapien vel aliquet. Aliquam at libero ut leo euismod porttitor. Etiam vestibulum nulla bibendum leo lobortis fermentum eu ut arcu. Etiam ornare massa non enim lobortis, eu finibus mi faucibus. " },
    { replies: [], name: "Hermione9.3/4", timestamp: "Fri Mar 05 2021", text: "Morbi porta vehicula pellentesque. " },
    { replies: [], name: "Harry Potter", timestamp: "Fri Mar 03 2021", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada sollicitudin consectetur. Ut egestas lobortis venenatis. Pellentesque magna augue, tempor in rhoncus dignissim, congue nec turpis. Nullam vehicula sed orci maximus aliquam. Quisque interdum nec dui eget maximus." },
];

const Event = () => {
    const { id } = useParams();

    return (
        <>
            <Navbar />
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
                    <CommentFeed comments={stubComments} />
                </ContentContainer>
            </Container>
            <Footer />
        </>
    );
}

export default Event;