import React from 'react';
import './controlCreate.scss';

// Components

import Button from '../button/button';

export default function ControlCreate() {
	return (
		<div className="createFile-control">
			<div className="createFile-control-counts">
				<span>Total of Categories: 3</span>
				<span>Total of questions: 3</span>
			</div>
			<div className="createFile-control-button">
				<div className="createFile-control-questions-mode">
					<select>
						<option>List View</option>
						<option>Numbered</option>
						<option>Lettered</option>
					</select>
				</div>
				<Button buttonName="Generate File" />
			</div>
		</div>
	);
}
