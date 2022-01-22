import { getDefaultNormalizer } from '@testing-library/dom';
import { Component, useState } from 'react';
import { alignPropType } from 'react-bootstrap/esm/DropdownMenu';
import { propTypes } from 'react-bootstrap/esm/Image';
import './Style/Boids.css';
import unfilled from './Pictures/settings_unfilled.svg';
import findNeighbors from './Gifs/FindNeighbors.gif';
import filled from './Pictures/settings_filled.svg';
import left from './Pictures/left.svg';
import right from './Pictures/right.svg';

class Boids extends Component {
	state = {
		numBoids: 75,
		boids: [],
		tutorialBoids: [],
		boidsReact: [],
		perceptionRadius: 100,
		avoidenceRadius: 50,
		drawPerceptionRadius: false,
		drawAvoidenceRadius: false,
		shouldSimulate: false,
		shouldSimulateTut: false,
		isSimulating: false,
		isSimulatingTutorial: false,
		slides: [findNeighbors, filled, unfilled, filled],
		slideIndex: 0,
		cohesion: true,
		alignment: true,
		avoidence: true,
		r: 5,
	};

	componentDidMount() {
		this.spawnBoids();
	}

	componentDidUpdate() {
		if (this.state.shouldSimulate) {
			if (!this.state.isSimulating) {
				this.simulate();
			}
		}
		if (this.state.shouldSimulateTut) {
			if (!this.state.isSimulatingTutorial) {
				this.tutorialSimulate();
			}
		}
	}

	render() {
		return (
			<div className='boids-container'>
				<div className='start' onClick={this.handleSimulateClick}>
					{this.state.shouldSimulate ? 'Pause Simulation' : 'Start Simulation'}
				</div>
				<div className='settings-toggle-button' onClick={this.handleToggle}>
					<img
						src={unfilled}
						id='btn'
						width='100%'
						height='100%'
						className=' btn-rotate-back'
					></img>
				</div>
				<svg className='canvas' id='canvas'>
					{this.state.boidsReact}
				</svg>

				<div className='settings-container closing' id='settings'>
					<div className='settings-slider-container'>
						<p className='settings-slider-caption'>
							{'Number of boids spawned: ' + this.state.numBoids}
						</p>
						<input
							className='settings-slider'
							type='range'
							min='1'
							max='250'
							value={this.state.numBoids}
							onChange={this.hangleNumBoidsChange}
						></input>
					</div>

					<div className='settings-slider-container'>
						<p className='settings-slider-caption'>{'Size: ' + this.state.r}</p>
						<input
							className='settings-slider'
							type='range'
							min='1'
							max='10'
							value={this.state.r}
							onChange={this.handleSizeChange}
						></input>
					</div>

					<div className='settings-slider-container'>
						<p className='settings-slider-caption'>
							{'Perception: ' + this.state.perceptionRadius}
						</p>
						<input
							className='settings-slider'
							type='range'
							min={this.state.r * 4}
							max='500'
							value={this.state.perceptionRadius}
							onChange={this.handlePerceptionRadiusChange}
						></input>
					</div>

					<div className='settings-slider-container'>
						<p className='settings-slider-caption'>
							{'Avoidence: ' + this.state.avoidenceRadius}
						</p>
						<input
							className='settings-slider'
							type='range'
							min='1'
							max={this.state.perceptionRadius}
							value={this.state.avoidenceRadius}
							onChange={this.handleAvoidenceRadiusChange}
						></input>
					</div>

					<div className='settings-toggle-container'>
						<div className='button-group'>
							<input
								className='settings-toggle'
								type='checkbox'
								checked={this.state.drawPerceptionRadius}
								onClick={this.handlePerceptionRadiusDrawToggle}
							></input>
							<div className='settings-toggle-caption'>
								Show perception radius
							</div>
						</div>
						<div className='button-group'>
							<input
								className='settings-toggle'
								type='checkbox'
								checked={this.state.drawAvoidenceRadius}
								onClick={this.handleAvoidenceRadiusDrawToggle}
							></input>
							<div className='settings-toggle-caption'>
								Show avoidence radius
							</div>
						</div>
					</div>
					<div className='settings-toggle-container'>
						<div className='button-group'>
							<input
								className='settings-toggle'
								type='checkbox'
								checked={this.state.avoidence}
								onClick={this.handleAvoidenceToggle}
							></input>
							<div className='settings-toggle-caption'>
								Include avoidence rule
							</div>
						</div>
						<div className='button-group'>
							<input
								className='settings-toggle'
								type='checkbox'
								checked={this.state.cohesion}
								onClick={this.handleCohesionToggle}
							></input>
							<div className='settings-toggle-caption'>
								Include cohesion rule
							</div>
						</div>
						<div className='button-group'>
							<input
								className='settings-toggle'
								type='checkbox'
								checked={this.state.alignment}
								onClick={this.handleAlignmentToggle}
							></input>
							<div className='settings-toggle-caption'>
								Include alignment rule
							</div>
						</div>
					</div>
					<div className='button-tutorial' onClick={this.toggleTutorial}>
						Show me how its done!
					</div>
				</div>

				<div className='tutorial-container close-tutorial' id='tutorial'>
					<div className='tutorial-text'>{this.getCorrectTutorialStep()}</div>
					<div className='tutorial'>
						<div className='left-container' onClick={this.handleSliderLeft}>
							<img src={left} className='left' />
						</div>
						<div className='slider'>
							<svg width='100%' height='100%' id='tutorial-canvas'>
								{this.state.tutorialBoidsReact}
							</svg>
						</div>
						<div className='right-container' onClick={this.handleSliderRight}>
							<img src={right} className='right' />
						</div>
					</div>
					<div className='button-tutorial-close' onClick={this.toggleTutorial}>
						Close Tutorial
					</div>
				</div>
			</div>
		);
	}

