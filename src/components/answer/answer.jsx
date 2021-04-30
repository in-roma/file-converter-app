import React from 'react';
import './answer.scss';

export default function Answer({ listOptions }) {
	return (
		<div className="answer">
			<label>Answer:</label>
			<select>
				{listOptions.map((el, i) => (
					<option key={'options' + i}>{i + 1}</option>
				))}
			</select>
		</div>
	);
}
