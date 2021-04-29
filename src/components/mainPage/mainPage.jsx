import React from 'react';
import './createPage.scss';

// Components
import ControlCategories from '../controlCategories/controlCategories';
import View from '../view/view';
import Question from '../question/question';
import Solution from '../solution/solution';
import Answer from '../answer/answer';
import ControlQuestions from '../controlQuestions/controlQuestions';
import CreateFileControl from '../createFileControl/createFileControl';

export default function CreatePage() {
	return (
		<form className="create-page">
			<ControlCategories />
			<View />
			<Question />
			<Solution solutionNumber="1" />
			<Solution solutionNumber="2" />
			<Answer />
			<ControlQuestions />
			<CreateFileControl />
		</form>
	);
}
