import React from 'react';
import { ReactComponent as IconAdd } from '../../assets/icons/add-icon.svg';
import './addQuestion.scss';

export default function AddQuestion() {
	return (
		<div className="add-question-field">
			<IconAdd />
			<span>Add solution (up to 9)</span>
		</div>
	);
}
