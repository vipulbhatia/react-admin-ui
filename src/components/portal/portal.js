import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Col } from 'react-bootstrap';

const Home = () => (<h1>Home!!!</h1>);

export default class Portal extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="container-fluid display-table">
                    <div className="display-table-row">
                        <Col md={2} className="display-table-cell valign">
                            <h3>SideMenu</h3>
                        </Col>
                        <Col md={10} className="display-table-cell valign">
                            <Route path={ this.props.match.url } component={ Home } />
                        </Col>
                    </div>
                </div>
            </div>
        )
    }
}
