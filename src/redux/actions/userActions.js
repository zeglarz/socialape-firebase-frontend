import axios from 'axios';

import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER
} from '../types';

const setAuthorizationHeader = token => {
    const AuthToken = `Bearer ${token}`;
    localStorage.setItem('AuthToken', AuthToken);
    axios.defaults.headers.common['Authorization'] = AuthToken;
};


export const loginUser = (userData, history) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/api/login', userData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 2000);
        });
};

export const signupUser = (newUserData, history) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/api/signup', newUserData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 2000);
        });
};

export const getUserData = () => dispatch => {
    dispatch({ type: LOADING_USER });
    axios.get('/api/user')
        .then(res => dispatch({
            type: SET_USER,
            payload: res.data
        }))
        .catch(err => console.log(err));
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem('AuthToken');
    delete axios.defaults.headers.common.Authorization;
    dispatch({ type: SET_UNAUTHENTICATED });
};
