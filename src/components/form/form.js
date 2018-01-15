import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Alert, Button, Grid, Col, Form, FormGroup, FormControl, ControlLabel, Glyphicon } from 'react-bootstrap';

export const renderInput = (field) => (
    <FormGroup>
		<Col md={2} mdOffset={2}>
			<ControlLabel>{field.label}:</ControlLabel>
		</Col>
		<Col md={4}>
			{(field.type === 'select' || field.type === 'textarea')
                ? <React.Fragment>
                    <FormControl componentClass={field.type} placeholder={`your ${field.input.name}...`} value={field.input.value} onChange={field.input.onChange} onBlur={field.input.onBlur} />
                    {(field.meta.touched && field.meta.error) ? <Alert bsStyle="danger">{field.meta.error}</Alert> : null}
                  </React.Fragment>
                : <React.Fragment>
                    <FormControl type={field.type} placeholder={`your ${field.input.name}...`} value={field.input.value} onChange={field.input.onChange} onBlur={field.input.onBlur} />
                    {(field.meta.touched && field.meta.error) ? <Alert bsStyle="danger">{field.meta.error}</Alert> : null}
                  </React.Fragment>}
		</Col>
	</FormGroup>
)

export const renderSubmit = (field) => (
    <FormGroup>
        <Col md={1} mdOffset={5}>
            <Button type="submit" bsStyle="success">{field.label}</Button>
        </Col>
    </FormGroup>
)

export const renderField = (field) => (
    <FormControl type={field.type} placeholder={`your ${field.input.name}...`} value={field.input.value} onChange={field.input.onChange} />
)

const renderArray = ({ fields }) => (
    <div>
        {fields.map((member, index) => (
            <FormGroup key={index}>
                <Col md={2}>
                    <ControlLabel>Hobby #{index + 1}</ControlLabel>
                </Col>
                <Col md={4}>
                    <Field name={`${member}.hobby`} type="text" placeholder="your hobby..." component={renderField} />
                </Col>
                <Col md={1}>
                    <Glyphicon glyph="trash" onClick={ () => fields.remove(index) } />
                </Col>
            </FormGroup>
            )
        )}
        <Button type="button" onClick={ () => fields.push() }>+</Button>
    </div>
)

export const Required = (value) => (value ? undefined : 'Required');

let LoginForm = (props) => {
    const { handleSubmit } = props;
	return (
		<Form horizontal onSubmit={handleSubmit}>
			<Field name="email" type="text" label="Email" component={renderInput} validate={[ Required ]} />
            <Field name="address" type="textarea" label="Address" component={renderInput} validate={[ Required ]} />
			<Field name="password" type="password" label="Password" component={renderInput} />
            <FieldArray name="hobbies" component={renderArray} />
            <Field name="submit" type="button" value="submit" component={renderSubmit} />
		</Form>
	)
}

LoginForm = reduxForm({
	form: 'loginForm'
})(LoginForm);

export default LoginForm;
