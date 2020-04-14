import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducers';
import dataReducer from './reducers/dataReducers';
import uiReducer from './reducers/uiReducers';

const intialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: uiReducer
});

const store = createStore(reducers, intialState, composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
