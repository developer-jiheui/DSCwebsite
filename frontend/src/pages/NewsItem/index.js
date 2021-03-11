import React  from "react";
import { useParams } from "react-router-dom";
import { Container, Image, Divider } from "semantic-ui-react";
import CommentFeed from "../../components/CommentFeed";
import ContentContainer from "../../components/ContentContainer";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";


import './index.css';

const stubComments = [
    { name: "Ron Weisley", timestamp: "Fri Mar 08 2021", text: "Maecenas massa ipsum, aliquet ac diam ut, pharetra vestibulum sapien. Sed tincidunt tincidunt sapien vel aliquet. Aliquam at libero ut leo euismod porttitor. Etiam vestibulum nulla bibendum leo lobortis fermentum eu ut arcu. Etiam ornare massa non enim lobortis, eu finibus mi faucibus. " },
    { name: "Hermione9.3/4", timestamp: "Fri Mar 05 2021", text: "Morbi porta vehicula pellentesque. " },
    { name: "Harry Potter",isAdmin: true,  timestamp: "Fri Mar 03 2021", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada sollicitudin consectetur. Ut egestas lobortis venenatis. Pellentesque magna augue, tempor in rhoncus dignissim, congue nec turpis. Nullam vehicula sed orci maximus aliquam. Quisque interdum nec dui eget maximus." },
];

const NewsItem = () => {
    const { id } = useParams();    

    return (
        <>
            <Navbar>
                <Container>
                    <ContentContainer>
                        <Image fluid src="https://react.semantic-ui.com/images/wireframe/image.png" />
                        <h1>COVID 19 - UPDATES</h1>
                        <p class="no-shine-text" id="news-item-date"><i>March 2, 2021</i></p>
                        <p class="no-shine-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p class="no-shine-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <Divider horizontal>Comments</Divider>
                        <CommentFeed comments={stubComments} />
                    </ContentContainer>
                </Container>
                <Footer />
            </Navbar>
        </>
    );
}

export default NewsItem;