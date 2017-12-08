import React from 'react';
import { Col } from 'react-bootstrap';

export default class Portal extends React.Component {
    render() {
        return (
            <div>
                <div className="container-fluid display-table">
                    <div className="display-table-row">
                        <Col md={2} className="display-table-cell valign">
                            <h3>SideMenu</h3>
                        </Col>
                        <Col md={10} className="display-table-cell valign">
                            <h3>Main</h3>
                        </Col>
                    </div>
                </div>
            </div>
        )
    }
}
