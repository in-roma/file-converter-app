import React from 'react';
import './question.scss';

export default function Question({ value, onChange }) {
	return (
		<div className="question">
			<label>Question:</label>
			<input
				onChange={onChange}
				type="text"
				value={value}
				placeholder="Type your question here."
				name="question"
			></input>
		</div>
	);
}
