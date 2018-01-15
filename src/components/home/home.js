import React from 'react';
import LoginForm from '../form';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.eventEmitter.emit('navigateScreen', 'HOME');
	}

	handleSubmit(v) {
		console.log(v);
	}

	render() {
		return (
			<LoginForm onSubmit={this.handleSubmit} />
		)
	}
}
