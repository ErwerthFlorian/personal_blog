import React, { Component } from 'react';
import './Style/header.css';
import { Link } from 'react-router-dom';
import '../../../node_modules/jquery/dist/jquery.slim';
import Collapse from 'react-bootstrap/esm/Collapse';
import HeaderButton from './HeaderButton/HeaderButton';
import HeaderDropdown from './HeaderDropdown/HeaderDropdown';

class Header extends Component {
	constructor(props) {
		super(props);
		this.dropdownContentRef = React.createRef();
	}
	state = { open: false };
	render() {
		return (
			<div className='container-fluid sticky-top header-background p-0'>
				<nav className='navbar navbar-expand-lg navbar-dark py-0'>
					<button
						className='navbar-toggler m-1'
						onClick={() => {
							this.setState({ open: !this.state.open });
						}}
					>
						{this.handleToggle()}
					</button>
					<Link className='float-right px-4 brand' to='/Home'>
						<div
							onClick={() => {
								this.setState({ open: false });
							}}
							className='brand-text'
						>
							Florian Erwerth.
						</div>
					</Link>
					<Collapse in={this.state.open} className='navbar-collapse' id='nav'>
						<ul className='navbar-nav'>
							<HeaderDropdown
								name='Tools'
								items={[
									['Labyrinth', 'Labyrinth'],
									['Bezier Curve', 'BezierTool'],
									['Boids', 'Boids'],
								]}
								reference={this.dropdownContentRef}
								onClick={() => {
									if (window.innerWidth <= 992) {
										this.setState({ open: false });
									}
								}}
							/>
							<HeaderButton
								name='About'
								to='/AboutMe'
								onClick={() => {
									if (window.innerWidth <= 992) {
										this.setState({ open: false });
									}
								}}
							/>
							<HeaderButton
								name='Contact'
								to='/Contact'
								onClick={() => {
									if (window.innerWidth <= 992) {
										this.setState({ open: false });
									}
								}}
							/>
							<HeaderButton
								name='Chat'
								to='/Chatroom'
								onClick={() => {
									if (window.innerWidth <= 992) {
										this.setState({ open: false });
									}
								}}
							/>
						</ul>
					</Collapse>
				</nav>
				<div className='m-0 p-0 color-seperator'></div>
			</div>
		);
	}

	handleToggle = () => {
		return this.state.open ? (
			<svg type='button image/svg+xml' className='close' disabled></svg>
		) : (
			<span className='navbar-toggler-icon'></span>
		);
	};
}

export default Header;
