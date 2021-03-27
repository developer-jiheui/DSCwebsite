import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Grid, Image } from "semantic-ui-react";
import ContentContainer from "../../components/ContentContainer";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";


import './index.css';

const News = () => {

  const news = [{}, {}, {}, {}, {}];

  return (
    <>
      <Navbar />
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
                <h2>COVID 19 Strikes Again!</h2>
                <p>Pellentesque tempor urna sapien, at sollicitudin nunc scelerisque in. Nullam odio nibh, rhoncus ut quam sed, porttitor luctus sem. Proin maximus euismod lectus vitae fermentum. Fusce iaculis urna in massa efficitur, id porta felis malesuada. Maecenas odio elit, rutrum in pharetra sed, tristique sit amet est. Suspendisse in hendrerit mauris, ut aliquam quam.</p>
                <p>Feb 12th, 2021 - 5pm</p>
                <Link to={`/news/${id}`}>
                  <Button color="purple">See More</Button>
                </Link>
              </Grid.Column>
            )}
          </Grid>
        </ContentContainer>
      </Container>
      <Footer />
    </>
  );
}

export default News;