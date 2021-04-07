import React from "react";
import { Card, Container } from "semantic-ui-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContentContainer from "../../components/ContentContainer";
import ContentToggler from "../../components/ContentToggler";

import './index.css';

const QandA = () => {
  const qandas = [
    {
      question: "Question 1", 
      answer:"Pellentesque tempor urna sapien, at sollicitudin nunc scelerisque in. Nullam odio nibh, rhoncus ut quam sed, porttitor luctus sem. Proin maximus euismod lectus vitae fermentum. Fusce iaculis urna in massa efficitur, id porta felis malesuada. Maecenas odio elit, rutrum in pharetra sed, tristique sit amet est. Suspendisse in hendrerit mauris, ut aliquam quam."
    },
    {
      question: "Question 2", 
      answer:"Pellentesque tempor urna sapien, at sollicitudin nunc scelerisque in. Nullam odio nibh, rhoncus ut quam sed, porttitor luctus sem. Proin maximus euismod lectus vitae fermentum. Fusce iaculis urna in massa efficitur, id porta felis malesuada. Maecenas odio elit, rutrum in pharetra sed, tristique sit amet est. Suspendisse in hendrerit mauris, ut aliquam quam."
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
          <div className="centered-text" id="qanda-content-container">
            {qandas.map((qa, id) =>
              <ContentToggler
                key="id"
                title={qa.question}
                icon="question circle icon">
                <p>{qa.answer}</p>
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