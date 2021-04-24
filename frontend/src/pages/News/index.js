import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Button, Container, Grid, Image } from "semantic-ui-react";
import ContentContainer from "../../components/ContentContainer";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";


import './index.css';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {    
    fetch("http://localhost:5000/posts/news", {
      method: 'GET',
      headers: {
        // 'Content-Type': 'application/json'      
      }    
    }).then(response => response.json())
    .then(data => {
      console.log(data.message);
      setNews(data.data);
    });    
  }, []);
    
  return (
    <>
      <Navbar>
        <Container>
          <ContentContainer>
            <h1>NEWS AND UPDATES</h1>
            <Grid columns="3" stackable doubling>
              {news.map((newsItem, id) =>
                <Grid.Column key={`news-${id}`} className="event-container" textAlign="center">
                  <Image
                    size="medium"
                    src="https://react.semantic-ui.com/images/wireframe/image.png"
                  />
                  <h2>{newsItem.title}</h2>
                  <p>{newsItem.description}</p>
                  <p>{new Date(newsItem.post_date).toDateString()}</p>
                  <Link to={`/news/${id}`}>
                    <Button color="purple">See More</Button>
                  </Link>
                </Grid.Column>
              )}
            </Grid>
          </ContentContainer>
        </Container>
        <Footer />
      </Navbar>
    </>
  );
}

export default News;