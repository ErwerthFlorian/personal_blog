import './Style/bezier-tool.css';
import React, { Component, useState, useEffect } from 'react';
import bezier1 from './Pictures/Bezier1.png';
import bezier2 from './Pictures/Bezier2.png';
import bezier3 from './Pictures/Bezier3.png';
import bezier4 from './Pictures/Bezier4.png';
import beziergif from './Pictures/Bezier.gif';

import {
	OverlayTrigger,
	Popover,
	PopoverTitle,
	PopoverContent,
	Media,
} from 'react-bootstrap';

class BezierTool extends Component {
	constructor(props) {
		super(props);
		this.canvasSVGRef = React.createRef();
		this.lerp = React.createRef();
	}
	state = { text: 'Show Math', ready: false, points: [], lerp: 0 };
	render() {
		return (
			<div className='flip-box'>
				<button
					className='flip-box-button'
					onClick={() => {
						document.getElementById('inner').classList.toggle('rotated');

						setTimeout(() => {
							document.getElementById('front').toggleAttribute('hidden');
							document.getElementById('back').toggleAttribute('hidden');
							document.getElementById('inner').classList.contains('rotated')
								? this.setState({ text: 'Show Tool' })
								: this.setState({ text: 'Explore Math' });
						}, 150);

						document
							.getElementById('btn-text')
							.classList.toggle('rotated-button');
					}}
				>
					<div id='btn-text' className='flip-box-button-text'>
						{this.state.text}
					</div>
				</button>
				<div className='flip-box-inner' id='inner'>
					<div className='flip-box-front' id='front'>
						<div className='flip-box-front-container'>
							<div className='controls'>
								<input
									className='checkbox'
									type='checkbox'
									id='lines'
									onClick={this.updateDrawPoints}
								></input>
								<p className='text'>Show Lines</p>
							</div>
							<div className='canvas' id='canvas'>
								{this.state.ready ? this.drawBezier() : null}

								<svg width='100%' height='100%'>
									<pattern
										id='karo'
										x='0'
										y='0'
										width='10'
										height='10'
										patternUnits='userSpaceOnUse'
									>
										<rect width='10' height='10' fill='lightgrey'></rect>
										<rect width='9' height='9' fill='white'></rect>
									</pattern>

									<rect width='100%' height='100%' fill='url(#karo)'></rect>
								</svg>
							</div>
						</div>
					</div>
					<div className='flip-box-back' id='back' hidden>
						<div className='text'>
							<p style={{ width: '100%' }}>
								<big>How this is generated</big>
							</p>
							<div className='bezier-explain-container'>
								<p>
									Basically: A bezier curve is a collection of lerped values.
								</p>
								<div className='button-gradient'>
									<OverlayTrigger
										trigger='click'
										placement='bottom'
										overlay={
											<Popover
												style={{
													maxWidth: `${this.state.lerp}px`,
													zIndex: '1',
												}}
											>
												<PopoverTitle>Lerping values</PopoverTitle>
												<PopoverContent>
													A lerp is a linear interpolation between two values or
													points. You can calculate a value between value 1 and
													value 2 by usign a parameter t, which has a value
													range from 0 to 1. This creates a sort of mapped value
													of parameter t and interpolation of the values. To get
													the lerped value, we have to use the parameter t on
													both values. The math is{' '}
													<b>lerped = v1 + (v2 - v1) * t.</b> <br />
													Test: middle = 100 + (300-100) * 0.5 = 100 + (200) *
													0.5 = 100 + 100 = 200. That is the middle of these two
													values.
												</PopoverContent>
											</Popover>
										}
									>
										<button
											className='button-gradient-button'
											ref={this.lerp}
											onMouseDown={() => {
												var w = this.lerp.current.offsetWidth;
												this.setState({ lerp: w });
											}}
										>
											What the heck are lerps?
										</button>
									</OverlayTrigger>
								</div>
							</div>
							<p className='text-item'>
								We use the lerps with the value t from P1 to P2, P2 to P3 and P1
								to P3 to create this curves the following way:
							</p>
							<div className='bezier-explain-container'>
								<p className='bezier-explain-item'>
									Lerp from P1 to P2 and from P2 to P3 on the lines L1 and L2
									resulting in the points B1 and B2. B1 and B2 is using the
									value t for the lerp.
								</p>
								<img
									src={bezier2}
									alt='Lerping Stage 1'
									className='bezier-explain-image'
								/>
							</div>
							<div className='bezier-explain-container'>
								<p className='bezier-explain-item'>
									Draw a third line between the points B1 and B2 and introduce a
									new point Q. Q is also using the value t for the lerp on the
									line L3.
								</p>
								<img
									src={bezier3}
									alt='Lerping Stage 2'
									className='bezier-explain-image'
								/>
							</div>
							<div className='bezier-explain-container'>
								<p style={{ marginTop: 'auto', marginBottom: 'auto' }}>
									On any value of t draw the points of Q and connect them to a
									line. Resulting in the bezier curve.
								</p>
								<img
									src={bezier4}
									alt='Lerping Stage 3'
									className='bezier-explain-image'
								/>
							</div>
							<p>
								The example is using 50 values of t to create the bezier curve.
								Watch the animation below to see it in action.
							</p>
							<div className='bezier-explain-container'>
								<img
									src={beziergif}
									alt='Bezier Gif'
									className='bezier-explain-gif'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	calcCurve = (bezierPoints, resolution) => {
		var points = [];

		for (var i = 0; i < bezierPoints.length; i++) {
			points.push(bezierPoints[i]);
		}

		const canvas = document.getElementById('canvas');
		const p0 = document.getElementById('0');
		const p0x = parseFloat(p0.getAttribute('cx')) / canvas.clientWidth;
		const p0y = parseFloat(p0.getAttribute('cy')) / canvas.clientHeight;
		const p1 = document.getElementById('2');
		const p1x = parseFloat(p1.getAttribute('cx')) / canvas.clientWidth;
		const p1y = parseFloat(p1.getAttribute('cy')) / canvas.clientHeight;
		const p2 = document.getElementById('1');
		const p2x = parseFloat(p2.getAttribute('cx')) / canvas.clientWidth;
		const p2y = parseFloat(p2.getAttribute('cy')) / canvas.clientHeight;

		var pathString =
			'M ' + p0x * canvas.clientWidth + ' ' + p0y * canvas.clientHeight;

		if (document.getElementById('lines').checked == true) {
			points.push(
				<line
					x1={p2x * canvas.clientWidth}
					y1={p2y * canvas.clientHeight}
					x2={p1x * canvas.clientWidth}
					y2={p1y * canvas.clientHeight}
					stroke='black'
					strokeWidth='1'
				></line>,
				<line
					x1={p0x * canvas.clientWidth}
					y1={p0y * canvas.clientHeight}
					x2={p1x * canvas.clientWidth}
					y2={p1y * canvas.clientHeight}
					stroke='black'
					strokeWidth='1'
				></line>
			);
		}

		for (
			var t = 1 / parseFloat(resolution);
			t < 1;
			t = t + 1 / parseFloat(resolution)
		) {
			var bezierX =
				Math.pow(1 - t, 2) * p0x + 2 * (1 - t) * t * p1x + t * t * p2x;
			var bezierY =
				Math.pow(1 - t, 2) * p0y + 2 * (1 - t) * t * p1y + t * t * p2y;

			if (document.getElementById('lines').checked == true) {
				points.push(
					<line
						strokeLinecap='round'
						x1={p0x * canvas.clientWidth + (p1x - p0x) * canvas.clientWidth * t}
						y1={
							p0y * canvas.clientHeight + (p1y - p0y) * canvas.clientHeight * t
						}
						x2={p1x * canvas.clientWidth + (p2x - p1x) * canvas.clientWidth * t}
						y2={
							p1y * canvas.clientHeight + (p2y - p1y) * canvas.clientHeight * t
						}
						stroke={'rgb(' + 100 + (1 - t) * 155 + ',50,50)'}
						strokeWidth='1'
					></line>
				);
			}

			pathString +=
				' L ' +
				bezierX * canvas.clientWidth +
				' ' +
				bezierY * canvas.clientHeight;
		}

		pathString +=
			' L ' + p2x * canvas.clientWidth + ' ' + p2y * canvas.clientHeight;
		points.push(
			<path
				d={pathString}
				fill='none'
				strokeWidth='3'
				stroke='black'
				strokeLinecap='round'
			></path>
		);

		this.setState({ points: points });
	};

	drawBezier = () => {
		return (
			<svg
				style={{ position: 'absolute' }}
				width='100%'
				height='100%'
				id='canvas'
			>
				{this.state.points}
			</svg>
		);
	};

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
		this.setState({
			points: [
				<Point
					id='0'
					x={'0.1'}
					y={'0.9'}
					r='12'
					fill='red'
					update={this.updateDrawPoints}
				></Point>,
				<Point
					id='1'
					x={'0.9'}
					y={'0.9'}
					r='12'
					fill='red'
					update={this.updateDrawPoints}
				></Point>,
				<Point
					id='2'
					x={'0.5'}
					y={'0.1'}
					r='12'
					fill='blue'
					update={this.updateDrawPoints}
				></Point>,
				,
			],
		});
		this.setState({ ready: true });
	}
	handleResize = () => {
		this.setState({ ready: false });
	};
	componentDidUpdate() {
		if (this.state.ready && this.state.points.length === 4) {
			this.updateDrawPoints();
		}
		if (!this.state.ready) {
			this.setState({
				points: [
					<Point
						id='0'
						x={'0.1'}
						y={'0.9'}
						r='12'
						fill='red'
						update={this.updateDrawPoints}
					></Point>,
					<Point
						id='1'
						x={'0.9'}
						y={'0.9'}
						r='12'
						fill='red'
						update={this.updateDrawPoints}
					></Point>,
					<Point
						id='2'
						x={'0.5'}
						y={'0.1'}
						r='12'
						fill='blue'
						update={this.updateDrawPoints}
					></Point>,
					,
				],
			});
			this.setState({ ready: true });
		}
	}

	updateDrawPoints = () => {
		var points = this.state.points.splice(0, 4);
		this.calcCurve(points, 50);
	};
}

export default BezierTool;

function Point(props) {
	const canvas = document.getElementById('canvas');
	const [positionX, setPositionX] = useState(props.x * canvas.clientWidth);
	const [positionY, setPositionY] = useState(props.y * canvas.clientHeight);
	const [dragging, setDragging] = useState(false);
	const [fill, setFill] = useState(props.fill);
	const oldFill = props.fill;
	function getMousePosition(e) {
		e = e.touches ? e.touches[0] : e;
		return {
			x: e.offsetX,
			y: e.offsetY,
		};
	}

	function setPosition(pos) {
		if (pos.x > props.r && pos.x < canvas.clientWidth - props.r) {
			setPositionX(pos.x);
		}
		if (pos.y > props.r && pos.y < canvas.clientHeight - props.r)
			setPositionY(pos.y);
	}
	canvas.onpointermove = (e) => {
		if (dragging) {
			props.update();
			setPosition(getMousePosition(e));
		}
	};

	canvas.ontouchmove = (e) => {
		e.preventDefault();
		if (dragging) {
			props.update();
			setPosition(getMousePosition(e));
		}
	};
	canvas.ontouchend = (e) => {
		e.preventDefault();
		if (dragging) {
			document.getElementById('root').style.touchAction = 'auto';
			setDragging(false);
			setFill(dragging ? oldFill : 'black');
		}
	};
	canvas.onmouseup = (e) => {
		if (dragging) {
			setDragging(false);
			setFill(dragging ? oldFill : 'black');
		}
	};
	return (
		<circle
			className='point'
			id={props.id}
			onMouseDown={() => {
				setDragging(true);
				setFill(dragging ? 'grey' : 'black');
			}}
			onTouchStart={(e) => {
				e.preventDefault();
				document.getElementById('root').style.touchAction = 'none';
				setDragging(true);
				setFill(dragging ? 'grey' : 'black');
			}}
			fill={fill ?? 'white'}
			r={props.r + 'px'}
			cx={positionX + 'px'}
			cy={positionY + 'px'}
		></circle>
	);
}
