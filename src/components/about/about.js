import React from 'react';

export default class About extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.eventEmitter.emit('navigateScreen', 'ABOUT');
	}

	render() {
		return (
			<h1>About Us!!!</h1>
		)
	}
}