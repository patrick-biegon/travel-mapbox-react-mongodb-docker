import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
import loginForm from './components/loginForm';
import registerForm from './components/registerForm'
import AboutUs from './components/AboutUs';
import Help from './components/Help';
import Logout from './components/Logout';

function Router1() {
        return (
                <Router>
                        
                        <Switch>
                                <Route path="/" exact component={loginForm} />
                                <Route path="/Register" exact component={registerForm} />
                                <Route path="/App" exact component={App} />
                                <Route path="/AboutUs" exact component={AboutUs} />
                                <Route path="/Help" exact component={Help} />
                                <Route path="/Logout" exact component={Logout} />
                        </Switch>
                </Router>
        );
};

export default Router1;