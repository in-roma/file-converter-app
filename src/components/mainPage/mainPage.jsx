import React, { useReducer } from 'react';
import produce from 'immer';

// Stylesheet
import './createPage.scss';

// Components
import ControlCategories from '../controlCategories/controlCategories';
import View from '../view/view';
import Question from '../question/question';
import Option from '../option/option';
import Answer from '../answer/answer';
import ControlQuestions from '../controlQuestions/controlQuestions';
import ControlCreate from '../controlCreate/controlCreate';

export default function CreatePage() {
	let initialState = {
		id: 1,
		categoryName: 'category1',
		questions: [
			{
				id: 1,
				question: '',
				options: [
					['option0', ''],
					['option1', ''],
					['option2', ''],
					['option3', ''],
				],
				answer: 4,
			},
		],
	};
	function optionReducer(state, action) {
		console.log('this is action payload:', action.payload);
		switch (action.type) {
			case 'addOption':
				if (state.questions[0].options.length < 9) {
					return produce(state, (draft) => {
						draft.questions[0].options.push([
							`option${state.questions[0].options.length - 1}`,
							'',
						]);
					});
				} else {
					return state;
				}
			case 'deleteOption':
				if (state.questions[0].options.length > 2) {
					return produce(state, (draft) => {
						draft.questions[0].options.filter(
							(el) => el[0] !== action.payload
						);
					});
				}
			default:
				return state;
		}
	}

	const [state, dispatch] = useReducer(optionReducer, initialState);

	// Add new Option

	return (
		<form className="create-page">
			<ControlCategories />

			<Question valueQuestion={state.questions[0].question} />
			{state.questions[0].options.map((el, i) => (
				<Option
					id={'option' + i}
					key={'option' + i}
					optionNumber={i + 1}
					optionValue={el[1]}
					deleteOption={(event) =>
						dispatch({
							type: 'deleteOption',
							payload: event.currentTarget.parentNode.id,
						})
					}
				/>
			))}
			<Answer listOptions={state.questions[0].options} />
			<ControlQuestions
				addOption={() => dispatch({ type: 'addOption' })}
			/>
			<ControlCreate />
		</form>
	);
}
