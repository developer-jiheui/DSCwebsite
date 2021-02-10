import React from "react";
import { Icon } from "semantic-ui-react";
import "./index.css";

const SocialMedia = () => {

    return <ul>
        <li><a target="_blank" href="https://www.instagram.com/douglas.developer/">
            <Icon 
            link=""
            size="big"            
            name="instagram"></Icon>
            </a></li>
        <li><a target="_blank" href="">
            <Icon 
            size="big"             
            name="whatsapp"></Icon>
            </a></li>
        <li><a target="_blank" href="https://github.com/dsudevelopersclub">
            <Icon 
            size="big"             
            name="github"></Icon>
            </a></li>
    </ul>;
}

export default SocialMedia;