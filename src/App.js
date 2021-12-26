import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";

import "./index.scss";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ConferenceSearch from "./pages/Landingpage/ConferenceSearch";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/home">
          <ConferenceSearch></ConferenceSearch>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