	handleAlignmentToggle = (e) => {
		this.setState({ alignment: e.target.checked });
	};
	handleCohesionToggle = (e) => {
		this.setState({ cohesion: e.target.checked });
	};
	handleAvoidenceToggle = (e) => {
		this.setState({ avoidence: e.target.checked });
	};

	handleSliderLeft = () => {
		var slideIndex = parseInt(this.state.slideIndex);
		this.setState({
			slideIndex: slideIndex - 1 < 0 ? 4 : slideIndex - 1,
		});
	};

	handleSliderRight = () => {
		var slideIndex = parseInt(this.state.slideIndex);

		this.setState({
			slideIndex: slideIndex + 1 > 4 ? 0 : slideIndex + 1,
		});
	};

	handleToggle = () => {
		document.getElementById('settings').classList.toggle('closing');
		document.getElementById('settings').classList.toggle('opening');
		document.getElementById('btn').classList.toggle('btn-rotate');
		document.getElementById('btn').classList.toggle('btn-rotate-back');
	};

	hangleNumBoidsChange = (e) => {
		this.setState({ numBoids: e.target.value });
		this.spawnBoids();
	};

	toggleTutorial = () => {
		document.getElementById('tutorial').classList.toggle('close-tutorial');
		document.getElementById('tutorial').classList.toggle('open-tutorial');

		this.setState({
			shouldSimulateTut: !this.state.shouldSimulateTut,
			shouldSimulate: false,
		});

		if (this.state.tutorialBoids.length == 0) {
			this.spawnTutorialBoids();
		}
	};

	handleAvoidenceRadiusChange = (e) => {
		if ('ontouchstart' in document.documentElement) {
			e.preventDefault();
		}

		this.setState({ avoidenceRadius: parseInt(e.target.value) });
		if (this.state.boids.length > 0 && this.state.drawAvoidenceRadius) {
			this.updateAvoidenceRadius(parseInt(e.target.value));
		}
	};

	handlePerceptionRadiusChange = (e) => {
		var check = parseInt(e.target.value) < this.state.avoidenceRadius;
		var avoidenceRadius = check
			? parseInt(e.target.value)
			: this.state.avoidenceRadius;
		if (check) {
			this.setState({
				perceptionRadius: parseInt(e.target.value),
				avoidenceRadius: avoidenceRadius,
			});
		} else {
			this.setState({ perceptionRadius: parseInt(e.target.value) });
		}
		if (this.state.boids.length > 0 && this.state.drawPerceptionRadius) {
			this.updatePerceptionRadius(parseInt(e.target.value), avoidenceRadius);
		}
	};

	handleSizeChange = (e) => {
		this.setState({ r: parseInt(e.target.value) });
		if (this.state.boids.length > 0) {
			this.updateBoidSize(parseInt(e.target.value));
		}
	};

	handlePerceptionRadiusDrawToggle = (e) => {
		this.setState({ drawPerceptionRadius: e.target.checked });
		if (this.state.boids.length > 0) {
			this.updateBoidsPerception(e.target.checked);
		}
	};

