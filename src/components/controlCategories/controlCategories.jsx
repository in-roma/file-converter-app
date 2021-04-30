import React from 'react';
import './controlCategories.scss';

//Components
import { ReactComponent as IconDelete } from '../../assets/icons/delete-button-icon.svg';
import Button from '../button/button';

export default function ControlCategories() {
	return (
		<div className="controlCategories-bar">
			<Button buttonName="Create Category" />
			<div className="category">
				<span>Category 01 </span>
				<IconDelete />
			</div>
			<div className="category">
				<span>Category 02 </span>
				<IconDelete />
			</div>
			<div className="category">
				<span>Category 03 </span> <IconDelete />
			</div>
		</div>
	);
}
