import React, { Component } from 'react';
import './Style/official-tutorial.css';
import { Link } from 'react-router-dom';
import { CodeBlock, dracula } from 'react-code-blocks';
import InitialState from './Pictures/InitialStateOfTutorial.png';
import Step1 from './Pictures/step1.png';
import Lines from './Pictures/lines.png';

import {
	OverlayTrigger,
	Popover,
	PopoverTitle,
	PopoverContent,
} from 'react-bootstrap';
import ArticleBackground from '../../../Core/ArticleBackground/ArticleBackground';

class OfficialReactTutorial extends Component {
	state = { width: 0 };
	constructor(props) {
		super(props);
		this.textRef = React.createRef();
		this.buttonRef = React.createRef();
	}
	render() {
		return (
			<ArticleBackground>
				<h3>Das offizielle Tutorial.</h3>
				<div className='row'>
					<div className='col'></div>
					<div className='col-lg-4 d-flex justify-content-center'>
						<img src={InitialState} alt='Blank tic-tac-toe field' />
					</div>
					<div className='col'></div>
				</div>
				<p>
					This is the start of the official react tutorial to learn the basics.
					It is accessible at{' '}
					<a
						style={{ color: 'black' }}
						target='_blank'
						href='https://reactjs.org/tutorial/tutorial.html#setup-for-the-tutorial'
					>
						this page.
					</a>{' '}
				</p>
				<p>
					The idea is, that you learn the concept of react while creating a
					tic-tac-toe game. The starting point can be copied from the link
					above.
				</p>
				<h3>Props</h3>
				<p>
					The tutorial is starting with the components.
					<br />
					To be more precise: the properties of the components.
				</p>
				<div className='row'>
					<div className='col'></div>
					<div className='col-lg-6 col-sm-12 d-lg-flex justify-content-center'>
						<div className='gradient mb-3 w-100'>
							<Link to='HelloReact' className='button'>
								Look what components are in the first place.
							</Link>
						</div>
					</div>
					<div className='col'></div>
				</div>
				<p>
					The properties can share values from a parent component to a child
					component. In this case we share the numbers 1-9 from the board to a
					square.
				</p>
				<CodeBlock
					theme={dracula}
					language='jsx'
					text={`<Square value={i} />`}
				/>
				<p className='pt-3'>Now we have to display this value.</p>
				<CodeBlock
					theme={dracula}
					language='jsx'
					text={`class Square extends React.Component {
	render() {
		return <button className='square'>{this.props.value}</button>;
	}
}`}
				/>
				<p className='pt-3'>
					The entry "this.props.value" says that the square should use the
					propery with the name value and display it in the middle of the
					square. This leaves us with the following:
				</p>
				<div className='row'>
					<div className='col'></div>
					<div className='col-lg-4 d-flex justify-content-center'>
						<img src={Step1} alt='Blank tic-tac-toe field' />
					</div>
					<div className='col'></div>
				</div>
				<p>This way we use the tree structure of react to our advantage.</p>
				<p className='pt-3'>
					Of course this game does not only consist of squares filled with a X.
					There is another player with a O as mark. We have to think about a way
					to tell the square player is playing.
				</p>
				<p>
					For that we keep track of the state of a square not in the square
					itself, but with the board and tell which fill the square has by using
					props.
				</p>
				<p>
					We initialize a container with the states of the squares und pass it
					to the squares.
				</p>
				<CodeBlock
					theme={dracula}
					language='jsx'
					text={`class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { squares: Array(9).fill(null) };
  }
  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={this.handleClick(i)}/>;
  }
}`}
				/>
				<p className='pt-3'>
					Now we use another capability of the props. We share the click events
					of a square with the board. We achieve that by subscribing to the
					onClick event of the child to its own property "onClick" which is the
					onClick event of the board.
				</p>
				<CodeBlock
					theme={dracula}
					language='jsx'
					text={`class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}`}
				/>
				<p className='pt-3'>
					You could use any name for this property, but there is a convention in
					react that for a event you use on[Event] and for handling you use
					handle[Event].
				</p>
				<p>
					Now we insert the handleClick() as method. The method copies the
					container, inserts a value and updates it again.
				</p>
				<div className='row'>
					<div className='col-lg-6'>
						<div className='gradient w-100'>
							<OverlayTrigger
								trigger='click'
								placement='top'
								className='button'
								overlay={
									<Popover
										style={{
											maxWidth: `${this.state.width}px`,
											zIndex: '1',
										}}
									>
										<PopoverTitle>Immutability is important:</PopoverTitle>
										<PopoverContent>
											<p>
												The previous state of a programm can't be saved with any
												other way.
											</p>
											<p>
												The comparability of data can be secured that way. Das
											</p>
											<p>
												The pure components basis is the comparability. Pure
												components boost the performance of your web page by
												only updating it, if there is a update indeed. And in
												addition only the part of the component that has to be
												updated will be updated.
											</p>
											<p>
												The comparability is very important with pure components
												because they do not detect any changes like other,
												normal compontents.
											</p>
										</PopoverContent>
									</Popover>
								}
							>
								<button
									ref={this.buttonRef}
									className='button w-100'
									onClick={() => {
										var w = this.buttonRef.current.offsetWidth;
										this.setState({ width: w });
									}}
								>
									Why immutability is important.
								</button>
							</OverlayTrigger>
						</div>
					</div>

					<b className='pt-2'>Take turns.</b>
					<p>
						We initialize a bool to track the current state of the player. Since
						there are only two players a bool is convenient.
					</p>
				</div>
				<CodeBlock
					theme={dracula}
					language='jsx'
					text={`class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsPlaying: true,
    };
  }`}
				/>
				<p className='pt-3'>
					Every time the board or the square is clicked this value inverts.
				</p>
				<CodeBlock
					theme={dracula}
					language='jsx'
					text={` handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsPlaying ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsPlaying: !this.state.xIsPlaying,
    });
  }`}
				/>
				<p className='pt-3'>
					The term <i>this.state.xIsPlaying ? 'X' : 'O'</i> is a shortcut for an
					if-else statement. Now everybody can play.
				</p>
				<b>Checking the winner.</b>
				<p>
					You play to win games. Therefore the last step is to checking for the
					winning player.
				</p>
				<p>
					At first we have to think about how you win a tic tac toe game. A
					player wins, if a row is showing the equal signs. This can be a
					horizontal, vertical or a diagonal row. Now we define those rows with
					containers.
				</p>
				<div className='row'>
					<div className='col-lg-4 col-sm-12'>
						<CodeBlock
							theme={dracula}
							language='jsx'
							text={`const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];`}
						></CodeBlock>
					</div>
					<div className='col'>
						<div className='row pe-2'>
							<div className='col-lg-4 col-md-12 w-lg-50 d-flex justify-content-center'>
								<img src={Lines} alt='Blank tic-tac-toe field' />
							</div>
							<div className='col-lg-4 col-md-12 w-lg-50  pt-2'>
								<p>
									The first the containers are the{' '}
									<div
										className='rounded-10'
										style={{
											backgroundColor: 'green',
											textAlign: 'center',
											color: 'white',
										}}
									>
										horizontal rows
									</div>
									The second containers are the{' '}
									<div
										className='rounded-10'
										style={{
											backgroundColor: 'blue',
											textAlign: 'center',
											color: 'white',
										}}
									>
										vertical rows
									</div>
									And the last three containers are the{' '}
									<div
										className='rounded-10'
										style={{
											backgroundColor: 'purple',
											textAlign: 'center',
											color: 'white',
										}}
									>
										diagonal rows
									</div>
								</p>
							</div>
						</div>
					</div>
				</div>
				<p className='pt-3'>
					We can use these to check the board for the winner. We compare the
					values of every single square in a row. If these are the same we have
					the winner.
					<i>Remember: squares[Argument] is the value 'X' or 'O'</i>
				</p>
				<CodeBlock
					theme={dracula}
					language='jsx'
					text={`for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }`}
				/>
				<p className='pt-3'>
					If we have a winner we disabling the input of any user and tell the
					players who has won.
				</p>
				<div className='row'>
					<div className='col-lg-6 col-md-12'>
						<b>
							<i>Changing the state:</i>
						</b>
						<CodeBlock
							theme={dracula}
							language='jsx'
							text={`const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsPlaying ? 'X' : 'O');
    }`}
						/>
					</div>
					<div className='col-lg-6 col-md-12'>
						<b>
							<i>Disabling the click:</i>
						</b>
						<CodeBlock
							theme={dracula}
							language='jsx'
							className='h-100'
							text={`handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsPlaying ? 'X' : 'O';
    ...`}
						/>
					</div>
					<h4 className='pt-4'>Try it yourself!</h4>
					<div className='row'>
						<div className='col'></div>
						<div className='col-lg-6 col-sm-12 d-flex justify-content-center'>
							<Game />
						</div>
						<div className='col'></div>
					</div>
				</div>
			</ArticleBackground>
		);
	}
}

export default OfficialReactTutorial;

function Square(props) {
	return (
		<button className='square' onClick={props.onClick}>
			{props.value}
		</button>
	);
}

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: Array(9).fill(null),
			xIsNext: true,
		};
	}

	handleClick(i) {
		const squares = this.state.squares.slice();
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			squares: squares,
			xIsNext: !this.state.xIsNext,
		});
	}

	renderSquare(i) {
		return (
			<Square
				value={this.state.squares[i]}
				onClick={() => this.handleClick(i)}
			/>
		);
	}

	render() {
		const winner = calculateWinner(this.state.squares);
		let status;
		if (winner) {
			status = 'Winner: ' + winner;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}

		return (
			<div>
				<div className='status'>{status}</div>
				<div className='board-row'>
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className='board-row'>
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className='board-row'>
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

class Game extends React.Component {
	render() {
		return (
			<div className='game'>
				<div className='game-board'>
					<Board />
				</div>
				<div className='game-info'>
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
}

// ========================================

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}
