import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

import CommentFeed from "../../components/CommentFeed";
import ContentContainer from "../../components/ContentContainer";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

import {
    Container,
    Image,
    Divider
} from "semantic-ui-react";

import './index.css';

const stubComments = [
    { name: "Ron Weisley", timestamp: "Fri Mar 08 2021", text: "Maecenas massa ipsum, aliquet ac diam ut, pharetra vestibulum sapien. Sed tincidunt tincidunt sapien vel aliquet. Aliquam at libero ut leo euismod porttitor. Etiam vestibulum nulla bibendum leo lobortis fermentum eu ut arcu. Etiam ornare massa non enim lobortis, eu finibus mi faucibus. " },
    { name: "Hermione9.3/4", timestamp: "Fri Mar 05 2021", text: "Morbi porta vehicula pellentesque. " },
    { name: "Harry Potter", isAdmin: true, timestamp: "Fri Mar 03 2021", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada sollicitudin consectetur. Ut egestas lobortis venenatis. Pellentesque magna augue, tempor in rhoncus dignissim, congue nec turpis. Nullam vehicula sed orci maximus aliquam. Quisque interdum nec dui eget maximus." },
];

const NewsItem = () => {
    const [newsItem, setNews] = useState({});
    const { id } = useParams();

     // Fetch the Event to populate our page
     useEffect(() => {
        fetch(`http://localhost:5000/posts/news/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                setNews(data.data[0]);
            });
    }, []);

    return (
        <>
            <Navbar />
            <Container>
                <ContentContainer>
                    <Image fluid src="https://react.semantic-ui.com/images/wireframe/image.png" />
                    <h1>{newsItem.title}</h1>
                    <p class="no-shine-text" id="news-item-date"><i>{new Date(newsItem.post_date).toDateString()}</i></p>
                    <p class="no-shine-text">{newsItem.description}</p>
                    <Divider horizontal>Comments</Divider>
                    <CommentFeed comments={stubComments} />
                </ContentContainer>
            </Container>
            <Footer />
        </>
    );
}

export default NewsItem;