	handleAvoidenceRadiusDrawToggle = (e) => {
		this.setState({ drawAvoidenceRadius: e.target.checked });
		if (this.state.boids.length > 0) {
			this.updateBoidsAvoidence(e.target.checked);
		}
	};

	updateBoidSize = (size) => {
		this.state.boids.forEach((boid) => {
			boid.update(
				boid.pos,
				boid.vel,
				size,
				false,
				false,
				this.state.drawPerceptionRadius,
				this.state.perceptionRadius,
				this.state.drawAvoidenceRadius,
				this.state.avoidenceRadius
			);
		});
		this.setState({ boidsReact: [...this.gatherBoids()] });
	};

	updatePerceptionRadius = (perceptionRadius, avoidenceRadius) => {
		this.state.boids.forEach((boid) => {
			boid.update(
				boid.pos,
				boid.vel,
				boid.r,
				false,
				false,
				true,
				perceptionRadius,
				this.state.drawAvoidenceRadius,
				avoidenceRadius
			);
		});
		this.setState({ boidsReact: [...this.gatherBoids()] });
	};

	updateAvoidenceRadius = (avoidenceRadius) => {
		this.state.boids.forEach((boid) => {
			boid.update(
				boid.pos,
				boid.vel,
				boid.r,
				boid.inGroup,
				boid.inAvoidence,
				this.state.drawPerceptionRadius,
				this.state.perceptionRadius,
				true,
				avoidenceRadius
			);
		});
		this.setState({ boidsReact: [...this.gatherBoids()] });
	};

	updateBoidsPerception = (drawPerception) => {
		this.state.boids.forEach((boid) => {
			boid.update(
				boid.pos,
				boid.vel,
				boid.r,
				boid.inGroup,
				boid.inAvoidence,
				drawPerception,
				this.state.perceptionRadius,
				this.state.drawAvoidenceRadius,
				this.state.avoidenceRadius
			);
		});
		this.setState({ boidsReact: [...this.gatherBoids()] });
	};

	updateBoidsAvoidence = (drawAvoidence) => {
		this.state.boids.forEach((boid) => {
			boid.update(
				boid.pos,
				boid.vel,
				boid.r,
				boid.inGroup,
				boid.inAvoidence,
				this.state.drawPerceptionRadius,
				this.state.perceptionRadius,
				drawAvoidence,
				this.state.avoidenceRadius
			);
		});
		this.setState({ boidsReact: [...this.gatherBoids()] });
	};

	spawnBoids = () => {
		var canvas = document.getElementById('canvas');
		var boids = [];
		var boidsReact = [];
		for (var i = 0; i < this.state.numBoids; i++) {
			var pos = {
				x: Math.random() * canvas.clientWidth - this.state.perceptionRadius / 2,
				y:
					Math.random() * canvas.clientHeight - this.state.perceptionRadius / 2,
			};

			var vel = { x: -5 + Math.random() * 10, y: -5 + Math.random() * 10 };
			var boid = new Boid(
				pos,
				vel,
				this.state.r,
				this.state.perceptionRadius,
				this.state.drawPerceptionRadius,
				this.state.avoidenceRadius,
				this.state.drawAvoidenceRadius
			);
			boidsReact.push(boid.returnElement());
			boids.push(boid);
		}
		this.setState({ boids: boids, boidsReact: boidsReact });
	};

	spawnTutorialBoids = () => {
		var canvas = document.getElementById('tutorial-canvas');
		var boids = [];
		var boidsReact = [];
		for (var i = 0; i < 15; i++) {
			var pos = {
				x: Math.random() * canvas.clientWidth - this.state.perceptionRadius / 2,
				y:
					Math.random() * canvas.clientHeight - this.state.perceptionRadius / 2,
			};

			var vel = { x: -5 + Math.random() * 10, y: -5 + Math.random() * 10 };
			var boid = new Boid(pos, vel, 3, 40, true, 20, true);
			boidsReact.push(boid.returnElement());
			boids.push(boid);
		}
		this.setState({ tutorialBoids: boids, tutorialBoidsReact: boidsReact });
		this.tutorialSimulate();
	};

