import { createStore, combineReducers } from 'redux';
import { userReducer } from './reducers/user';

const reducers = combineReducers({
    user: userReducer
});

const store = createStore(reducers, window.devToolsExtension ? window.devToolsExtension() : f => f);

export default store;
