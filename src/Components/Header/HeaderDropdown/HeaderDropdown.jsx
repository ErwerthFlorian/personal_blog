import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Style/HeaderDropdownStyle.css';
const HeaderDropdown = (props) => {
	return (
		<div className='dropdown-button-container'>
			<li
				className='dropdown-button-text  pointer dropdown-button'
				onClick={() => {
					props.reference.current.toggleAttribute('hidden');
				}}
			>
				{props.name}
			</li>
			<ul className='dropdown-list' hidden ref={props.reference}>
				{props.items.map((item) => {
					return (
						<Link
							onClick={() => {
								props.onClick();
								props.reference.current.toggleAttribute('hidden');
							}}
							className='dropdown-item'
							to={item[1]}
						>
							<div>{item[0]}</div>
						</Link>
					);
				})}
			</ul>
		</div>
	);
};

export default HeaderDropdown;
