import React, { Component } from 'react';
import ReactHomeScreen from '../../ReactLanding/Pictures/create-react-app-start-screen.png';
import { CodeBlock } from 'react-code-blocks';
import './Style/ReactEntry1Style.css';
import { Link } from 'react-router-dom';
import ArticleBackground from '../../../Core/ArticleBackground/ArticleBackground';

class HelloReact extends Component {
	state = {};
	render() {
		return (
			<ArticleBackground>
				<div className='row'>
					<div className='col-lg-11'>
						<div id='content1'>
							<div className='content'>
								<h3 className='display-6 mb-3'>
									<b>Hello React!</b>
								</h3>
								<p>
									On the first day of learning any programming language the main
									goal is to say hello world in any kind of way. Because it is a
									beginner tutorial we did this the old fashioned way: a print
									in the console.
								</p>
								<p>
									Mosh from Programming with Mosh from YouTube showed us how it
									is done.
								</p>
								<h3 className='display-6 fs-3 my-3'>One step after another.</h3>
								<div>
									<p>
										At first we have to install react. We taking advantage of
										node.js. This is a library that comes with two features that
										we want to use:
									</p>
									<ul style={{ listStyle: 'none' }}>
										<li>
											<u>Development Server:</u> <br />
											Creates a virtual server to run React on.
										</li>
										<li className='pt-2'>
											<u>Package Manager:</u>
											<br />
											Allows us to install several packages for react.
										</li>
									</ul>
									<p>
										After we installed node from{' '}
										<a
											className='link-dark'
											style={{ textDecoration: 'none' }}
											href='https://nodejs.org/en/download/'
										>
											https://nodejs.org/en/download/
										</a>{' '}
										and then put in the line{' '}
										<CodeBlock
											language='shell'
											text='$ npm install create-react-app'
										></CodeBlock>
										in our folder we want to have react in
										<br />
										we can type in the following line
										<CodeBlock
											language='shell'
											text='$creacte-react-app app_name'
										></CodeBlock>
										to create our very first react app in our folder. How cool
										is that? After we changed our directory we can start the app
										by typing:
										<CodeBlock
											language='shell'
											text='$npm start'
										></CodeBlock>{' '}
										<div className='row pt-3'>
											<div className='col-lg-6 col-sm-12 my-auto pb-3'>
												The developer is then cheered with the following
												picture. (The logo is rotating).
											</div>
											<div className='col-lg-6 col-sm-12'>
												<img
													className='w-100 rounded-10'
													src={ReactHomeScreen}
													alt='React home screen.'
												></img>
											</div>
										</div>
									</p>
									<p className='pt-3'>
										Now we can start to create our website.
									</p>
								</div>
								<h3 className='display-6 fs-3 my-3'>Components?</h3>
								<div>
									<p>
										In react there are so called components, which represent all
										components (what a coincidence) of our website.
									</p>
									<p>
										The website, which you see at this moment consist of the
										header, the main content and the footer. All of these
										components are located in the app component. This way we
										create a tree structure, which react is based on.
									</p>
								</div>
								<h3 className='display-6 fs-3 my-3'>States</h3>
								<div>
									<p>
										Sometimes components need data to work with. Things like the
										number of shoes in your card can be stored that way.
									</p>
									<p>
										The great thing about this is, that this status is unrelient
										to other components and event elements in the same
										component. This means, that we can change the state and only
										change the element that uses this state, which results in a
										very fast user experience and ultra short loading times.
									</p>
									<div className='row'>
										<div className='col'></div>
										<div className='col-lg-8 d-lg-flex justify-content-center'>
											<div className='gradient mb-3 w-100'>
												<Link to='Labyrinth' className='button'>
													Generate a labyrinth!
												</Link>
											</div>
										</div>
										<div className='col'></div>
									</div>
									<p>
										The state cant be updated like a normal variable, though.
										The programmer has to call a certain function, which is, to
										be fair, not really hard. On more thing to mention: Despite
										the fact that the user of the website never can see this,
										but the change of the state is not applied after the method
										has been called. The state changes after a short period of
										time and is async with the website.This happens because
										every change has to go through every component in the tree.
									</p>

									<p>
										React is comparing the current with the new structure of the
										website. There is a virtual, not rendered, tree structure
										and a rendered structur. If the virtual structure is
										different to the rendered structur, the rendered structure
										is updated.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ArticleBackground>
		);
	}
}

export default HelloReact;
