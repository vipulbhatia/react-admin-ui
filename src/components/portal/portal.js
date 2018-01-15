import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/user';
import './portal.css';
import EventEmitter from 'events';
import { Col, Grid, Button } from 'react-bootstrap';
import SideMenu from '../sidemenu';
import Home from '../home';
import About from '../about';
import Admin from '../admin';

class Portal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: null
        };
        this.eventEmitter = new EventEmitter();
    }

    componentWillMount() {
        this.eventEmitter.addListener('navigateScreen', (screen) => this.setState({ screen: screen }));
    }

    logout = () => {
        this.props.logout();
        window.localStorage.removeItem('jwt');
        this.props.history.push('/login');
    }

    render() {
        return (
            <Grid fluid className="display-table">
                <div className="display-table-row">
                    <Col sm={2} md={2} className="display-table-cell valign" id="side-menu-container">
                        <SideMenu screen={ this.state.screen } { ...this.props } />
                    </Col>
                    <Col sm={10} md={10} className="display-table-cell valign">
                        <div id="nav-header-container">
                            <h2>HEADER</h2>
                            <Button onClick={ this.logout }>Logout</Button>
                        </div>
                        <div id="content">
                            <Switch>
                                <Route path={ `${this.props.match.url}/home` } render={ () => <Home eventEmitter={ this.eventEmitter } {...this.props} /> } />
                                <Route path={ `${this.props.match.url}/about` } render={ () => <About eventEmitter={ this.eventEmitter } {...this.props} /> } />
                                <Route path={ `${this.props.match.url}/admin` } render={ () => <Admin eventEmitter={ this.eventEmitter } {...this.props} /> } />
                                <Redirect to={ `${this.props.match.url}/home` } />
                            </Switch>
                        </div>
                        <div id="nav-footer-container">
                            <h2>FOOTER</h2>
                        </div>
                    </Col>
                </div>
            </Grid>
        )
    }
}

export default connect(
    (state) => ({ jwt: state.user.jwt }),
    { logout }
)(Portal);