	handleSimulateClick = async () => {
		this.simulating = true;

		this.setState({ shouldSimulate: !this.state.shouldSimulate });
	};
	getCorrectTutorialStep = () => {
		switch (this.state.slideIndex) {
			case 0:
				return 'Find neighbors nearby.';

			case 1:
				return '1. Avoid crashing into other boids.';
			case 2:
				return '2. Align to the direction of other boids.';
			case 3:
				return '3. Steer towards the center of the group.';
			case 4:
				return 'Combine all the steps to get this behavior.';
		}
	};
	tutorialSimulate = async () => {
		var canvas = document.getElementById('tutorial-canvas');
		this.setState({ isSimulatingTutorial: true });
		while (this.state.shouldSimulateTut) {
			for (var j = 0; j < this.state.tutorialBoids.length; j++) {
				var curBoid = this.state.tutorialBoids[j];
				var pos = curBoid.pos;
				var vel = curBoid.vel;

				var group = this.getTutorialGroup(curBoid);
				var avoidenceGroup = [];

				if (group.length > 0 && this.state.slideIndex >= 1) {
					avoidenceGroup = this.getTutorialAvoidenceGroup(curBoid, group);
				}

				var acceleration = { x: 0, y: 0 };

				if (group.length > 0) {
					if (this.state.slideIndex >= 2) {
						var align = this.align(vel, group);
						acceleration.x += align.x;
						acceleration.y += align.y;
					}

					if (this.state.slideIndex >= 3) {
						var cohesion = this.cohesion(pos, vel, group);
						acceleration.x += cohesion.x;
						acceleration.y += cohesion.y;
					}

					if (avoidenceGroup.length > 0) {
						var avoid = this.avoid(pos, vel, avoidenceGroup);
						acceleration.x += avoid.x;
						acceleration.y += avoid.y;
					}
				}

				vel.x += acceleration.x;
				vel.y += acceleration.y;

				vel = this.limit(vel, 0.5);

				pos.x += vel.x;
				pos.y += vel.y;

				if (
					curBoid.pos.x >
					canvas.clientWidth - this.state.perceptionRadius / 2
				) {
					pos.x = -this.state.perceptionRadius / 2;
				}
				if (curBoid.pos.x < -this.state.perceptionRadius / 2) {
					pos.x = canvas.clientWidth - this.state.perceptionRadius / 2;
				}
				if (curBoid.pos.y < -this.state.perceptionRadius / 2) {
					pos.y = canvas.clientHeight - this.state.perceptionRadius / 2;
				}

				if (
					curBoid.pos.y >
					canvas.clientHeight - this.state.perceptionRadius / 2
				) {
					pos.y = -this.state.perceptionRadius / 2;
				}

				curBoid.update(
					pos,
					vel,
					10,
					group.length > 0,
					avoidenceGroup.length > 0 && this.state.slideIndex >= 1,
					this.state.slideIndex >= 0,
					125,
					this.state.slideIndex >= 1,
					40
				);
			}

			this.setState({ tutorialBoidsReact: [...this.gatherTutorialBoids()] });
			await this.sleep(1);
		}
		this.setState({ isSimulatingTutorial: false });
	};
	simulate = async () => {
		this.setState({ isSimulating: true });
		var canvas = document.getElementById('canvas');
		while (this.state.shouldSimulate) {
			for (var j = 0; j < this.state.boids.length; j++) {
				var curBoid = this.state.boids[j];
				var pos = curBoid.pos;
				var vel = curBoid.vel;
				var group = this.getGroup(curBoid);
				var avoidenceGroup = [];

				if (group.length > 0 && this.state.avoidence) {
					avoidenceGroup = this.getAvoidenceGroup(curBoid, group);
				}
				var acceleration = { x: 0, y: 0 };

				if (group.length > 0) {
					if (this.state.alignment) {
						var align = this.align(vel, group);
						acceleration.x += align.x;
						acceleration.y += align.y;
					}
					if (this.state.cohesion) {
						var cohesion = this.cohesion(pos, vel, group);
						acceleration.x += cohesion.x;
						acceleration.y += cohesion.y;
					}

					if (avoidenceGroup.length > 0) {
						var avoid = this.avoid(pos, vel, avoidenceGroup);
						acceleration.x += avoid.x;
						acceleration.y += avoid.y;
					}
				}

				vel.x += acceleration.x;
				vel.y += acceleration.y;

				vel = this.limit(vel, 1);

				pos.x += vel.x;
				pos.y += vel.y;

				if (
					curBoid.pos.x >
					canvas.clientWidth - this.state.perceptionRadius / 2
				) {
					pos.x = -this.state.perceptionRadius / 2;
				}
				if (curBoid.pos.x < -this.state.perceptionRadius / 2) {
					pos.x = canvas.clientWidth - this.state.perceptionRadius / 2;
				}
				if (curBoid.pos.y < -this.state.perceptionRadius / 2) {
					pos.y = canvas.clientHeight - this.state.perceptionRadius / 2;
				}

				if (
					curBoid.pos.y >
					canvas.clientHeight - this.state.perceptionRadius / 2
				) {
					pos.y = -this.state.perceptionRadius / 2;
				}

				curBoid.update(
					pos,
					vel,
					this.state.r,
					group.length > 0,
					avoidenceGroup.length > 0,
					this.state.drawPerceptionRadius,
					this.state.perceptionRadius,
					this.state.drawAvoidenceRadius,
					this.state.avoidenceRadius
				);
			}

			this.setState({ boidsReact: [...this.gatherBoids()] });
			await this.sleep(1);
		}
		this.setState({ isSimulating: false });
	};

