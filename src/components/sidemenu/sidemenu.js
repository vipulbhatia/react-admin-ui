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
						<Link to={`${this.props.match.url}/home`}>
							<span><Glyphicon glyph="home" /></span>
							<span>Home</span>
						</Link>
					</li>
					<li className={ this.props.screen === 'ABOUT' ? 'active' : null }>
						<Link to={`${this.props.match.url}/about`}>
							<span><Glyphicon glyph="glass" /></span>
							<span>About</span>
						</Link>
					</li>
					<li className={ this.props.screen === 'ADMIN' ? 'active' : null }>
						<Link to={`${this.props.match.url}/admin`}>
							<span><Glyphicon glyph="cog" /></span>
							<span>Admin</span>
						</Link>
					</li>
				</ul>
			</div>
		)
	}
}
