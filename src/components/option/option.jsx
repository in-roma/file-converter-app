import React from 'react';
import './option.scss';
import { ReactComponent as IconDelete } from '../../assets/icons/delete-button-icon.svg';

export default function Option({
	optionNumber,
	optionValue,
	deleteOption,
	id,
}) {
	return (
		<div className="option" id={id}>
			<label>Option {optionNumber}:</label>
			<input
				type="text"
				value={optionValue}
				placeholder="Type your solution here."
			></input>
			<IconDelete onClick={deleteOption} />
		</div>
	);
}
