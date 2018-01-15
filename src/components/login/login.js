import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, Col, Grid, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { renderInput, renderSubmit, Required } from '../form/form';
import { login } from '../../store/actions/user';
import store from '../../store';

const loginUser = (values) => {
    fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })
    .then((res) => res.json())
    .then((data) => {
        const jwt = data.results;
        if(jwt) {
            window.localStorage.setItem('jwt', jwt);
            store.dispatch(login(jwt));
        }
    });
}

const verifyUser = () => {
    const localJwt = window.localStorage.getItem('jwt');
    if(localJwt) {
        fetch('http://localhost:8000/api/verify', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localJwt
            }
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.results) store.dispatch(login(localJwt));
        });
    }
}

let LoginForm = ({ handleSubmit }) => {
    return (
        <Grid className="padding-top-10">
            <Col mdOffset={5}>
                <h1>Login</h1>
            </Col>
            <Form onSubmit={handleSubmit} horizontal className="padding-top-5">
                <Field type="email" name="email" label="Email" component={renderInput} validate={[ Required ]} />
                <Field type="password" name="password" label="Password" component={renderInput} validate={[ Required ]} />
                <Field type="submit" name="submit" label="Login" component={renderSubmit} />
                <Col mdOffset={5}><p>not registered yet? <Link to="/register">register</Link></p></Col>
            </Form>
        </Grid>
    )
}

LoginForm = reduxForm({
    form: 'login'
})(LoginForm);

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        verifyUser();
    }

    render() {
        return (
            !this.props.jwt ? <LoginForm onSubmit={ loginUser } { ...this.props } /> : <Redirect to="/portal" />
        )
    }
}

export default connect(
    (state) => ({ jwt: state.user.jwt }),
    null
)(Login);
