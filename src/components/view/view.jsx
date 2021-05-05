import React from 'react';
import './view.scss';

// Components
import Button from '../button/button';

export default function View({
	category,
	questionNumber,
	questionNumberTotal,
	newQuestion,
}) {
	return (
		<div className="view-bar">
			<span>
				Category {category + 1} - Question N°{questionNumber + 1}/
				{questionNumberTotal}
			</span>
			<div className="view-btn">
				<Button buttonName="New Question" onClick={newQuestion} />
			</div>
		</div>
	);
}
