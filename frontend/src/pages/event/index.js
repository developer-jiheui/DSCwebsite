import React from "react";
import Footer from "../../components/Footer";
import Event from "../../components/Event";

import { Item } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import Navbar from "../../components/Navbar";
import "./index.css";

const Events = () => {
  return (
    <div >
      <Navbar></Navbar>
      <div className="wrapper">
      <h1>Events</h1>
      <Event></Event>
      <Event></Event>
      <Event></Event>
      <Event></Event>
      </div>
      {/* <Item.Group className="wrapper">
        <h1>Events</h1>
    <Item>
      <Item.Image size='medium' circular src='https://curiocity.com/edmonton/wp-content/uploads/2020/09/canada_games_council_niagara_2021_canada_summer_games_postponed.jpg' />

      <Item.Content>
      <Link to="/eventfeed">  <Item.Header as='a'>Douglas College</Item.Header> </Link>
        <Item.Meta> Lorem, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam quo beatae illo laudantium repellat. Ipsum, minus natus perspiciatis vitae laborum possimus cupiditate animi nesciunt a alias esse id voluptates eaque. ipsum dolor sit amet consectetur adipisicing elit. Odio perspiciatis amet pariatur iusto dolorem atque sequi, sed facilis consectetur enim vero, harum, nobis ea commodi incidunt voluptatem ullam nemo distinctio? </Item.Meta>
    
        <Item.Extra className="details" >Additional Details</Item.Extra>
      </Item.Content>
    </Item>

    <Item>
      <Item.Image rounded  size='medium' circular src='https://images.dailyhive.com/20180625114454/shutterstock_198202814.jpg' />

      <Item.Content>
      <Link to="/eventfeed">  <Item.Header as='a'>Douglas College</Item.Header> </Link>
        <Item.Meta> Lorem, Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, nobis cumque adipisci ullam ea id! Minus voluptas distinctio dicta modi, adipisci expedita commodi aliquid hic, unde, fugit numquam necessitatibus maiores. ipsum dolor sit amet consectetur adipisicing elit. Odio perspiciatis amet pariatur iusto dolorem atque sequi, sed facilis consectetur enim vero, harum, nobis ea commodi incidunt voluptatem ullam nemo distinctio? </Item.Meta>
         <Item.Extra className="details">Additional Details</Item.Extra>
      </Item.Content>
    </Item>
  </Item.Group> */}
      
      <Footer></Footer>
    </div>
    )
};

export default Events;
