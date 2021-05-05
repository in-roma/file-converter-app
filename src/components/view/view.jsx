import React from 'react';
import './view.scss';

// Components
import Button from '../button/button';

export default function View({ newQuestion }) {
	return (
		<div className="view-bar">
			<span>Category 01 - Question N°1/2</span>
			<div className="view-btn">
				<Button buttonName="New Question" onClick={newQuestion} />
			</div>
		</div>
	);
}
