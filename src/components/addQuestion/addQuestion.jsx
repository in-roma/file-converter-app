import React from 'react';
import './addQuestion.scss';

// icons
import { ReactComponent as IconAdd } from '../../assets/icons/add-icon.svg';
import { ReactComponent as IconArrowLeft } from '../../assets/icons/arrow-left-icon.svg';
import { ReactComponent as IconArrowRight } from '../../assets/icons/arrow-rigth-icon.svg';

export default function AddQuestion() {
	return (
		<div className="controlFlow">
			<IconArrowLeft />

			<div className="add-question-field">
				{/* <h2>QUESTION N°</h2> */}
				<IconAdd className="addQuestion-addIcon" />
				<span>Add solution (up to 9)</span>
			</div>
			<IconArrowRight />
		</div>
	);
}
