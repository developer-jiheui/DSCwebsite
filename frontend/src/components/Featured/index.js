import React from "react";
import {Container, Image} from 'semantic-ui-react';
import MulticolorAnimation from "../MulticolorAnimation";
import "./index.css";

const Featured = () => {
    return <Container>
            <MulticolorAnimation></MulticolorAnimation>
            <div id="featuredImageContainer" style={{backgroundImage: 'url(./images/CoverPhoto-Plain.png'}}>
       

            </div>
            
            </Container>;
}

export default Featured;