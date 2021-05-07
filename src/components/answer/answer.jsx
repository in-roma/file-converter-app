import React from 'react';
import './answer.scss';

export default function Answer({ listOptions, onChange, value }) {
	return (
		<div className="answer">
			<label>Answer:</label>
			<select value={value} onChange={onChange} name="answer">
				{listOptions.map((el, i) => (
					<option value={i + 1} key={'options' + i}>
						{i + 1}
					</option>
				))}
			</select>
		</div>
	);
}
