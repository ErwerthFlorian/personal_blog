import React, { Component } from 'react';
import {
	SliderInput,
	SliderTrack,
	SliderRange,
	SliderHandle,
} from '@reach/slider';
import '@reach/slider/styles.css';

import './Style/labyrinth.css';
import ArticleBackground from '../../Core/ArticleBackground/ArticleBackground';

class Labyrinth extends Component {
	constructor(props) {
		super(props);
		this.contentRef = React.createRef();
		this.recursiveBacktracker = this.recursiveBacktracker.bind(this);
		this.getNeighbors = this.getNeighbors.bind(this);
		this.carvePassage = this.carvePassage.bind(this);
		this.cellVisited = this.cellVisited.bind(this);
		window.onresize = this.changeSpacing;
	}

	state = {
		created: false,
		animationSpeed: 3,
		numberOfCells: 10,
		reload: false,
		spacingLeft: 0,
		generating: false,
	};

	backtrackingCells = [];
	visitedCells = [];
	firstCell;

	cols = [];
	render() {
		return (
			<ArticleBackground reference={this.contentRef} id='background'>
				<div className='row pb-3'>
					<div className='col-4-lg col-12-sm'>
						<div className='mb-5 ms-2'>
							<h2 className='pb-2'>Generating a labyrinth</h2>
							<h5>
								<i>Recursive backtracking</i>
							</h5>
						</div>
					</div>
				</div>

				<div className='row pb-3'>
					<div className='col-lg-10 col-md-12'>
						<p>
							The generation with the recursive backtracker algorithm has the
							following steps:
						</p>
						<ol>
							<li>Choose a random cell, this is your current cell.</li>
							<li>
								Choose a random neighbor, which is not visited. Carve a passage
								between the current cell and the neighbor cell. This neighbor is
								your new current cell.
							</li>
							<li>
								If there is no unvisited neighbor, search in the previous cells
								until there is a neighbor that is unvisited.
							</li>
							<li>
								Terminate, if the first cell equals the last previous cell in
								the list.
							</li>
						</ol>
					</div>
					<div className='col'></div>
				</div>

				<ul
					id='maze'
					className=' d-inline-flex justify-content grid-border'
					style={{
						listStyle: 'none',
						padding: 0,
						transform: `translateX(${
							this.state.spacingLeft <= 0
								? window.innerWidth / 2 - this.state.numberOfCells * 34 - 34 / 2
								: this.state.spacingLeft
						}px)`,
						marginRight: 0,
					}}
				>
					{this.cols}
				</ul>

				<div className='row'>
					<div className='col'></div>
					<div className='col-lg-2 col-md-12 d-flex justify-content-center'>
						<button
							className='btn tile-light'
							onClick={() => {
								if (!this.state.generating) {
									this.setState({ generating: true });
									var randomNumber = Math.floor(
										Math.random() *
											this.state.numberOfCells *
											this.state.numberOfCells
									);

									this.firstCell = document.getElementById(randomNumber);
									this.recursiveBacktracker(this.firstCell);
								}
							}}
						>
							Generate Labyrinth
						</button>
					</div>
					<div className='col-lg-2 col-md-12  d-flex justify-content-center'>
						<button
							className='btn tile-light'
							onClick={() => {
								window.location.reload();
							}}
						>
							Repeat
						</button>
					</div>
					<div className='col'></div>
				</div>
				<div className='row py-4'>
					<div className='col'></div>
					<div className='col-lg col-12-md'>
						<p>Animationspeed</p>
						<SliderInput
							value={this.state.animationSpeed}
							min={1}
							max={100}
							step={10}
							onChange={(event) => {
								this.setState({
									animationSpeed: event,
								});
							}}
						>
							<SliderTrack>
								<SliderRange />
								<SliderHandle />
							</SliderTrack>
						</SliderInput>
					</div>
					<div className='col'></div>
				</div>

				<div className='row'>
					<div className='col-4'></div>

					<div className='col-4'></div>
				</div>

				<div className='rounded-10 background-light py-3'>
					<h3 className='d-flex justify-content-center'>Legend</h3>
					<div className='row'>
						<div className='col-lg-3 py-2 text-center'>
							Visited cells{' '}
							<div className='row '>
								<div className='col'></div>
								<div
									className='col-2 grid-border current-legende'
									style={{ width: 38, height: 38 }}
								>
									{this.generateCell(0, 0)}
								</div>
								<div className='col'></div>
							</div>
						</div>
						<div className='col-lg-3 pb-2 text-center'>
							Unvisited neighbors
							<div className='row'>
								<div className='col'></div>
								<div
									className='col-1 grid-border neighbors-legende'
									style={{ width: 38, height: 38 }}
								>
									{this.generateCell(0, 0)}
								</div>
								<div className='col'></div>
							</div>
						</div>
						<div className='col-lg-3 pb-2 text-center '>
							Chosen neighbor
							<div className='row'>
								<div className='col'></div>
								<div
									className='col-1 grid-border neighbor-legende'
									style={{ width: 38, height: 38 }}
								>
									{this.generateCell(0, 0)}
								</div>
								<div className='col'></div>
							</div>
						</div>
						<div className='col-lg-2 text-center '>
							Tracked cell
							<div className='row'>
								<div className='col'></div>
								<div
									className='col-1 grid-border backtracked-legende'
									style={{ width: 38, height: 38 }}
								>
									{this.generateCell(0, 0)}
								</div>
								<div className='col'></div>
							</div>
						</div>
					</div>
				</div>
			</ArticleBackground>
		);
	}

