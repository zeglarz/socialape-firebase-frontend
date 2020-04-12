import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Pages

import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/signup' component={Signup}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
