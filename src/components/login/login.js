import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { login } from '../../store/actions/user';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                {!this.props.loggedIn ?
                    (
                        <div>
                            <h1>Login</h1>
                            <Button onClick={ () => this.props.login() }>Login</Button>
                        </div>
                    ) :
                    (
                        <Redirect to="/portal" />
                    )
                }
            </React.Fragment>
        )
    }
}

export default connect(
    (state) => ({ loggedIn: state.user.loggedIn }),
    { login }
)(Login);
