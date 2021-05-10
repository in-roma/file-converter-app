import React from 'react';
import './option.scss';
import { ReactComponent as IconDelete } from '../../assets/icons/delete-button-icon.svg';

export default function Option({
	optionNumber,
	value,
	deleteOption,
	id,
	lastitem,
	onChange,
}) {
	let letteredValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
	return (
		<div className="option" id={id} lastitem={lastitem}>
			<label>Option {letteredValues[optionNumber - 1]}:</label>
			<input
				type="text"
				value={value}
				placeholder="Type your solution here."
				onChange={onChange}
				name="option"
				id={id}
				autoComplete="off"
			></input>
			{lastitem ? <IconDelete onClick={deleteOption} /> : undefined}
		</div>
	);
}
