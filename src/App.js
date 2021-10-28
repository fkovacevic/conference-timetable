import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Homepage  from './pages/Homepage/Homepage';

import './index.scss';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
