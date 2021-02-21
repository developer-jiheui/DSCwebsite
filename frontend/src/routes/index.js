import React from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Signup from "../pages/Signup";
import Community from "../pages/Community";
import Events from "../pages/Events";
import News from "../pages/News";
import Team from "../pages/Team";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Homepage} />
      <Route path="/signup" component={Signup} />
      <Route path="/community" component={Community} />
      <Route path="/events" component={Events} />
      <Route path="/news" component={News} />
      <Route path="/team" component={Team} />
    </Switch>
  );
}
