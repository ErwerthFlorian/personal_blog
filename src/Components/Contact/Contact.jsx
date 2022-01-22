import React, { Component } from 'react';
import emailjs, { init } from 'emailjs-com';
import './Style/contact.css';
import ArticleBackground from '../Core/ArticleBackground/ArticleBackground';

class Contact extends Component {
	state = {
		send: false,
		class: '',
		info: '',
	};
	render() {
		return (
			<ArticleBackground>
				<h2 className='display-6'>Leave me a message.</h2>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						this.receiveMail(e);
					}}
				>
					<input
						type='text'
						className='input-style form-control mt-3 form-input-style'
						id='surname'
						required
					/>
					<div className='label-style'>Surname</div>

					<input
						type='text'
						className='input-style form-control mt-3 form-input-style'
						id='name'
						required
					/>
					<div className='label-style'>Name</div>

					<input
						type='text'
						className='input-style form-control mt-3 form-input-style'
						id='email'
						required
					/>
					<div className='label-style'>E-Mail</div>

					<textarea
						className='input-style form-control text-normal form-input-style mt-3'
						id='email-text'
						rows='3'
						required
					></textarea>
					<div className='label-style'>Message</div>

					<input
						id='submit'
						type='submit'
						className='my-3 btn submit-style'
						value='Send'
					/>
					<div className={this.state.class + ' p-1 mb-3'}>
						{this.state.info}
					</div>
				</form>
			</ArticleBackground>
		);
	}

	receiveMail = (e) => {
		if (document.activeElement.id === 'submit') {
			init('user_Qtko3iZhQxgf4DUOpJx2c');
			var surname = document.getElementById('surname');
			var name = document.getElementById('name');
			var message = document.getElementById('email-text');
			var mail = document.getElementById('email');
			var params = {
				subject: 'Mail from blog',
				name: surname.value + ' ' + name.value,
				mail: mail.value,
				message: message.value,
			};
			if (mail.value === '' && message.value === '') {
				this.setState({
					class: 'alert alert-warning',
					info: 'Please enter a mail address. This way I can write you back.',
				});
				return;
			}
			if (message.value === '') {
				this.setState({
					class: 'alert alert-warning',
					info: 'Please enter a message.',
				});
				return;
			}
			if (mail.value === '') {
				this.setState({
					class: 'alert alert-warning',
					info: 'Please enter a mail address. This way I can write you back.',
				});
				return;
			}
			emailjs
				.send('service_ckvngni', 'template_zfz5yza', params)
				.then((res) => {
					this.setState({ send: true });
					this.changeState(this.state.send);
					e.target.reset();
				})
				// Handle errors here however you like, or use a React error boundary
				.catch((err) => {
					this.setState({ send: false });
					this.changeState(this.state.send);
				});
		} else {
			this.setState({ send: false });
			this.changeState(this.state.send);
		}
	};

	changeState = (state) => {
		return state
			? this.setState({
					class: 'alert alert-success',
					info: 'Message send!',
			  })
			: this.setState({
					class: '',
					info: 'Message not send!',
			  });
	};
}

export default Contact;
