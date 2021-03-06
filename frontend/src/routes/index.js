import React from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Signup from "../pages/Signup";
import Community from "../pages/Community";
import Events from "../pages/Events";
import Team from "../pages/Team";
import Profile from "../pages/Profile";
import Event from "../pages/Event";
import Admin from "../pages/Admin";
import News from "../pages/News";
import NewsItem from "../pages/NewsItem";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Homepage} />
      <Route path="/signup" component={Signup} />
      <Route path="/community" component={Community} />
      <Route path="/events" component={Events} />
      <Route path="/event/:id" component={Event}/>
      <Route path="/team" component={Team} />
      <Route path="/profile" component={Profile} />
      <Route path="/admin" component={Admin} />
      <Route path="/news" component={News} />
      <Route path="/newsitem/:id" component={NewsItem} />
    </Switch>
  );
}
