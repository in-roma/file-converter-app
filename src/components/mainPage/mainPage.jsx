import React, { useReducer, useEffect } from 'react';
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
					['option1', 1, ''],
					['option2', 2, ''],
					['option3', 3, ''],
					['option4', 4, ''],
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
					let newOptions = produce(state, (draft) => {
						draft.questions[0].options.push([
							`option${state.questions[0].options.length + 1}`,
							state.questions[0].options.length + 1,
							'',
						]);
					});
					return newOptions;
				} else {
					return state;
				}
			case 'deleteOption':
				if (state.questions[0].options.length > 2) {
					let deleteOptions = produce(state, (draft) => {
						draft.questions[0].options = draft.questions[0].options.filter(
							(el) => el[0] !== action.payload
						);
					});

					return deleteOptions;
				} else {
					return state;
				}
			default:
				return state;
		}
	}

	const [state, dispatch] = useReducer(optionReducer, initialState);
	useEffect(() => {}, []);

	return (
		<form className="create-page">
			<ControlCategories />
			<View />
			<Question valueQuestion={state.questions[0].question} />
			{state.questions[0].options.map((el) => (
				<Option
					id={el[0]}
					key={el[1]}
					optionNumber={el[1]}
					optionValue={el[2]}
					deleteOption={(event) =>
						dispatch({
							type: 'deleteOption',
							payload: event.currentTarget.parentNode.id,
						})
					}
					lastItem={state.questions[0].options.length === el[1]}
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
