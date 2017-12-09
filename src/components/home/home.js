import React from 'react';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.eventEmitter.emit('navigateScreen', 'HOME');
	}

	render() {
		return (
			<h1>Home!!!</h1>
		)
	}
}