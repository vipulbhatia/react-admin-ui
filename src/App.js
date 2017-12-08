import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './components/login/';
import Portal from './components/portal/';
import { Provider } from 'react-redux';
import store from './store';

export default class App extends React.Component {
    render() {
        return (
            <Provider store={ store }>
                <Router>
                    <div>
                        <Redirect to="/login" />
                        <Route path="/login" component={ Login } />
                        <Route path="/portal" component={ Portal } />
                    </div>
                </Router>
            </Provider>
        )
    }
}
