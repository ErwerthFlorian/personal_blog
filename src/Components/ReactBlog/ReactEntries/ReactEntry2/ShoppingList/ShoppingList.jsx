import React, { Component } from 'react';

class ShoppingList extends Component {
	state = {
		anzahl: 0,
		className: 'text-center pt-2 border border-5 rounded w-100 h-100',
	};

	render() {
		return (
			<div>
				<div className='row px-2'>
					<div className='col'></div>
					<div className='col-lg-2 d-flex justify-content-center border border-5 p-0 rounded'>
						<button
							className='btn btn-light w-100'
							onClick={() => {
								this.handleDecrement();
							}}
						>
							<h2 className='text-center'>-</h2>
						</button>
					</div>
					<div
						className='col-lg-2  p-0'
						style={{ cursor: 'default', color: 'black' }}
					>
						<h2 className='text-center pt-2 border border-5 rounded w-100 h-100'>
							Pair of shoes
						</h2>
					</div>
					<div
						className='col-lg-2  p-0'
						style={{ cursor: 'default', color: 'black' }}
					>
						<h2 className={this.handleClass()}>Amount: {this.state.anzahl}</h2>
					</div>
					<div className='col-lg-2 d-flex justify-content-center border border-5 p-0 rounded'>
						<button
							className='btn btn-light w-100'
							onClick={() => {
								this.handleIncrement();
							}}
						>
							<h2 className='text-center'>+</h2>
						</button>
					</div>
					<div className='col'></div>
				</div>
			</div>
		);
	}
	handleClass = () => {
		return this.state.anzahl === 0
			? this.state.className + ' bg-warning'
			: this.state.className + ' bg-success';
	};
	handleIncrement = () => {
		console.log('Incrementing');

		if (this.state.anzahl < 25) {
			this.setState({ anzahl: this.state.anzahl + 1 });
		}
	};
	handleDecrement = () => {
		if (this.state.anzahl > 0) {
			this.setState({ anzahl: this.state.anzahl - 1 });
		}
	};
}

export default ShoppingList;
