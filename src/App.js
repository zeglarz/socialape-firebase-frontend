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
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
import axios from 'axios';


// Pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import User from './pages/user';

// Components
import Navbar from './components/layout/navbar';
import AuthRoute from './util/AuthRoute';

const theme = createMuiTheme(globalTheme);
const token = localStorage.AuthToken;
axios.defaults.baseURL = 'https://us-east1-socialape-659f4.cloudfunctions.net';

if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser());
        window.location.href = '/login';
    } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData());
    }
}

function App() {

    return (
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <Router>
                    <Navbar/>
                    <div className="container">
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route exact path='/users/:handle' component={User}/>
                            <AuthRoute exact path='/login' component={Login}/>
                            <AuthRoute exact path='/signup' component={Signup}/>
                            <Route exact path='/users/:handle/scream/:screamId' component={User}/>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        </MuiThemeProvider>
    );
}

export default App;
