import React from 'react';
import './controlQuestions.scss';

// icons
import { ReactComponent as IconAdd } from '../../assets/icons/add-icon.svg';
import { ReactComponent as IconArrowLeft } from '../../assets/icons/arrow-left-icon.svg';
import { ReactComponent as IconArrowRight } from '../../assets/icons/arrow-rigth-icon.svg';

export default function controlQuestions() {
	return (
		<div className="controlFlow">
			<IconArrowLeft />

			<div className="add-question-field">
				<IconAdd className="addQuestion-addIcon" />
				<span>Add solution</span>
			</div>
			<IconArrowRight />
		</div>
	);
}
