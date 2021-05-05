import React from 'react';
import './option.scss';
import { ReactComponent as IconDelete } from '../../assets/icons/delete-button-icon.svg';

export default function Option({
	optionNumber,
	optionValue,
	deleteOption,
	id,
	lastItem,
}) {
	return (
		<div className="option" id={id} lastItem={lastItem}>
			<label>Option {optionNumber}:</label>
			<input
				type="text"
				value={optionValue}
				placeholder="Type your solution here."
			></input>
			{lastItem && <IconDelete onClick={deleteOption} />}
		</div>
	);
}
