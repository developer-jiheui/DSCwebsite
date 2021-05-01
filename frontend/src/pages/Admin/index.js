import React, {useState, useEffect } from "react";
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
    const [accessGranted, setAccessGranted] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/admin/dashboard", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${localStorage.getItem("jwt")}`
            }
        }).then(response => response.json())
        .then(res => {
            if(res && res.data) {
                setAccessGranted(true);
            } else {
                setAccessGranted(false);
            }
            console.log(res);            
        });
    });


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
                    <h1>{accessGranted ? "ADMINISTRATIVE SETTINGS" : "Access Denied"}</h1>
                    {accessGranted &&
                        <Tab menu={{ secondary: true, pointing: true }} panes={panes} renderActiveOnly={true} />
                    }
                </ContentContainer>
            </Container>                                  
            <Footer />
        </>
    )
}

export default Admin;