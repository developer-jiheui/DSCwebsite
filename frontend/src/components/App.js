import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Navbar from "./Navbar";

const App = () => {
  return (
    <div className="ui container">
      <Router>
        <Navbar></Navbar>
      </Router>
    </div>
  );
};

export default App;
