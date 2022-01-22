import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Style/EntryStyle.css';

class Entry extends Component {
	constructor(props) {
		super(props);
	}
	state = {};
	render() {
		return (
			<div className='entry'>
				<div className='="entry-text-container'>
					<Link className='link' to={this.props.link}>
						<img
							className='entry-image'
							src={this.props.picture}
							alt={this.props.altDescription}
						></img>
						<div className='entry-description'>{this.props.description}</div>
						<div className='entry-title'>{this.props.title}</div>
						<div className='entry-seperator'></div>
						<div className='entry-text-box'>{this.props.text}</div>
					</Link>
				</div>
			</div>
		);
	}
}

export default Entry;
