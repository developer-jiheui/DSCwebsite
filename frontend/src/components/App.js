import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Homepage from "../pages/Homepage";
import Events from "../pages/Events";
import Team from "../pages/Team";
import Community from "../pages/Community";
import Contact from "../pages/Contact";
import Signup from "../pages/Signup";
import Event from '../pages/event'
import MulticolorAnimation from "./MulticolorAnimation";

const App = () => {
  return (
    <div className="ui container">      
      <MulticolorAnimation/>
      <Router>
        <Route exact path="/" render={() => <Homepage />}></Route>
        <Route exact path="/eventfeed" render={() => <Events />}></Route>
        <Route path="/events" render={() => <Event />}></Route>
        <Route path="/team" render={() => <Team />}></Route>
        <Route path="/community" render={() => <Community />}></Route>
        <Route path="/contact" render={() => <Contact />}></Route>
        <Route path="/signup" render={() => <Signup />}></Route>
      </Router>
    </div>
  );
};

export default App;
