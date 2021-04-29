import React from 'react';
import './answer.scss';

export default function Answer() {
	return (
		<div className="answer">
			<label>Answer:</label>
			<select>
				<option>Solution 1</option>
				<option>Solution 2</option>
			</select>
		</div>
	);
}
