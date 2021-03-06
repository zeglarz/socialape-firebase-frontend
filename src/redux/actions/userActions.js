import axios from 'axios';

import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER, MARK_NOTIFICATIONS_READ
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

export const uploadImage = formData => dispatch => {
    dispatch({ type: LOADING_USER });
    axios.post('/api/user/image', formData)
        .then(() => {
            dispatch(getUserData());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
            dispatch(getUserData());
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 3000);
            console.log(err);
        });
};

export const editUserDetails = userDetails => dispatch => {
    dispatch({ type: LOADING_USER });
    axios.post('/api/user', userDetails)
        .then(() => {
            dispatch(getUserData());
        })
        .catch(err => console.log(err));
};

export const markNotificationRead = (notificationIds) => dispatch => {
    axios.post('/api/notifications', notificationIds)
        .then(() => {
            dispatch({
                type: MARK_NOTIFICATIONS_READ
            });
        })
        .catch(err => console.log(err));
};
