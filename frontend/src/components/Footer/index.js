import React from "react";
import { Icon } from "semantic-ui-react";
import SocialMedia from "../SocialMedia";

import "./index.css";

const Footer = () => {

    return <footer>
            <SocialMedia></SocialMedia>
            <p>Developed by CaffeineJunkies</p>
            <p><Icon name="copyright outline"></Icon>2021 Copyright</p>
           </footer>;
}

export default Footer;