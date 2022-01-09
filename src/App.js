import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Homepage  from './pages/Homepage/Homepage';
import Calendar from './pages/Calendar/Calendar'
import Notifications from './pages/Notifications/Notifications';
import NavigationBar from './common/NavigationBar/NavigationBar';

import './index.scss';

const App = () => {
    return (
        <BrowserRouter>
            <NavigationBar />
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>
                <Route exact path="/calendar/:conferenceId">
                    <Calendar />
                </Route>
                <Route exact path="/notifications">
                    <Notifications />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
