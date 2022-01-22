import { createRef, useEffect, useState } from 'react';
import ArticleBackground from '../../Core/ArticleBackground/ArticleBackground';

const PathFinding = (props) => {
	const [cols, setCols] = useState('');
	var created = false;
	useEffect(() => {
		if (!created) {
			createGrid();
		}
	});
	const createGrid = () => {
		var resX = Math.floor(
			parseFloat(document.getElementById('ref').offsetWidth / 30)
		);
		var resY = Math.floor(
			parseFloat(document.getElementById('ref').offsetHeight / 30)
		);

		var cols = [];
		for (var x = 0; x < resX; x++) {
			var cells = [];
			for (var y = 0; y < resY; y++) {
				cells.push(createCell(30, 30));
			}

			cols.push({ cells });
		}
		setCols(cols);
		created = true;
	};
	return (
		<ArticleBackground>
			<div
				id='ref'
				style={{ height: '90vh', width: '90vw', position: 'absolute' }}
			></div>
			{cols}
		</ArticleBackground>
	);
};

const createCell = (width, height) => {
	return <div style={{ width: width, height: height }}></div>;
};

export default PathFinding;
