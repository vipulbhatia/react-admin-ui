import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { Form, Grid, Col, FormGroup } from 'react-bootstrap';
import { renderInput, renderSubmit, Required } from '../form/form';

const validate = (values) => {
    const errors = {};
    if(values.newPassword !== values.confirmPassword) errors.confirmPassword = 'Passwords should match!';
    return errors;
}

const registerUser = (values) => {
    fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

let RegisterForm = ({ handleSubmit }) => (
    <Grid className="padding-top-10">
        <Col mdOffset={5}>
            <h1>Register</h1>
        </Col>
        <Form onSubmit={ handleSubmit } horizontal className="padding-top-5">
            <Field name="email" type="email" label="Email" component={renderInput} validate={[ Required ]} />
            <Field name="newPassword" type="password" label="New Password" component={renderInput} validate={[ Required ]} />
            <Field name="confirmPassword" type="password" label="Confirm Password" component={renderInput} />
            <Field name="submit" type="button" label="Register" component={renderSubmit} />
            <Col mdOffset={5}><p>already registered? <Link to="/login">login</Link></p></Col>
        </Form>
    </Grid>
)

RegisterForm = reduxForm({
    form: 'register',
    validate
})(RegisterForm);

export default class Register extends React.Component {
    render() {
        return (
            <RegisterForm onSubmit={registerUser} />
        )
    }
}
