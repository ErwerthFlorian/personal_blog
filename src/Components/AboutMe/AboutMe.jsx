import React, { Component } from 'react';
import WelcomePic from './Pictures/hi.jpg';
import Unity from './Pictures/unity.png';
import Udemy from './Pictures/Udemy.png';
import ReactLogo from './Pictures/React-Logo.svg';
import { HashLink } from 'react-router-hash-link';
import Planetensystem from './Pictures/Planetensystem.png';
import Planetpaths from './Videos/Planetpaths.mov';
import PlanetpathsSlow from './Videos/PlanetpathsSlow.mp4';
import DiamondSquareIllustration from './Pictures/DiamondSquareIllustration.png';
import FractalTerrainResult from './Pictures/FractalTerrainResult.png';
import Octaeder0 from './Pictures/Oktaeder.gif';
import Octaeder1 from './Pictures/Oktaeder1.gif';
import Octaeder2 from './Pictures/Oktaeder2.gif';
import Octaeder3 from './Pictures/Oktaeder3.gif';
import Oktahedron from './Videos/Oktahedron.mov';
import PerlinNoiseIllustration from './Pictures/PerlinNoise.jpg';
import PerlinNoisePlanet from './Videos/PerlinNoise.mov';
import PerlinNoisePlanetLayered from './Videos/PerlinNoiseLayered.mov';
import Sinusfunktion from './Pictures/Sinusfunktion.png';
import SinusfunktionResultat from './Pictures/SinusfunktionResultat.png';
import Planetwithridges from './Pictures/Planetwithridges.png';
import MeshLogic from './Pictures/MeshLogic.png';
import { Link } from 'react-router-dom';
import './Style/AboutMeStyle.css';

import {
	OverlayTrigger,
	Popover,
	PopoverTitle,
	PopoverContent,
} from 'react-bootstrap';
import ArticleBackground from '../Core/ArticleBackground/ArticleBackground';

