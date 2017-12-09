import React from 'react';
import { Link } from 'react-router-dom';
import './sidemenu.css';
import { Glyphicon } from 'react-bootstrap';

export default class SideMenu extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="side-menu">
				<h1>Side Menu</h1>
				<ul>
					<li className={ this.props.screen === 'HOME' ? 'active' : null }>
						<Link to="/portal/home">
							<span><Glyphicon glyph="home" /></span>
							<span>Home</span>
						</Link>
					</li>
					<li className={ this.props.screen === 'ABOUT' ? 'active' : null }>
						<Link to="/portal/about">About</Link>
					</li>
				</ul>
			</div>
		)
	}
}