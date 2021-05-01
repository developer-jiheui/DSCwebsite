import React from "react";
import ContentContainer from "../../components/ContentContainer";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import EventsPane from "./EventsPane";
import UsersPane from "./UsersPane";
import AdminPane from "./AdminPane";
import NewsPane from "./NewsPane";
import CommunityPostsPane from "./CommunityPostsPane";
import {Container, Tab } from "semantic-ui-react";

import './index.css';

const Admin = () => {    
    const panes = [
        {
            menuItem: 'Users',
            render: () => <UsersPane />
               
        },
        {
            menuItem: 'Events',
            render: () => <EventsPane/>
               
        },
        {
            menuItem: 'News',
            render: () => <NewsPane />               
        },
        {
            menuItem: 'Community Posts',
            render: () => <CommunityPostsPane/>
                
        },
        {
            menuItem: 'Admins',
            render: () => <AdminPane/>
                
        },

    ]

    return (
        <>
            <Navbar />
            <Container>
                <ContentContainer>
                    <h1>ADMINISTRATIVE SETTINGS</h1>
                    <Tab menu={{ secondary: true, pointing: true }} panes={panes} renderActiveOnly={true} />
                </ContentContainer>
            </Container>                                  
            <Footer />
        </>
    )
}

export default Admin;