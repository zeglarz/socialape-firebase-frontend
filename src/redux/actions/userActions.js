import axios from 'axios';

import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    MARK_NOTIFICATIONS_READ
} from '../types';

export const loginUser = (userData, history) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/api/login', userData)
        .then(res => {
            const AuthToken = `Bearer ${res.data.token}`;
            localStorage.setItem('AuthToken', AuthToken);
            axios.defaults.headers.common['Authorization'] = AuthToken;
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
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
