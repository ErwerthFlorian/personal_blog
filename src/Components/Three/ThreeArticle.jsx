import { useState } from 'react';
import './Style/ThreeArticle.css';
import ThreePic from '../Core/FeaturesArticle/Pictures/three.svg';
const ThreeArticle = (props) => {
	const [drawArticle, setDrawArticle] = useState();
	const handleToggleContainerButtonClick = () => {
		setDrawArticle(!drawArticle);
	};

	return (
		<div>
			<div className='three-article-container'>
				<img
					className='three-article-image'
					src={ThreePic}
					width='25%'
					height='300px'
				/>
				<div className='three-article-beside-image'>
					Three.js allows a creator of a webpage to easily create and render 3D
					objects. Three.js is using WebGL. WebGL is a JavaScript library that
					allows to access the graphics card from the web browser and therefore
					render 2D and 3D objects.
				</div>
				<div className='three-article-text'>How it works: </div>
				<div className='three-article-text'>
					The main component of the whole concept is the canvas. The canvas
					defines an area within the webpage with a certain width and height. It
					also comes with a own coordnate system.
				</div>
			</div>
		</div>
	);
};

export default ThreeArticle;
