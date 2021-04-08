import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
import loginForm from './components/loginForm';

function Router1() {
        return (
                <Router>
                        <Switch>
                                <Route path="/" exact component={loginForm} />
                                <Route path="/App" component={App} />
                        </Switch>
                </Router>
        );
};

export default Router1;