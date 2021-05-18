import React from 'react';
import './controlQuestions.scss';

// icons
import { ReactComponent as IconAdd } from '../../assets/icons/add-icon.svg';
import { ReactComponent as IconArrowLeft } from '../../assets/icons/arrow-left-icon.svg';
import { ReactComponent as IconArrowRight } from '../../assets/icons/arrow-rigth-icon.svg';

export default function controlQuestions({ addOption, goLeft, goRight }) {
	return (
		<div className="controlFlow">
			<IconArrowLeft className="question-icon" onClick={goLeft} />

			<div className="add-question-field" onClick={addOption}>
				<IconAdd className="addQuestion-addIcon question-icon" />
				<span>Add option</span>
			</div>
			<IconArrowRight className="question-icon" onClick={goRight} />
		</div>
	);
}
