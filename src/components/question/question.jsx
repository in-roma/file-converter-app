import React from 'react';
import './question.scss';

export default function Question({ valueQuestion }) {
	return (
		<div className="question" name="question">
			<label>Question:</label>
			<input
				type="text"
				value={valueQuestion}
				placeholder="Type your question here."
			></input>
		</div>
	);
}
