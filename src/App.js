import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Homepage from './pages/Homepage/Homepage';
import Calendar from './pages/Calendar/Calendar';
import AdminConferencePage from './pages/admin/Conference/AdminConferencePage';
import AdminConferencesPage from './pages/admin/Conferences/AdminConferencesPage';

import './index.scss';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ConferenceSearch from './pages/Landingpage/ConferenceSearch';
import AuthContext from './auth_store/auth-context';
import { Button } from 'antd';

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Button onClick={authCtx.logout}>Logout</Button>
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

          <Route exact path="/conferences">
            <AdminConferencesPage />
          </Route>

          <Route exact path="/conferences/new">
            <AdminConferencePage />
          </Route>

          <Route exact path="/conferences/:conferenceId">
            <AdminConferencePage />
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
