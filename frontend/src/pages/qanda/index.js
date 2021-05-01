import React from "react";
import { Container, Image, Grid, Card, Divider } from "semantic-ui-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContentContainer from "../../components/ContentContainer";
import ContentToggler from "../../components/ContentToggler";

import './index.css';

const QandA = () => {
  const qandas = [
    {
      question: "Where can I find the ebook?", 
      answer:"You can download free e-book at https://z-lib.org. try to check out the website and search for the book you need  👍"
    },
    {
      question: "Where can I find the good resources for study?", 
      answer:"You can go to Linkedin Learning and sign up for free with your student account, it has great study materials that are free for the students"
    },
    {
      question: "Question 3", 
      answer:"Pellentesque tempor urna sapien, at sollicitudin nunc scelerisque in. Nullam odio nibh, rhoncus ut quam sed, porttitor luctus sem. Proin maximus euismod lectus vitae fermentum. Fusce iaculis urna in massa efficitur, id porta felis malesuada. Maecenas odio elit, rutrum in pharetra sed, tristique sit amet est. Suspendisse in hendrerit mauris, ut aliquam quam."
    }
  ];
  return (
    <>
      <Navbar />
      <Container>
        <ContentContainer>
          <h1>FREQUENTLY ASKED QUESTIONS</h1>
          <div id="qanda-content-container">
            {qandas.map((qa, id) =>
              <ContentToggler
                key="id"
                title={qa.question}
                icon="question circle icon">
                <p className="answer">{qa.answer}</p>
              </ContentToggler>
            )}
          </div>
        </ContentContainer>
      </Container>
      <Footer />
    </>
  );
};

export default QandA;