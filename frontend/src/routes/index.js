import React from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Signup from "../pages/Signup";
import Community from "../pages/Community";
import PostingBuySell from "../pages/Community/PostingBuySell";
import CareerPage from "../pages/Community/Career";
import PostingCareer from "../pages/Community/PostingCareer"
import Events from "../pages/Events";
import Team from "../pages/Team";
import Profile from "../pages/Profile";
import Event from "../pages/Event";
import Admin from "../pages/Admin";
import News from "../pages/News";
import NewsItem from "../pages/NewsItem";
import Policies from "../pages/Policies";
import GetToKnowUs from "../pages/GetToKnowUs";
import TipsAndTricks from "../pages/Community/TipsAndTricks";
import PostingTipsAndTricks from "../pages/Community/PostingTipsAndTricks";
import BuyAndSell from "../pages/Community/BuyAndSell";
import Welcome from "../pages/Community/Welcome";
import CommunityChat from "../pages/Community/CommunityChat";
import QandA from "../pages/qanda";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Homepage} />
      <Route path="/signup" component={Signup} />
      <Route path="/community" exact component={Community} />

      <Route path="/community/tips" component={TipsAndTricks} />
      <Route path="/community/tipsandtricks/:id" component={PostingTipsAndTricks} />

      <Route path="/community/career" component={CareerPage} />
      <Route path="/community/postingcareer/:id" component={PostingCareer} />

      <Route path="/community/buyandsell" component={BuyAndSell} />
      <Route path="/community/postingBuySell/:id" component={PostingBuySell} />
      
      <Route path="/community/welcome" component={Welcome} />
      <Route path="/community/chat" component={CommunityChat} />
      <Route path="/events" exact component={Events} />
      <Route path="/events/:id" component={Event} />
      <Route path="/team" component={Team} />
      <Route path="/profile" component={Profile} />
      <Route path="/gettoknowus" component={GetToKnowUs} />
      <Route path="/admin" component={Admin} />
      <Route path="/policies" component={Policies} />
      <Route path="/qanda" component={QandA} />
      <Route path="/news" exact component={News} />
      <Route path="/news/:id" component={NewsItem} />
    </Switch>
  );
}