	async cellVisited(cell) {
		cell.classList.add('current');
		if (!cell.classList.contains('visited')) {
			cell.classList.add('visited');
			this.backtrackingCells.push(cell);
		}

		await this.sleep(10 / this.state.animationSpeed);
	}

	async getNeighbors(cell) {
		var cells = [];
		//due to one dim array the neighbors are:
		//left: id - this.numberOfCells, right: id + this.numberOfCells
		//top: id - 1, bottom: id + 1
		for (var y = -1; y < 2; y += 2) {
			let id = parseInt(cell.id);
			let indexY = parseInt(id) + y;
			var possibleNeighbor = document.getElementById(indexY);

			if (possibleNeighbor == null) {
				continue;
			}

			let cellY = parseInt(possibleNeighbor.getAttribute('y'));

			//because we checking the vertical row, the horizontal id has to
			//be the same as the id of the cell
			let cellX = parseInt(possibleNeighbor.getAttribute('x'));

			if (
				cellY < this.state.numberOfCells &&
				cellX === parseInt(cell.getAttribute('x')) &&
				!possibleNeighbor.classList.contains('visited')
			) {
				cells.push(possibleNeighbor);
			}
		}

		for (var x = -1; x < 2; x += 2) {
			let indexX = parseInt(cell.id) + x * this.state.numberOfCells;
			possibleNeighbor = document.getElementById(indexX);

			if (possibleNeighbor === null) {
				continue;
			}

			let cellX = parseInt(possibleNeighbor.getAttribute('x'));

			//because we checking the horizontal row, the vertical id has to
			//be the same as the id of the cell
			let cellY = parseInt(possibleNeighbor.getAttribute('y'));

			if (
				cellX < this.state.numberOfCells &&
				cellY === parseInt(cell.getAttribute('y')) &&
				!possibleNeighbor.classList.contains('visited')
			) {
				cells.push(possibleNeighbor);
			}
		}

		cells.forEach((cell) => {
			cell.classList.add('neighbors');
		});

		await this.sleep(2000 / this.state.animationSpeed);
		return cells;
	}

