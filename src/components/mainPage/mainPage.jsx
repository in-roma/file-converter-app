import React from 'react';
import './createPage.scss';

// Components
import Question from '../question/question';
import Solution from '../solution/solution';
import ControlQuestions from '../controlQuestions/controlQuestions';
import CreateFileControl from '../createFileControl/createFileControl';

export default function CreatePage() {
	return (
		<form className="create-page">
			<Question />
			<Solution />
			<Solution />
			<ControlQuestions />
			<CreateFileControl />
		</form>
	);
}
