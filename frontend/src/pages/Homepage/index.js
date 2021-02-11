import React from "react";
import { Grid } from "semantic-ui-react";
import Featured from "../../components/Featured";
import Footer from "../../components/Footer";

import Navbar from "../../components/Navbar";
import "./index.css";

const Homepage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Featured></Featured>
      <Footer></Footer>
    </div>
  )
};

export default Homepage;