	async carvePassage(neighbors, cell) {
		var random = Math.floor(Math.random() * neighbors.length);
		var randomNeighbor = neighbors[random];
		randomNeighbor.classList.toggle('neighbor');

		//find out which way the new neighbor is
		if (
			parseInt(randomNeighbor.getAttribute('x')) >
			parseInt(cell.getAttribute('x'))
		) {
			//to the right
			cell.classList.add('carve-right');
		}
		if (
			parseInt(randomNeighbor.getAttribute('x')) <
			parseInt(cell.getAttribute('x'))
		) {
			//to the right
			randomNeighbor.classList.add('carve-right');
		}
		if (
			parseInt(randomNeighbor.getAttribute('y')) >
			parseInt(cell.getAttribute('y'))
		) {
			cell.classList.add('carve-bottom');
			//on top
		}
		if (
			parseInt(randomNeighbor.getAttribute('y')) <
			parseInt(cell.getAttribute('y'))
		) {
			randomNeighbor.classList.add('carve-bottom');
			//below
		}

		randomNeighbor.classList.remove('neighbors');
		randomNeighbor.classList.add('neighbor');

		await this.sleep(2000 / this.state.animationSpeed);
		randomNeighbor.classList.remove('neighbor');
		neighbors.forEach((neighbor) => {
			neighbor.classList.remove('neighbors');
		});
		return randomNeighbor;
	}

	async recursiveBacktracker(cell) {
		await this.cellVisited(cell);
		var neighbors = await this.getNeighbors(cell);
		if (neighbors.length === 0) {
			var poppedCell = this.backtrackingCells.pop();
			await this.backtrackCell(poppedCell);
			var newCell = this.backtrackingCells[this.backtrackingCells.length - 1];
			if (newCell === this.firstCell) {
				await this.backtrackCell(newCell);
				return;
			}
			this.recursiveBacktracker(newCell);
		} else {
			//if there are neighbors that are not visited, carve a passage to a random neighbor

			newCell = await this.carvePassage(neighbors, cell);
			if (newCell === this.firstCell) {
				await this.backtrackCell(newCell);

				return;
			}
			this.recursiveBacktracker(newCell);
		}
	}

	sleep = (milliseconds) => {
		return new Promise((resolved) => setTimeout(resolved, milliseconds));
	};

	generateCell = (x, y) => {
		return (
			<div key={Math.random(100)} className='d-flex justify-content-center'>
				<ul
					key={Math.random(100)}
					id={y + x * this.state.numberOfCells}
					x={x}
					y={y}
					style={{ listStyle: 'none ', padding: 0 }}
				>
					<div
						key={Math.random(100)}
						className='cell-background'
						style={{ width: 30, height: 30, backgroundColor: 'white' }}
					></div>
					<div
						key={Math.random(100)}
						className='bottom-wall'
						style={{ width: 30, height: 4, backgroundColor: 'black' }}
					></div>
				</ul>
				<ul key={Math.random(100)} style={{ listStyle: 'none', padding: 0 }}>
					<div
						key={Math.random(100)}
						className='right-wall'
						style={{ width: 4, height: 30, backgroundColor: 'black' }}
					></div>
					<div
						key={Math.random(100)}
						style={{ width: 4, height: 4, backgroundColor: 'black' }}
					></div>
				</ul>
			</div>
		);
	};

	createGrid = () => {
		this.cols = [];
		if (this.state.created === false) {
			for (var x = 0; x < this.state.numberOfCells; x++) {
				var cells = [];
				for (var y = 0; y < this.state.numberOfCells; y++) {
					cells.push(this.generateCell(x, y));
				}
				this.cols.push(
					<ul key={Math.random(100)} className='p-0'>
						{cells}
					</ul>
				);
			}
			this.setState({ created: true });
		}

		return this.cols;
	};

	async backtrackCell(poppedCell) {
		poppedCell.classList.add('backtracked');
		if (poppedCell.classList.contains('carve-right')) {
			poppedCell.classList.remove('carve-right');
			poppedCell.classList.add('carve-right-visited');
		}
		if (poppedCell.classList.contains('carve-bottom')) {
			poppedCell.classList.remove('carve-bottom');
			poppedCell.classList.add('carve-bottom-visited');
		}
		await this.sleep(2000 / this.state.animationSpeed);
	}
	changeSpacing = () => {
		this.setState({
			spacingLeft:
				this.contentRef.current.offsetWidth / 2 -
				(this.state.numberOfCells * 34) / 2 -
				34,
		});
	};
	componentDidMount() {
		this.createGrid();
		this.changeSpacing();
	}
}

export default Labyrinth;
