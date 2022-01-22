import React, { Component } from 'react';
import '../../ReactEntries/ReactEntry1/Style/ReactEntry1Style.css';
import ShoppingList from './ShoppingList/ShoppingList';
import { CodeBlock, dracula } from 'react-code-blocks';
import ArticleBackground from '../../../Core/ArticleBackground/ArticleBackground';

class ReactEntry2 extends Component {
	state = { elements: ['Shoes', 'Pants', 'Socks', 'Shirt'] };
	render() {
		return (
			<ArticleBackground>
				<div className='row'>
					<div className='col-lg-11'>
						<div id='content1'>
							<div className='content'>
								<h3 className='display-6 mb-3'>
									<b>Use conditional rendering.</b>
								</h3>
								<p>
									A programmer can use the state of a component wisely: he can
									use it to render elements differently.
								</p>
								<p>
									A good example for this is the number of articles in the
									shopping card. We define a component "shopping list". This
									component has the state "numberOfShoes", which stores the
									number of pairs of shoes in the shopping card.
								</p>
								<p>
									The background of the element with the number is then rendered
									dependent on the number of pairs of shoes there are.
								</p>
								<ShoppingList />
								<p className='pt-3'>
									The big benefit of the undependent change of components in a
									website is the decrease of loading times. This is especially
									noticeably, if there are many items or things to display. No
									wonder, that react is created by facebook, which uses react
									for the website.
								</p>

								<h3 className='display-6 mb-3'>
									<b>How to render lists in React.</b>
								</h3>
								<p>In HTML there are of course classical list. Put in:</p>
								<CodeBlock
									theme={dracula}
									language='jsx'
									text={`<ul>
    <li>List Element</li>
</ul>`}
								/>
								<p className='pt-3'>and you get:</p>
								<ul>
									<li>List Element</li>
								</ul>
								<p>
									If there are many many elements, which you want to display in
									a list, this will be very exhausting. There is a fast way to
									do this. The .map() function.
								</p>
								<p>
									Many programming languages know the concept of arrays. These
									are containers, that can store different data types and label
									them with a address to find them. You can display all of these
									elements in a list with the .map() function.
								</p>
								<p>We create a array of elements:</p>
								<CodeBlock
									theme={dracula}
									language='jsx'
									text={`state = { elements: ["Shoes", "Pants", "Socks", "Shirt"] }`}
								/>
								<p className='pt-3'>
									These element can be converted to a list now:
								</p>
								<CodeBlock
									theme={dracula}
									language='jsx'
									text={`<ul>
    this.state.elements.map((element) => <li key={element}>{element}</li>)
</ul>`}
								/>
								<p className='pt-3'>and we get:</p>
								<ul>
									{this.state.elements.map((element) => (
										<li key={element}>{element}</li>
									))}
								</ul>
								<p>
									The big advantage is here, that we can change each part of the
									array independently. If we want to delete a article from the
									shopping list, this will be no problem. All other items will
									still be rendered in this list.
								</p>
							</div>
						</div>
					</div>
				</div>
			</ArticleBackground>
		);
	}
}

export default ReactEntry2;
