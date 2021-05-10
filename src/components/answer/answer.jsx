import React from 'react';
import './answer.scss';

export default function Answer({ listOptions, onChange, value }) {
	let letteredValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

	return (
		<div className="answer">
			<label>Answer:</label>
			<select value={value} onChange={onChange} name="answer">
				{listOptions.map((el, i) => (
					<option value={letteredValues[i]} key={'options' + i}>
						{letteredValues[i]}
					</option>
				))}
			</select>
		</div>
	);
}
