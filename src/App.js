import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import Calendar from "./pages/Calendar/Calendar";

import "./index.scss";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ConferenceSearch from "./pages/Landingpage/ConferenceSearch";
import AuthContext from "./auth_store/auth-context";
import { Button } from "antd";
import axios from "axios";
import { unsubscribeUserReturnSubscription } from "./common/common";

const App = () => {
  const authCtx = useContext(AuthContext);
  const unSub = () => {
    const subId = localStorage.getItem("subId");
    axios
      .delete(
        `http://localhost:5000/api/Users/${authCtx.userid}/Subscriptions`,
        {
          headers: {
            Authorization: "Bearer " + authCtx.token, //localStorage.getItem("token"),
          },
          data: {
            id: subId, // This is the body part
          },
        }
      )
      .then(async (res) => {
        const sub = await unsubscribeUserReturnSubscription();
        console.log(sub);
        console.log("endpoint je " + sub.endpoint);
        console.log("Uspio si deletat s --> ", res.status);
      })
      .catch((err) => {
        console.log(err.message ?? err);
      });
  };

  return (
    <>
      {authCtx.isAdmin && <p>Admin je!</p>}
      {!authCtx.isAdmin && <p>Nije admin!</p>}
      {authCtx.isLoggedIn && <Button onClick={authCtx.logout}>Logout</Button>}
      {/* <Button onClick={unSub}>an sab ebbe</Button> */}
      <BrowserRouter>
        <Switch>
          {!authCtx.isLoggedIn && (
            <Route exact path="/">
              <Redirect to="login"></Redirect>
            </Route>
          )}
          {authCtx.isLoggedIn && (
            <Route exact path="/">
              <Redirect to="home"></Redirect>
            </Route>
          )}

          {!authCtx.isLoggedIn && (
            <Route exact path="/login">
              <Login />
            </Route>
          )}
          {!authCtx.isLoggedIn && (
            <Route exact path="/register">
              <Register />
            </Route>
          )}
          {authCtx.isLoggedIn && (
            <Route exact path="/home">
              <ConferenceSearch></ConferenceSearch>
            </Route>
          )}
          {authCtx.isLoggedIn && (
            <Route exact path="/calendar/:conferenceId">
              <Calendar />
            </Route>
          )}
          <Route path="/tryout">
            <Homepage></Homepage>
          </Route>

          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
