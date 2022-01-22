import React from 'react';
import './Style/EntriesStyle.css';

const Entries = (props) => {
	return <div className='entries-container'>{props.children}</div>;
};

export default Entries;
