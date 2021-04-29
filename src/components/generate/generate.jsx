import React from 'react';
import './generate.scss';

// Components

import Button from '../button/button';

export default function Generate() {
	return (
		<div className="generate">
			<div className="generate-total-questions">
				Total of questions: 3
			</div>
			<div className="generate-questions-mode">Select mode</div>
			<div className="generate-button">
				<Button />
			</div>
		</div>
	);
}