	gatherBoids = () => {
		var gatheredElements = [];
		this.state.boids.forEach((boid) => {
			gatheredElements.push(boid.returnElement());
		});
		return gatheredElements;
	};
	gatherTutorialBoids = () => {
		var gatheredElements = [];
		this.state.tutorialBoids.forEach((boid) => {
			gatheredElements.push(boid.returnElement());
		});
		return gatheredElements;
	};

	subtract = (v1, v2) => {
		var res = { x: 0, y: 0 };

		res.x = v1.x - v2.x;
		res.y = v1.y - v2.y;

		return res;
	};

	getGroup = (currentBoid) => {
		var group = [];
		for (var i = 0; i < this.state.boids.length; i++) {
			var other = this.state.boids[i];
			if (currentBoid != other) {
				if (
					this.distance(
						currentBoid.getCalculatedPos(),
						other.getCalculatedPos()
					) < this.state.perceptionRadius
				) {
					group.push(other);
				}
			}
		}
		return group;
	};

	getTutorialGroup = (currentBoid) => {
		var group = [];
		for (var i = 0; i < this.state.tutorialBoids.length; i++) {
			var other = this.state.tutorialBoids[i];
			if (currentBoid != other) {
				if (
					this.distance(
						currentBoid.getCalculatedPos(),
						other.getCalculatedPos()
					) < 125
				) {
					group.push(other);
				}
			}
		}
		return group;
	};

	getAvoidenceGroup = (currentBoid, group) => {
		var avoidenceGroup = [];
		for (var i = 0; i < group.length; i++) {
			var other = group[i];
			if (currentBoid != other) {
				if (
					this.distance(
						currentBoid.getCalculatedPos(),
						other.getCalculatedPos()
					) < this.state.avoidenceRadius
				) {
					avoidenceGroup.push(other);
				}
			}
		}
		return avoidenceGroup;
	};
	getTutorialAvoidenceGroup = (currentBoid, group) => {
		var avoidenceGroup = [];
		for (var i = 0; i < group.length; i++) {
			var other = group[i];
			if (currentBoid != other) {
				if (
					this.distance(
						currentBoid.getCalculatedPos(),
						other.getCalculatedPos()
					) < 40
				) {
					avoidenceGroup.push(other);
				}
			}
		}
		return avoidenceGroup;
	};

	align = (velocity, group) => {
		var force = { x: 0, y: 0 };

		group.forEach((boid) => {
			force.x += boid.vel.x;
			force.y += boid.vel.y;
		});

		force.x /= group.length;
		force.y /= group.length;

		force = this.setMagnitude(force, 2);
		var steering = this.subtract(force, velocity);
		steering = this.limit(steering, 0.01);

		return steering;
	};

	cohesion = (position, velocity, group) => {
		var force = { x: 0, y: 0 };

		group.forEach((boid) => {
			force.x += boid.pos.x;
			force.y += boid.pos.y;
		});

		force.x /= group.length;
		force.y /= group.length;

		var steering = this.subtract(force, position);
		steering = this.setMagnitude(steering, 2);
		steering = this.subtract(steering, velocity);
		steering = this.limit(steering, 0.01);

		return steering;
	};

	avoid = (position, velocity, avoidGroup) => {
		var force = { x: 0, y: 0 };

		avoidGroup.forEach((boid) => {
			force.x +=
				((position.x - boid.pos.x) * 1) /
				Math.pow(this.distance(position, boid.pos), 3);
			force.y +=
				((position.y - boid.pos.y) * 1) /
				Math.pow(this.distance(position, boid.pos), 3);
		});

		force.x /= avoidGroup.length;
		force.y /= avoidGroup.length;
		force = this.setMagnitude(force, 2);
		var steering = this.subtract(force, velocity);
		steering = this.limit(steering, 0.015);

		return steering;
	};

