import './Style/HeaderButtonStyle.css';
import { Link } from 'react-router-dom';
const HeaderButton = (props) => {
	return (
		<li className='header-button pointer'>
			<Link
				className=' header-button-text'
				to={props.to}
				onClick={() => {
					props.onClick();
				}}
			>
				<div>{props.name}</div>
			</Link>
			{props.children}
		</li>
	);
};

export default HeaderButton;
