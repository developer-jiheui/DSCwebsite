import React from "react";
import { Icon } from "semantic-ui-react";

import "./index.css";

const Footer = () => {
  return (
    <footer>
      <ul>
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/douglas.developer/"
          >
            <Icon size="big" name="instagram"></Icon>
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/groups/8879294/"
          >
            <Icon size="big" name="linkedin"></Icon>
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/dsudevelopersclub"
          >
            <Icon size="big" name="github"></Icon>
          </a>
        </li>
      </ul>
      <p>Developed by CaffeineJunkies</p>
      <p>
        All Rights Reserved <Icon name="copyright outline"></Icon>2021 Copyright
      </p>
    </footer>
  );
};

export default Footer;
