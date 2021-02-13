import React from "react";
import Footer from "../../components/Footer";
import { 
 
  Button,
 } 
  from "semantic-ui-react";

import Navbar from "../../components/Navbar";
import "./index.css";

const Events = () => {
  return (
    
    <div className= "listevent" >
      <Navbar></Navbar>
      <div className="main" >
        <h1>Event Name: DSC Douglas college</h1>
        <div>
        <h2>Details</h2>
        <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus molestiae unde sit praesentium eius assumenda optio perspiciatis obcaecati doloribus nesciunt, aspernatur totam necessitatibus numquam quas? Doloribus consectetur maxime laudantium quibusdam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure vitae asperiores, enim, illum repudiandae veritatis esse quidem explicabo, porro odit quibusdam tempore perferendis. Unde dignissimos ratione quibusdam eaque nostrum corporis?</span>
        </div>
        
        <div className="content" >
        <h3>Important Details</h3>
          <span className="importante-info">
            <label className="info">Event date: </label>
            <label>02/15/2021 </label>
          </span>
          <span className="importante-info">
              <label className="info">Due Date</label>
              <label>03/06/2021 </label>
          </span>
        </div>
    

        <Button className="theme-color">Sign up to the event</Button>
      </div>
      <Footer></Footer>
    </div>
    )
};

export default Events;
