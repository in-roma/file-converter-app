import React from 'react';
import './button.scss';

export default function Button({ buttonName, onClick }) {
	return (
		<div className="button" onClick={onClick}>
			{buttonName}
		</div>
	);
}