class SelfPresentation extends Component {
	state = {
		placeOnPlane: 0,
		audioManager: 0,
		inputManager: 0,
		deviceManager: 0,
		mesh: 0,
		width: 0,
	};
	constructor(props) {
		super(props);
		this.placeOnPlane = React.createRef();
		this.inputManager = React.createRef();
		this.deviceManager = React.createRef();
		this.audioManager = React.createRef();
		this.buttonRef = React.createRef();
		this.meshRef = React.createRef();
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}
	render() {
		return (
			<ArticleBackground>
				<div className='row'>
					<div className='col-lg-11'>
						<div id='content1'>
							<div className='content'>
								<div className='row'>
									<p className='display-4 w-100 font-orange'>
										Great that you visit my page.
									</p>
									<h1 className='col-lg-8 display-5 pb-4' id='beginning1'>
										Who am I and what am I doing?
									</h1>
								</div>
								<div className='row'>
									<div className='col-lg-7'>
										<img
											src={WelcomePic}
											alt='Welcome.'
											className='w-100 rounded-start rounded-end'
										></img>
									</div>

									<div className='col-lg-5'>
										<div className='pt-3'>
											<p>
												My name is Florian, 29 years old and I am living in
												Munich, Bavaria, Germany.
											</p>
											<p>
												I am a trainee at T-Systems Multimedia Solutions GmbH. A
												company from the Deutsche Telekom. Together with my
												colleagues I realize business projects in the AR VR
												field.
											</p>
											<p>
												At home I work with Unity aswell. With Unity I mostly
												create physics simulations. My passion for the web
												development started over a year ago. I made a course on
												Udemy.com for the foundation and now learning React.js.
												And that is the foundation for this blog.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div id='content2'>
							<div className='rounded-10 content'>
								<div className='row'>
									<h1 className='col-lg-8 display-5 pb-4' id='beginning2'>
										Which projects did I realized then?
									</h1>
								</div>
								<div className='row'>
									<div className='col-lg'>
										<img
											src={Unity}
											alt='Unity'
											className='card-img rounded-10'
										></img>
									</div>
									<div className='col-lg-8'>
										<div>
											<div className='pt-3'>
												My three biggest projects are:
												<ul style={{ listStyle: 'none' }}>
													<li>Augmented Reality Toolkit</li>
													<li>Showing IoT data with Nreal AR glasses.</li>
													<li>Virtual Experience Designer</li>
												</ul>
											</div>
											<p className='display-6'>Augmented Reality Toolkit</p>
											<p>
												The Augmented Reality Toolkit, short ARTK, is a
												collection of modules to enhance the productivity of our
												team. Instead of programming everything from scratch we
												use these modules to start our projects. These modules
												can be downloaded via our confluence page and can be
												imported as unity packages. Every module has its own
												documentation and the code follows our coding
												conventions.
											</p>
											<p>
												We started by collection all old functions of our
												projects and filtered them after usability for the ARTK.
												Then we made them more modular. These modules are for
												example:
											</p>
										</div>
									</div>
									<div>
										<div className='row pt-2'>
											<div className='col-lg-3 py-1'>
												<div className='button-gradient'>
													<OverlayTrigger
														trigger='click'
														placement='bottom'
														overlay={
															<Popover
																style={{
																	maxWidth: `${this.state.audioManager}px`,
																	zIndex: '1',
																}}
															>
																<PopoverTitle>Audio Manager</PopoverTitle>
																<PopoverContent>
																	Enables the software engineer to queue audio
																	clips, which is realized with Unity editor
																	scripting. The queue and the audio manager
																	itself can be used to create a special
																	behavior.
																</PopoverContent>
															</Popover>
														}
													>
														<button
															className='button-gradient-button'
															ref={this.audioManager}
															onMouseDown={() => {
																var w = this.audioManager.current.offsetWidth;
																this.setState({ audioManager: w });
															}}
														>
															Audio Manager
														</button>
													</OverlayTrigger>
												</div>
											</div>
											<div className='col-lg-3 py-1'>
												<div className='button-gradient'>
													<OverlayTrigger
														trigger='click'
														placement='bottom'
														overlay={
															<Popover
																style={{
																	maxWidth: `${this.state.deviceManager}px`,
																	zIndex: '1',
																}}
															>
																<PopoverTitle>Device Manager</PopoverTitle>
																<PopoverContent>
																	Creates an easy to use plattform handling for
																	Unity. The reason is that every plattform has
																	its own settings and if a project is created
																	you have to tweak this settings every single
																	time. This module switches the plattform and
																	makes sure that the perfect settings are
																	enabled.
																</PopoverContent>
															</Popover>
														}
													>
														<button
															className='button-gradient-button'
															ref={this.deviceManager}
															onMouseDown={() => {
																var w = this.deviceManager.current.offsetWidth;
																this.setState({ deviceManager: w });
															}}
														>
															Device Manager
														</button>
													</OverlayTrigger>
												</div>
											</div>
											<div className='col-lg-3 py-1'>
												<div className='button-gradient'>
													<OverlayTrigger
														trigger='click'
														placement='bottom'
														overlay={
															<Popover
																style={{
																	maxWidth: `${this.state.inputManager}px`,
																	zIndex: '1',
																}}
															>
																<PopoverTitle>Input Manager</PopoverTitle>
																<PopoverContent>
																	This module is a connector between the
																	different inputs of the plattforms and devices
																	we use.
																</PopoverContent>
															</Popover>
														}
													>
														<button
															className='button-gradient-button'
															ref={this.inputManager}
															onMouseDown={() => {
																var w = this.inputManager.current.offsetWidth;
																this.setState({ inputManager: w });
															}}
														>
															Input Manager
														</button>
													</OverlayTrigger>
												</div>
											</div>
											<div className='col-lg-3 py-1'>
												<div className='button-gradient'>
													<OverlayTrigger
														trigger='click'
														placement='bottom'
														overlay={
															<Popover
																style={{
																	maxWidth: `${this.state.placeOnPlane}px`,

																	zIndex: '1',
																}}
															>
																<PopoverTitle>Place on plane</PopoverTitle>
																<PopoverContent>
																	A special component that uses the different
																	methods of detecting the surfaces of a room
																	and enables the software engineer to implement
																	a mechanic, that allows users of the app to
																	place things on this detected surface.
																</PopoverContent>
															</Popover>
														}
													>
														<button
															className='button-gradient-button'
															ref={this.placeOnPlane}
															onMouseDown={() => {
																var w = this.placeOnPlane.current.offsetWidth;
																this.setState({ placeOnPlane: w });
															}}
														>
															Place on plane
														</button>
													</OverlayTrigger>
												</div>
											</div>
										</div>
										<p className='pt-4 display-6'>
											Showing IoT data with Nreal AR glasses.
										</p>
										<p>
											The application was requested from an university in
											Austria.
										</p>
										<p>
											The frontend side of the application allows the user to
											scan a QR code, that has the id of the maschine, which
											data should be displayed. This id is send to the backend
											of the app on a server. The backend is fetching the data
											from a IoT plattform, modifys it for the frontend and
											sends it back again.
										</p>
										<p>
											If the communication of these three connections is
											successful, the panels are opened. The data is refreshing
											every five seconds from then.
										</p>
										<p>
											In addition to that the app allows the user to change the
											ip address the frontend is using to get data. After the
											change has made a healthcheck is send to the backend
											automatically.
										</p>
										<p className='pt-4 display-6'>
											Virtual Experience Designer
										</p>
										<p>
											The VRED (Virtual Experience Designer) allows the creation
											of virtual experiences for different plattforms using
											collected functions of old virtual experiences and created
											a basis for every newly requested experiences.
										</p>
										<p>
											The reason for the VRED is redundancy. We used to create
											every virtual experience from scratch. That lead to a
											demand of a software engineer every time despite the fact
											that the virtual experiences share many functions. Now the
											virtual experiences can be created by designers without a
											software engineer.
										</p>
										<p>
											The VRED is using Unity editor scripting only. The changes
											made in the experience, that the designer is creating are
											valid for every plattform. That way the designer does not
											have to (but can) design specific for every plattform.
										</p>
										<p className='pt-4 display-6'>Agile projects</p>
										<p>
											All projects, for business and for private purposes, are
											realized on an agile way.
										</p>
										<p>
											I like the agile project management because you have a
											certain amount of time for a certain task or tasks. This
											tasks have to be completed completly self-reliant. Which I
											like a lot.
										</p>

										<p>
											The tool that we are using for this is Jira. In Jira we
											creating a kanban board, which then is filled with tasks.
										</p>
									</div>
								</div>
							</div>
						</div>
						<div id='content3'>
							<div className='rounded-10 content'>
								<div className='row'>
									<h1 className='col-lg-8 display-5' id='beginning3'>
										Which private projects did I have realized?
									</h1>
								</div>
								<div className='row'>
									<div className='col-lg'>
										As mentioned I like to create physics simulations. But I
										also like to created custom meshes in Unity with certain
										algorithms.
										<h3 className='display-6 pt-3'>Solar System</h3>
										<p>
											A classic mechanical physics simulation. My main target
											with this project was to find a realistic, but also
											performant, way to simulate the paths of planets around
											sun(s).
										</p>
										<p>
											The first problem to address was the fact that there is no
											way to guess the correct initial velocity of a planet to
											orbit the sun. The first approach to solve this was by
											calculating the velocity.
										</p>
										<div className='row pb-1'>
											<p className='col-xl-5 col-sm-12 pt-3'>
												To get more realistic paths (the paths are no circles!)
												I implemented a realtime path forecast. If you tweak the
												initial velocity of a planet the paths are calculated
												accordingly and then drawn into the scene. This way the
												paths are eliptical and not only on a plane.
											</p>
											<div className='col-lg-1'></div>
											<div className='col pb-3'>
												<img
													className='w-100 rounded-start rounded-end'
													src={Planetensystem}
													alt='Solar System'
												/>
												<i>
													<small>
														Illustration of a solar system with planets on their
														way arround the sun.
													</small>
												</i>
											</div>
										</div>
										<p>
											To enhance this little tool I created a option, where you
											can draw a path relative to a other planet. This allows us
											to create moons. We need this, because it is difficult to
											guess the initial velocity without a destinct view on the
											system.
										</p>
									</div>
								</div>
								<div className='row'>
									<div className='col'></div>
									<div className='col-lg-6 col-sm-12'>
										<video
											className='w-100  rounded-start rounded-end'
											src={Planetpaths}
											controls
										></video>
										<i>
											<small>
												Generation of a path in relation to the sun.
											</small>
										</i>
									</div>

									<div className='col'></div>
									<p className='pt-3'>
										If there are many planets the efficency of my implemented
										algorithm plays a big role. Otherwise you have to wait
										several seconds for each update of the planet paths. You
										have to calculate every single path, because a solar system
										is a multi body system where every body influences the other
										and changing their path. To enhance the speed even further I
										implemented a multithreaded system with the Unity job
										system.
									</p>
									<div className='col'></div>
									<div className='col-lg-6 col-sm-12'>
										<video
											className='w-100  rounded-start rounded-end'
											src={PlanetpathsSlow}
											controls
										></video>
										<i>
											<small>Simulation of the paths with timesteps.</small>
										</i>
									</div>
									<div className='col'></div>
									<h3 className='pt-5 display-6'>
										Procedural mesh generation and manipulation
									</h3>
									<div className='row pe-0 me-0 pt-2'>
										<div className='col-lg-6 col-sm-12'>
											<div className='button-gradient'>
												<OverlayTrigger
													trigger='click'
													placement='bottom'
													overlay={
														<Popover
															style={{
																maxWidth: `${this.state.mesh}px`,
																marginTop: '2px',
																borderTopRightRadius: '0px',
																borderTopLeftRadius: '0px',
																boxShadow: '0px 0px 4px 3px black',
																zIndex: '1',
															}}
														>
															<PopoverTitle
																style={{
																	backgroundColor: '#fc466b',
																	borderTopRightRadius: '0px',
																	borderTopLeftRadius: '0px',
																	color: 'white',
																}}
															>
																Meshes in Unity:
															</PopoverTitle>
															<PopoverContent>
																<div>
																	Meshes in Unity are a big thing. A mesh in
																	general is the surface of a object, that is
																	rendered in the camera. The meshes consist of
																	two things: Vertices and Triangles.
																</div>
																<div>
																	Vertices points of a mesh, which are then
																	connected to generate a mesh. The order how
																	these points are connected is stored in a
																	triangle.
																</div>
																<div className='row'>
																	<div className='col-lg-7 col-sm-12'>
																		<img
																			src={MeshLogic}
																			width='100%'
																			height='100%'
																			alt='Unity mesh logic.'
																		/>
																	</div>
																	<div className='col-lg-5 col-sm-12 pt-3'>
																		A triangle simply says which points should
																		connect. Imagine four vertices with indicies
																		from 1 to 4 forming the corners of a square.
																		A mesh of a square then have the following
																		order stored to generate a mesh:
																		[1,2,4,2,3,4].The order how the verts are
																		connected plays a big role because unity
																		uses this to determine if the mesh is facing
																		the camera or not.
																	</div>
																</div>
															</PopoverContent>
														</Popover>
													}
												>
													<button
														className='button-gradient-button'
														ref={this.meshRef}
														onMouseDown={() => {
															var w = this.meshRef.current.offsetWidth;
															this.setState({ mesh: w });
														}}
													>
														What is a mesh?
													</button>
												</OverlayTrigger>
											</div>
										</div>
										<div className='col pt-2'>
											The procedural mesh generation in Unity is a difficult
											task. There are vertices and triangles. But to explain
											please press the button.
										</div>
										<p>
											This allows us to generate custom objects. Of any object I
											could think about of course I picked planets and terrain.
											This is why I present to you two ways to generate these.
											The following algorithms are presented:
										</p>
									</div>
									<div>
										<ul className='pt-0 mb-0' style={{ listStyle: 'none' }}>
											<li>
												Terrain generation with the diamond square algorithm
											</li>
											<li>
												Generation of planets with a octahaedron and
												manipulation of the mesh.
											</li>
										</ul>
									</div>
									<h4 className='pt-3'>
										Terrain generation with the diamond square algorithm
									</h4>
									<p>
										This algorithm, presented for the first time in 1982, is a
										algorithm, that generates terrain by the following steps:
										Setting a initial height in the four corners of a square.
										<br />
										Now you make the <b>Diamond Step</b>: Add up the values in
										the corner, divide it by 4 and add a random, restricted
										value. The height of the middle of the square is now set to
										this value. Now the second step. <br />
										The <b>Square Step</b>: Now you set the points half of the
										way between the corner points to a addition of the corner
										values and the value in the middle of the square and also
										add a random, restricted value.
										<br />
										Now divide the square in four smaller squares and repeat the
										process until the number of points on a side is 3.
									</p>
									<img
										className='rounded-start rounded-end'
										src={DiamondSquareIllustration}
										alt='Diamond Square Algorithm'
									/>
									<i>
										<small>Illustration of the Diamond-Square-Algorithm.</small>
									</i>
									<p className='pt-3'>
										The implementation of this algorithm had several, most of
										the time, mathematical challenges. The vertices, that height
										is generated through the algorithm, are stores in a one
										dimensional array. That leads to neckbreaking calculations
										to find the correct index to it.
									</p>
									<div className='row'>
										<div className='col-lg-6 col-sm-12'>
											<img
												className='w-100 rounded-start rounded-end'
												src={FractalTerrainResult}
												alt='Result of the fractal terrain algorithm'
											/>
											<i>
												<small>Result of the Diamond-Square-Algorithm.</small>
											</i>
										</div>
										<div className='col-lg-6 col-sm-12 pt-2'>
											<p>
												The result is now a square with vertices, that all have
												been manipulated according to the neighbor vertices.The
												number of vertices is restricted to 2 to the power of
												16. 65536 vertices.
											</p>
										</div>
									</div>
								</div>
								<h4 className='pt-5'>
									Generation of planets with a octahaedron and manipulation of
									the mesh.
								</h4>
								<div>
									A octahaedron is a body with very good symmetrical properties.
									It consist of eight equilateral triangles. If you divide these
									into smaller equilateral triangles, you get a very nice
									distribution of points.
									<div className='row pt-3'>
										<div className='col-lg-3 col-sm-12'>
											<img
												className='w-100'
												alt='Inital state of a octahaedron'
												src={Octaeder0}
											/>
											<i>
												<small>No subdivision.</small>
											</i>
										</div>
										<div className='col-lg-3 col-sm-12'>
											<img
												className='w-100'
												alt='First subdivision octahaedron'
												src={Octaeder1}
											/>
											<i className='ps-lg-4 ms-lg-4'>
												<small>First subdivision.</small>
											</i>
										</div>
										<div className='col-lg-3 col-sm-12'>
											<img
												className='w-100'
												alt='Second subdivision octahaedron'
												src={Octaeder2}
											/>
											<i className='ps-lg-4 ms-lg-4'>
												<small>Second subdivision.</small>
											</i>
										</div>
										<div className='col-lg-3 col-sm-12'>
											<img
												className='w-100'
												alt='Second subdivision octahaedron'
												src={Octaeder3}
											/>
											<i className='ps-lg-4 ms-lg-4'>
												<small>Third subdivision.</small>
											</i>
										</div>
									</div>
								</div>
								<div>
									<p className='pt-2'>
										Because a planet is round, we have to find a way to generate
										sphere from the octahaedron. We use the high amount of
										points we generated.
									</p>
									<p>
										A sphere is a sphere because every point on the surface has
										the same distance to the center of the sphere. This distance
										is the radius of the sphere. Mathematically these points are
										vectors.
									</p>
									<p>
										To manipulate these vectors to have the same distance to the
										middle of the octahaedron we normalize the vectors. This is
										done by dividing the components x,y and z by the magnitude
										(length) of the vector. This gives us a vector that
										magnitude is 1. Just what we need for a sphere.
									</p>
								</div>
								<div className='row'>
									<div className='col'></div>
									<div className='col-lg-6 col-sm-12'>
										<video
											className='w-100  rounded-start rounded-end'
											src={Oktahedron}
											alt='Shows the process of subdividing a octahaedron'
											controls
										></video>
										<i>
											<small>Octahaedron to sphere.</small>
										</i>
									</div>

									<div className='col'></div>
								</div>
								<div className='row pt-2'>
									<p className='col-lg-8 col-sm-12'>
										To generate terrain like shapes out of our sphere we use
										perlin noise.
										<br /> Perlin noise is a "fractal noise function", which
										uses gradients to generate coherent greyscales.
										<br />
										Numerical these are all values between 0 and 1. This is
										perfect to use this as a percentage value.
									</p>
									<div className='col-lg-4 col-sm-12'>
										<img
											className='w-100  rounded-start rounded-end'
											src={PerlinNoiseIllustration}
											alt='Perlin Noise'
										/>
										<i>
											<small>Perlin Noise.</small>
										</i>
									</div>
								</div>
								<div className='row pt-3'>
									<p>
										This then generates a "blob". Thats the official name for
										shapes like this one.
									</p>
									<div className='col'></div>
									<div className='col-lg-6 col-sm-12'>
										<video
											className='w-100  rounded-start rounded-end'
											src={PerlinNoisePlanet}
											alt='Generating a planet with perlin noise'
											controls
										></video>
										<i>
											<small>
												Manipulation of the sphere with Perlin Noise.
											</small>
										</i>
									</div>
									<div className='col'></div>
								</div>
								<div className='row pt-3'>
									<p>
										To generate a more specific shape we have to layer the
										perlin noise functions on each other. We use the fact that
										perlin noise is zoomable. We increase / decrease the
										distance to the noise and get a more defined shape.
									</p>
									<div className='col'></div>
									<div className='col-lg-6 col-sm-12'>
										<video
											className='w-100  rounded-start rounded-end'
											src={PerlinNoisePlanetLayered}
											alt='Generating a planet with layered perlin noise'
											controls
										></video>
										<i>
											<small>Layering Perlin Noise.</small>
										</i>
									</div>
									<div className='col'></div>
								</div>
								<p className='pt-3'>
									The planet can be manipulated in a additional way. Because
									every point on the surface has a value, we can use this value
									and put it in a function to generate another value.
								</p>
								<div className='row'>
									<p>
										To generate mountains, we can use the sin function a base
										and manipulate it further.
									</p>

									<div className='col-lg-6'>
										<br />
										<img
											className='w-100 pt-3  rounded-start rounded-end'
											src={Sinusfunktion}
											alt='Sinus Function'
										></img>
										<i>
											<small>The Sin.</small>
										</i>
									</div>
									<div className='col-lg-6'>
										<img
											className='w-100 pt-4  rounded-start rounded-end'
											src={SinusfunktionResultat}
											alt='Result of manipulating the sinus function'
										></img>
										<i>
											<small>The result of the function in Geogebra.</small>
										</i>
									</div>
								</div>
								<div className='row pt-4'>
									<div className='col'></div>
									<div className='col-lg-8'>
										<img
											className='w-100  rounded-start rounded-end'
											src={Planetwithridges}
											alt='Planet with mountains'
										></img>
										<i>
											<small>Planet with mountains.</small>
										</i>
									</div>

									<div className='col'></div>
								</div>
							</div>
						</div>
						<div id='content4'>
							<div className='rounded-10 content'>
								<div className='row'>
									<h1 className='col-lg-8 display-5' id='beginning3'>
										Which experience did I made in the web development?
									</h1>
									<div className='col-lg'>
										<img
											src={Udemy}
											alt='Udemy'
											className='card-img rounded-10'
										></img>
									</div>
								</div>
								<div className='row'>
									<div className='col-lg'>
										My experiences with web development are all based on my
										interest in it. Like mentioned before I made a course in
										Unity to learn the basics. These basics are JavaScript, CSS,
										HTML and Bootstrap. Now with this blog I take it a step
										further and learn React.js, because I am interested in
										aquiring a job in this field.
									</div>
								</div>
								<div>
									<h3 className='display-6 pt-3'>
										Why I am interested in frontend web development.
									</h3>
									<p>
										As you already have figured out I am someone, who likes
										visually pleasing things, that have a complex base. Just
										like in Unity in web development there is the opportunity to
										create a visually awesome website and implement a complex
										behavior for it.
									</p>
									<p>
										I always try to be creative when it comes to visualize
										things and a language like CSS is the perfect foundation for
										this. It is a feeling that is not subscribable, when I hover
										a button and some beautiful animation happens.
									</p>
								</div>
								<div>
									<h3 className='display-6 pt-3'>React JS</h3>
									<div className='row'>
										<div className='col-lg'>
											<img
												src={ReactLogo}
												alt='React logo'
												className='w-100 rounded-10'
											></img>
										</div>
										<div className='col-lg-9'>
											<p>
												Learning React is the next logical step for me. React
												gives me the opportunity to create a performant website
												with a ton of additional features like forms, hooks,
												states and so on.
											</p>
											<p>
												I started by making a tutorial and after that I thought
												about a way to improve my skills and in addition tell
												about my journey. In this moment my blog was born. And
												in this short period of time (1 months when I am writing
												this) I have learned so much about React and what it
												does for developers. The funny part is, that I initialy
												thought "ok, and whats the difference to a normal html
												then?".
											</p>
											<p>
												I am really glad that I have started this blog. It is
												very fun but also quite a challenge because I have to
												think about so many decisions.
											</p>

											<div className='button-gradient'>
												<Link
													style={{ display: 'inline-block' }}
													to='ReactLanding'
													className='button-gradient-button'
												>
													Check out what I have learned about React so far.
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ArticleBackground>
		);
	}
}

export default SelfPresentation;
