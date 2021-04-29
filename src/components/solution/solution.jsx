import React from 'react';
import './solution.scss';
import { ReactComponent as IconDelete } from '../../assets/icons/delete-button-icon.svg';

export default function Solution({ solutionNumber }) {
	return (
		<div className="solution">
			<label>Solution {solutionNumber}:</label>
			<input type="text" placeholder="Type your solution here."></input>
			<IconDelete />
		</div>
	);
}
