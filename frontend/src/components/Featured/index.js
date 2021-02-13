import React from "react";
import { Button, Container, Image } from 'semantic-ui-react';
import "./index.css";

const Featured = () => {
    return (<Container id="featuredContent">
            <Image id="featuredBkgImg" src="./images/CoverPhoto-Plain.png" />
            <Image id="featuredCircleBlue" src="./images/CoverPhoto-CircleBlue.png" />
            <Image id="featuredCirclePlain" src="./images/CoverPhoto-Circle.png" />
            <Image id="featuredCircleLines" src="./images/CoverPhoto-CircleLines.png" />
            <Image id="featuredFace" src="./images/CoverPhoto-Face.png" />
            <Button id="getToKnowUs">Get To Know Us</Button>
            <h1 id="featuredText">&#123;Creative Minds </h1>
            <h1 id="featuredText2">&#125;</h1>
            
           </Container>);
}

export default Featured;