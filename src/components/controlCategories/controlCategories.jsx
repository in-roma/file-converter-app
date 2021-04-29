import React from 'react';
import './controlCategories.scss';

//Components

import Button from '../button/button';

export default function ControlCategories() {
	return (
		<div className="controlCategories-bar">
			<Button buttonName="Create Category" />
			<span>Category 01</span>
			<span>Category 02</span>
			<span>Category 03</span>
		</div>
	);
}
