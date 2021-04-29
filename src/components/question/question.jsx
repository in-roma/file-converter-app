import React from 'react';
import './question.scss';

export default function Question() {
	return (
		<div className="question">
			<label>Question:</label>
			<input type="text" placeholder="Type your question here."></input>
		</div>
	);
}
