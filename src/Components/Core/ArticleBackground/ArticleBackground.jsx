import React from 'react';
import './Style/ArticleBackgroundStyle.css';
const ArticleBackground = (props) => {
	return (
		<div ref={props.reference} className='article-background' id={props.id}>
			{props.children}
		</div>
	);
};

export default ArticleBackground;
