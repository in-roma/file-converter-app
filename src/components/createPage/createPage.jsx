import React from 'react';
import './createPage.scss';

// Components
import Question from '../question/question';
import Solution from '../solution/solution';
import AddQuestion from '../addQuestion/addQuestion';
import Generate from '../generate/generate';

export default function CreatePage() {
	return (
		<form className="create-page">
			<Question />
			<Solution />
			<Solution />
			<AddQuestion />
			<Generate />
		</form>
	);
}
