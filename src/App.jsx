import React, { Component, Suspense } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import LoadingPage from './Components/Core/LoadingPage/LoadingPage';

const Home = React.lazy(() => import('./Components/MainPage/MainPage'));
const PathFinding = React.lazy(() =>
	import('./Components/Tools/PathFinding/PathFinding')
);
const Header = React.lazy(() => import('./Components/Header/Header'));
const Footer = React.lazy(() => import('./Components/Footer/Footer'));
const Contact = React.lazy(() => import('./Components/Contact/Contact'));
const AboutMe = React.lazy(() => import('./Components/AboutMe/AboutMe'));
const Chatroom = React.lazy(() =>
	import('./Components/ReactBlog/ReactEntries/Chatroom/Chatroom')
);
const ReactLanding = React.lazy(() =>
	import('./Components/ReactBlog/ReactLanding/ReactLanding')
);
const ReactEntry1 = React.lazy(() =>
	import('./Components/ReactBlog/ReactEntries/ReactEntry1/ReactEntry1')
);
const ReactEntry2 = React.lazy(() =>
	import('./Components/ReactBlog/ReactEntries/ReactEntry2/ReactEntry2')
);
const OfficialReactTutorial = React.lazy(() =>
	import(
		'./Components/ReactBlog/ReactEntries/OfficialReactTutorial/OfficalReactTutorial'
	)
);
const Three = React.lazy(() => import('./Components/Three/Three'));
const BezierTool = React.lazy(() =>
	import('./Components/Tools/BezierTool/BezierTool')
);
const Labyrinth = React.lazy(() =>
	import('./Components/Tools/RecursiveBacktracker/RecursiveBacktrackerTool')
);
const Boids = React.lazy(() => import('./Components/Tools/Boids/Boids'));

class App extends Component {
	render() {
		return (
			<Router>
				<Suspense fallback={<LoadingPage />}>
					<Switch>
						<Route exact path='/' component={LandingPage}></Route>

						<div style={{ backgroundColor: 'black' }}>
							<Header />
							<Route exact path='/Contact' component={Contact}></Route>
							<Route exact path='/Chatroom' component={Chatroom}></Route>
							<Route exact path='/PathFinding' component={PathFinding}></Route>
							<Route exact path='/Boids' component={Boids}></Route>
							<Route exact path='/Three' component={Three}></Route>

							<Route exact path='/HelloReact' component={ReactEntry1}></Route>
							<Route exact path='/ReactEntry2' component={ReactEntry2}></Route>
							<Route exact path='/BezierTool' component={BezierTool}></Route>
							<Route
								exact
								path='/OfficialReactTutorial'
								component={OfficialReactTutorial}
							></Route>
							<Route
								exact
								path='/ReactLanding'
								component={ReactLanding}
							></Route>
							<Route exact path='/Labyrinth' component={Labyrinth}></Route>
							<Route exact path='/Home' component={Home}></Route>
							<Route exact path='/AboutMe' component={AboutMe}></Route>
							<Footer />
						</div>
					</Switch>
				</Suspense>
			</Router>
		);
	}
}

export default App;