	distance = (pos1, pos2) => {
		var dist = Math.sqrt(
			Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2)
		);
		return dist;
	};

	limit = (vector, maxLength) => {
		var vec = { x: vector.x, y: vector.y };
		if (this.length(vec.x, vec.y) > maxLength) {
			vec.x /= this.length(vec.x, vec.y);
			vec.y /= this.length(vec.x, vec.y);
			vec.x *= maxLength;
			vec.y *= maxLength;
		}

		return vec;
	};

	setMagnitude = (vector, magnitude) => {
		var vec = { x: 0, y: 0 };
		var dir = Math.atan2(vector.y, vector.x);
		vec.x = Math.cos(dir) * magnitude;
		vec.y = Math.sin(dir) * magnitude;

		return vec;
	};

	length = (x, y) => {
		return Math.sqrt(x * x + y * y);
	};

	sleep = (milliseconds) => {
		return new Promise((resolved) => setTimeout(resolved, milliseconds));
	};
}

export default Boids;

const BoidReact = (props) => {
	return (
		<svg
			x={props.pos.x - props.perceptionRadius / 2}
			y={props.pos.y - props.perceptionRadius / 2}
			width={props.perceptionRadius * 2}
			height={props.perceptionRadius * 2}
			fill='transparent'
		>
			<polygon
				transform={`rotate(${
					90 + Math.atan2(props.vel.y, props.vel.x) * (180 / Math.PI)
				} , ${props.perceptionRadius}, ${props.perceptionRadius})`}
				points={`${-props.r + props.perceptionRadius},${
					props.r * 1.5 + props.perceptionRadius
				},${props.perceptionRadius},${-props.r + props.perceptionRadius},${
					props.r + props.perceptionRadius
				},${props.r * 1.5 + props.perceptionRadius}`}
				stroke='black'
				fill={props.avoidence ? 'red' : props.group ? 'green' : 'white'}
			/>

			{props.drawPerceptionRadius ? (
				<circle
					cx={props.perceptionRadius}
					cy={props.perceptionRadius}
					r={props.perceptionRadius}
					fill='transparent'
					strokeWidth='1'
					stroke='black'
				></circle>
			) : null}
			{props.drawAvoidenceRadius ? (
				<circle
					cx={props.perceptionRadius}
					cy={props.perceptionRadius}
					r={props.avoidenceRadius}
					fill='transparent'
					strokeWidth='1'
					stroke='red'
				></circle>
			) : null}
		</svg>
	);
};

class Boid {
	constructor(
		pos,
		vel,
		r,
		perceptionRadius,
		drawPerceptionRadius,
		avoidenceRadius,
		drawAvoidenceRadius
	) {
		this.pos = pos;
		this.vel = vel;
		this.r = r;
		this.drawPerceptionRadius = drawPerceptionRadius;
		this.perceptionRadius = perceptionRadius;
		this.avoidenceRadius = avoidenceRadius;
		this.drawPerceptionRadius = drawAvoidenceRadius;
		this.boid = (
			<BoidReact
				pos={pos}
				vel={vel}
				r={r}
				drawPerceptionRadius={this.drawPerceptionRadius}
				perceptionRadius={this.perceptionRadius}
				drawAvoidenceRadius={this.drawAvoidenceRadius}
				avoidenceRadius={this.avoidenceRadius}
			/>
		);
	}

	update(
		pos,
		vel,
		r,
		inGroup,
		inAvoidence,
		drawPerceptionRadius,
		perceptionRadius,
		drawAvoidenceRadius,
		avoidenceRadius
	) {
		this.boid = (
			<BoidReact
				pos={pos}
				vel={vel}
				r={r}
				group={inGroup}
				avoidence={inAvoidence}
				perceptionRadius={perceptionRadius}
				drawPerceptionRadius={drawPerceptionRadius}
				avoidenceRadius={avoidenceRadius}
				drawAvoidenceRadius={drawAvoidenceRadius}
			/>
		);
	}

	getCalculatedPos() {
		var calculatedPos = { x: this.pos.x, y: this.pos.y };
		calculatedPos.x += this.perceptionRadius / 2;
		calculatedPos.y += this.perceptionRadius / 2;
		return calculatedPos;
	}

	returnElement() {
		return this.boid;
	}
}
