import React, { Component } from 'react';
import './Style/MainPageStyle.css';
import MyPic from '../AboutMe/Pictures/hi.jpg';
import Bezier from '../Core/FeaturesArticle/Pictures/Bezier.svg';
import ThreePic from '../Core/FeaturesArticle/Pictures/three.svg';
import LabyrinthPic from '../Core/FeaturesArticle/Pictures/Labyrinth.png';
import FeaturedArticle from '../Core/FeaturesArticle/FeaturedArticle';
import Entry from '../Core/Entry/Entry';
import Entries from '../Core/Entries/Entries';
import Boids from '../Core/FeaturesArticle/Pictures/Boids.svg';
import Konditionen from './Pictures/Konditionen.png';
import chat from './Pictures/chat.svg';
import TicTacToe from './Pictures/TicTacToe.png';
import ReactHomeScreen from './Pictures/create-react-app-start-screen.png';

class Landing extends Component {
	render() {
		return (
			<div>
				<FeaturedArticle
					link='/Chatroom'
					img={chat}
					caption='Creating a chatroom'
					texts={[
						'React allows you to create a frontend application. Every webpage and user interface is a frontend app.',
						'',
						'But to unlock the full potential of the frontend, a connection to a backend is necessary. Otherwise there is no way to communicate with other frontend users.',
						'',
						'Hop in and chat with the users on the website. Do not worry, the communication is secure.',
					]}
				/>
				{this.drawBlogEntries()}
			</div>
		);
	}

	drawBlogEntries = () => {
		return (
			<div>
				<Entries>
					<Entry
						link='/Boids'
						picture={Boids}
						altDescription='A picture of a flock.'
						description='Blog - Tools'
						title='Boids'
						text='Learn what "boids" are.'
					/>
					<Entry
						link='/BezierTool'
						picture={Bezier}
						altDescription='A picture of a bezier curve'
						description='Blog - Tools'
						title='Bezier Curves'
						text='Check out how bezier curves are created.'
					/>
					<Entry
						link='/Labyrinth'
						picture={LabyrinthPic}
						altDescription='A picture of a labyrinth'
						description='Blog - Algorithms'
						title='Recursive Backtracker'
						text='Discover how a labyrinth is created with only for steps.'
					/>

					<Entry
						link='/HelloReact'
						picture={ReactHomeScreen}
						alt='React Home Screen.'
						description='Blog - React'
						title='Hello React!'
						text='The core concept of react are components. Discover them!'
					/>

					<Entry
						link='/OfficialReactTutorial'
						picture={TicTacToe}
						alt='React Home Screen.'
						description='Blog - React'
						title='Tic-Tac-Toe'
						text='Discover the official tutorial from the creators of react to program a tic tac toe game'
					/>
					<Entry
						link='/ReactEntry2'
						picture={Konditionen}
						alt='React Home Screen.'
						description='Blog - React'
						title='Conditions'
						text='Explore how to conditionally render styles and lists.'
					/>
					<Entry
						link='/SelfPresentation'
						picture={MyPic}
						altDescription='Author of this page.'
						description='Blog'
						title='Get to know me.'
						text='Read which projects I have done privately and for work.'
					/>
				</Entries>
			</div>
		);
	};
}

export default Landing;
