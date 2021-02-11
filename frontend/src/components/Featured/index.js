import React from "react";
import { Button, Container, Image } from 'semantic-ui-react';
import MulticolorAnimation from "../MulticolorAnimation";
import "./index.css";

const Featured = () => {
    return (<Container id="featuredContent">
            <MulticolorAnimation></MulticolorAnimation>
            <Image id="featuredBkgImg" src="./images/CoverPhoto-Plain.png" />
            <Image class="featured-circles" id="featuredCircleBlue" src="./images/CoverPhoto-CircleBlue.png" />
            <Image class="featured-circles" id="featuredCirclePlain" src="./images/CoverPhoto-Circle.png" />
            <Image class="featured-circles" id="featuredCircleLines" src="./images/CoverPhoto-CircleLines.png" />
            <Button id="getToKnowUs">Get To Know Us</Button>
           </Container>);
}

export default Featured;