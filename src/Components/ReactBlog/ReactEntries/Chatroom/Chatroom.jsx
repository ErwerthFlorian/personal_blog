import Message from './Components/Message/Message';
import Chatter from './Components/Chatter/Chatter';
import './Style/Chatroom.css';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
var socket = null;
const Chatroom = () => {
	const [name, setName] = useState(undefined);
	const [chatters, setChatters] = useState([]);
	const [messages, setMessages] = useState([]);
	const [connected, setConnected] = useState(undefined);

	useEffect(() => {
		socket = io.connect('https://florianerwerth.blog:3001');
		socket.on('connected', () => {
			setConnected(true);
		});
		socket.on('login', (users) => {
			addMessage({
				text: users[users.length - 1].name + ' entered the chat!',
				system: true,
				own: false,
			});
			setChatters(users);
		});

		socket.on('receive-message', (user) => {
			addMessage(user);
		});

		socket.on('user-disconnect', (users) => {
			setChatters(users);
		});
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (document.getElementById('chat-input').value != '') {
			socket.emit('send-message', {
				name: name,
				text: document.getElementById('chat-input').value,
				socketID: socket.id,
			});
		}
		document.getElementById('chat-input').value = '';
	};

	const addChatter = (newName) => {
		setChatters((chatters) => [...chatters, newName]);
	};

	const addMessage = (container) => {
		setMessages((messages) => [
			...messages,
			<Message
				text={container.text}
				name={container.name}
				own={container.socketID == socket.id}
				system={container.system}
			/>,
		]);
	};

	const handleNameChange = (e) => {
		e.preventDefault();
		var inputName = document.getElementById('login-input').value;
		if (inputName !== '' && inputName != undefined && !/\s/.test(inputName)) {
			socket.emit('attempt_login', { name: inputName });
			setName(inputName);
			addChatter(inputName);
		}
	};

	return (
		<div className='chatroom-container'>
			{name == undefined ? null : (
				<div>
					<div className='chat-container'>
						<div className='chat'>
							{messages.map((message) => {
								return message;
							})}
						</div>
					</div>
					<div className='users-container'>
						<div className='users-inner-container'>
							<div className='users-title'>Connected chatters</div>
							{chatters.map((chatter) => (
								<Chatter name={chatter.name} socketID={chatter.socketID} />
							))}
						</div>
					</div>
					<div className='chat-input-container'>
						<form
							className='chat-input'
							onSubmit={(e) => {
								handleSubmit(e);
							}}
						>
							<input
								className='chat-input-input'
								style={{ width: '100%' }}
								id='chat-input'
								type='text'
								placeholder='Enter message...'
								autoComplete='off'
							/>
						</form>

						<div
							className='chat-input-button'
							onClick={(e) => {
								handleSubmit(e);
							}}
						>
							Send
						</div>
					</div>
				</div>
			)}
			{name == undefined ? (
				<div className='login-container'>
					<div className='login-caption'>CHAT</div>
					<div className='login-wrapper'>
						<div className='login-name'>Name: </div>
						<input
							autoComplete='off'
							id='login-input'
							className='login-input'
							type='text'
							placeholder='Enter name...'
						/>
					</div>
					<div onClick={handleNameChange} className='login-button'>
						Start Chatting!
					</div>
					{connected ? (
						<div className='login-connection-message-connected login-connection-message'>
							Connected to the service.
						</div>
					) : (
						<div className='login-connection-message-disconnected login-connection-message'>
							Not connected to the service.
						</div>
					)}
				</div>
			) : null}
		</div>
	);
};
export default Chatroom;
