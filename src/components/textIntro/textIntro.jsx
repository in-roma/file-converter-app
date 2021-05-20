import React from 'react';
import './textIntro.scss';

export default function TextIntro() {
	return (
		<div className="textIntro">
			<span>
				This application generates a file for the Isadora Trivia actor.
				You can create up to 9 categories and rename them (28 characters
				maximum). For each category, you can create a maximum of 10
				questions with a maximum of 4 options. The data is stored
				locally and if you wish to start a new trivia, you can do so by
				clicking on the "Reset Trivia" button.
			</span>
		</div>
	);
}
