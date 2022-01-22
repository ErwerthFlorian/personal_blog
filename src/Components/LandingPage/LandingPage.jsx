import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import Three from '../Three/Three';
import './Style/landing-page.css';

class LandingPage extends Component {
	constructor(props) {
		super(props);
	}

	name = 'LandingPage';
	state = {
		numSquaresX: 5,
		numSquaresY: 5,
		width: 0,
		timer: false,
		created: false,
	};
	tiles = [];
	nRow = -1;

	render() {
		return (
			<div>
				{this.state.timer ? (
					<div className='background'>
						<h1 className='caption'>
							Welcome to my blog
							<Link to='/Home' className='landing-button'>
								<div className='landing-button-text'>Enter</div>
							</Link>
						</h1>
					</div>
				) : null}
				<Three isLandingpage={true} />
			</div>
		);
	}

	componentDidMount() {
		{
			setTimeout(() => {
				this.setState({ timer: true });
			}, 1000);
		}
	}
}

export default LandingPage;
