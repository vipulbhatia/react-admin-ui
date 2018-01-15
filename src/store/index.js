import { createStore, combineReducers } from 'redux';
import { userReducer } from './reducers/user';
import { reducer as formReducer } from 'redux-form';

const reducers = combineReducers({
    user: userReducer,
    form: formReducer
});

const store = createStore(reducers, window.devToolsExtension ? window.devToolsExtension() : f => f);

export default store;
