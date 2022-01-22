import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Style/featured-article.css';
class FeaturedArticle extends Component {
	render() {
		return (
			<Link to={this.props.link}>
				<div className='featured-article'>
					<div
						className='featured-article-picture'
						style={{
							backgroundImage: `url(${this.props.img})`,
						}}
					></div>
					<div className='featured-article-background'>
						<div className='featured-article-textfield'>
							<div className='featured-article-caption'>
								{this.props.caption}
							</div>
							<div className='featured-article-text'>
								{this.props.texts != undefined ? (
									this.props.texts.map((text) => {
										return (
											<div>
												{text} <br></br>
											</div>
										);
									})
								) : (
									<div>
										{' '}
										Sorry, there is no content to show <br></br> <h1>:(</h1>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* <svg className='featured-article-pattern' width='100%' height='100%'>
						<pattern
							id='pattern-circles'
							x='0'
							y='0'
							width='100%'
							height='6'
							patternUnits='userSpaceOnUse'
						>
							<rect fill='rgba(200,200,200,.3)' width='100%' height='3'></rect>
							<rect fill='rgba(150,150,150,.1)' width='100%' height='3'></rect>
						</pattern>

						<rect
							x='0'
							y='0'
							width='100%'
							height='100%'
							fill='url(#pattern-circles)'
						></rect>
					</svg> */}
				</div>
			</Link>
		);
	}
}

export default FeaturedArticle;
