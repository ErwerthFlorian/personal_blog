import { useState } from 'react';
import './Style/Message.css';

function Message(props) {
	return (
		<div className='message-body'>
			<div className='message'>
				{props.system ? (
					<div className='system'>{props.text}</div>
				) : (
					<div className={props.own ? 'own' : 'other'}>
						{props.name}: {props.text}
					</div>
				)}
			</div>
		</div>
	);
}

export default Message;
