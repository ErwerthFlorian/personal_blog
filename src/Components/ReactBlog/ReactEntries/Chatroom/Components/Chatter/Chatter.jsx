import './Style/Chatter.css';
function Chatter(props) {
	return (
		<div className='chatter-container'>
			<div className='chatter'>{props.name}</div>
		</div>
	);
}

export default Chatter;
