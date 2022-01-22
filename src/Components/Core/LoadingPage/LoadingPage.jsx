import './Style/LoadingPageStyle.css';
import LoadingCircle from './Pictures/reload.svg';
import { useState } from 'react';

const LoadingPage = (props) => {
	const [load, setLoad] = useState(false);
	window.addEventListener('resize', () => {
		setLoad(!load);
	});
	return (
		<img
			src={LoadingCircle}
			width='200px'
			height='200px'
			className='reload'
			style={{
				position: 'absolute',
				left: parseFloat(window.innerWidth - 200) / 2,
				top: parseFloat(window.innerHeight - 200) / 2,
			}}
			alt='Loading Circle'
		></img>
	);
};

export default LoadingPage;
