import React from 'react';
import './textIntro.scss';

export default function TextIntro() {
	return (
		<div className="textIntro">
			<span>
				This application generates quizzes in a specific format
				compatible with the LWS Isadora Quizz actor. You can create up
				to 9 categories and rename them (20 characters maximum). For
				each category, you can create a maximum of 10 questions with a
				maximum of 9 options. The data is stored locally and if you wish
				to start a new quiz, you can do so by clicking on the "Reset
				Quizz" button.
			</span>
		</div>
	);
}
