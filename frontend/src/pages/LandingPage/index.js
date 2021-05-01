import React from 'react';
import { Container } from 'semantic-ui-react';
import ContentContainer from '../../components/ContentContainer';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const LandingPage = ({message}) => {

    return (
        <>
        <Navbar/>
        <Container>
            <ContentContainer>
                <h1>{message}</h1>
            </ContentContainer>
        </Container>
        <Footer/>
        </>
    )
}

export default LandingPage;