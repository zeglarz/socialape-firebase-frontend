import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import globalTheme from './util/theme';
import jwtDecode from 'jwt-decode';
// Redux store
import { Provider } from 'react-redux';
import store from './redux/store';

// Pages

import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

// Components
import Navbar from './components/navbar';
import AuthRoute from './util/AuthRoute';

const theme = createMuiTheme(globalTheme);
const token = localStorage.AuthToken;
let authenticated;
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        window.location.href = '/login';
        authenticated = false;
    } else {
        authenticated = true;
    }

}

function App() {
    return (
        <Provider store={store}>
            <MuiThemeProvider theme={theme}>
                <Router>
                    <Navbar/>
                    <div className="container">
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <AuthRoute exact path='/login' component={Login} authenticated={authenticated}/>
                            <AuthRoute exact path='/signup' component={Signup} authenticated={authenticated}/>
                        </Switch>
                    </div>
                </Router>
            </MuiThemeProvider>
        </Provider>
    );
}

export default App;
