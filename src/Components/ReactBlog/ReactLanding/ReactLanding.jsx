import React, { Component } from 'react';
import ReactLogo from '../../AboutMe/Pictures/React-Logo.svg';
import ReactHomeScreen from './Pictures/create-react-app-start-screen.png';
import Konditionen from './Pictures/Konditionen.png';
import TicTacToe from './Pictures/TicTacToe.png';
import Entry from '../../Core/Entry/Entry';
import Entries from '../../Core/Entries/Entries';
import FeaturedArticle from '../../Core/FeaturesArticle/FeaturedArticle';

class ReactLanding extends Component {
	render() {
		return (
			<div>
				<FeaturedArticle
					img={ReactLogo}
					caption='My react blog'
					texts={[
						'The way to learn react is like a pathway.',
						'',
						'You have many different stops to eventually arrive at your destination. That destination is to know everything you need to know, to build an expert level react app.',
						'',
						'Explore what I have done to learn all the little things about React. From building a first hello world app to a whole blog.',
					]}
				/>
				<Entries>
					<Entry
						link='/Chatroom'
						picture={TicTacToe}
						alt='React Home Screen.'
						description='Blog - React'
						title='Chatroom with React and Socket.io'
						text='Learn how to make your own chatroom'
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
						link='/HelloReact'
						picture={ReactHomeScreen}
						alt='React Home Screen.'
						description='Blog - React'
						title='Hello React!'
						text='The core concept of react are components. Discover them!'
					/>
				</Entries>
			</div>
		);
	}
}

export default ReactLanding;
