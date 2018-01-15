import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Login from './components/login/';
import Register from './components/register';
import Portal from './components/portal/';
import { Provider } from 'react-redux';
import store from './store';

const PrivateRoute = ({ ...rest }) => (
    store.getState().user.jwt ? <Route { ...rest } /> : <Redirect to="/login" />
)

export default class App extends React.Component {
    render() {
        return (
            <Provider store={ store }>
                <Router>
                    <Switch>
                        <Route path="/login" component={ Login } />
                        <Route path="/register" component={ Register } />
                        <PrivateRoute path="/portal" component={ Portal } />
                        <Redirect to="/login" />
                    </Switch>
                </Router>
            </Provider>
        )
    }
}
