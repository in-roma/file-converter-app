import React from 'react';
import './option.scss';
import { ReactComponent as IconDelete } from '../../assets/icons/delete-button-icon.svg';

export default function Option({
	optionNumber,
	optionValue,
	deleteOption,
	id,
	lastitem,
	onChange,
}) {
	return (
		<div className="option" id={id} lastitem={lastitem}>
			<label>Option {optionNumber}:</label>
			<input
				type="text"
				value={optionValue}
				placeholder="Type your solution here."
				onChange={onChange}
				name="option"
				id={id}
			></input>
			{lastitem && <IconDelete onClick={deleteOption} />}
		</div>
	);
}
