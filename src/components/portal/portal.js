import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import './portal.css';
import EventEmitter from 'events';
import { Col, Grid } from 'react-bootstrap';
import SideMenu from '../sidemenu';
import Home from '../home';
import About from '../about';

export default class Portal extends React.Component {
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

    render() {
        return (
            <Grid fluid className="display-table">
                <div className="display-table-row">
                    <Col sm={2} md={2} className="display-table-cell valign" id="side-menu-container">
                        <SideMenu screen={ this.state.screen } />
                    </Col>
                    <Col sm={10} md={10} className="display-table-cell valign">
                        <div id="nav-header-container">
                            <h2>HEADER</h2>
                        </div>
                        <div id="content">
                            <Switch>
                                <Route path={ `${this.props.match.url}/home` } render={ () => <Home eventEmitter={ this.eventEmitter } /> } />
                                <Route path={ `${this.props.match.url}/about` } render={ () => <About eventEmitter={ this.eventEmitter } /> } />
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
