import {
    SET_SCREAMS,
    LOADING_DATA,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    DELETE_SCREAM,
    LOADING_UI,
    POST_SCREAM,
    SET_ERRORS,
    CLEAR_ERRORS,
    STOP_LOADING_UI,
    SET_SCREAM, SUBMIT_COMMENT, GET_USER
} from '../types';
import axios from 'axios';

// Get all screams
export const getScreams = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios.get('/api/screams')
        .then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data
            });
        })
        .catch(() => {
            dispatch({
                type: SET_SCREAMS,
                payload: {}
            });
        });
};

// Like a scream
export const likeScream = screamId => dispatch => {
    axios.get(`/api/scream/${screamId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};

// Unlike a scream

export const unlikeScream = screamId => dispatch => {
    axios.get(`/api/scream/${screamId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};

export const deleteScream = screamId => dispatch => {
    axios.delete(`/api/scream/${screamId}`)
        .then(res => {
            dispatch({
                type: DELETE_SCREAM,
                payload: screamId
            });
        })
        .catch(err => console.log(err));
};

// Post a scream
export const postScream = newScream => dispatch => {
    dispatch({
        type: LOADING_UI
    });
    axios.post('/api/scream', newScream)
        .then(res => {
            dispatch({
                type: POST_SCREAM,
                payload: res.data
            });
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 3000);
        });

};

export const getScream = screamId => dispatch => {
    dispatch({ type: LOADING_UI });
    axios.get(`/api/scream/${screamId}`)
        .then(res => {
            dispatch({
                type: SET_SCREAM,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch(err => console.log(err));

};

export const submitComment = (screamId, commentData) => dispatch => {
    axios.post(`/api/scream/${screamId}/comment`, commentData)
        .then(res => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data
            });
            dispatch({
                type: CLEAR_ERRORS
            });
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 3000);
        });
};
export const getUserData = handle => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/api/user/${handle}`)
        .then(res => {
            dispatch({
                type: GET_USER,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};
