import React from 'react';

export default class Admin extends React.Component {
    constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.eventEmitter.emit('navigateScreen', 'ADMIN');
	}

    render() {
        return (
            <h1>Admin Panel</h1>
        )
    }
}
