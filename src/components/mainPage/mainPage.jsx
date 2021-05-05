import React, { useReducer, useState } from 'react';
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
	let initialState = [
		{
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
		},
	];
	// Category displayed
	const [category, setCategory] = useState(0);
	// Question displayed
	const [questionNumber, setQuestionNumber] = useState(0);
	// Dispatching actions
	const [state, dispatch] = useReducer(optionReducer, initialState);

	// Display previous question
	let goLeft = () => {
		if (questionNumber !== 0) {
			setQuestionNumber(questionNumber - 1);
		} else {
			setQuestionNumber(state[category].questions.length);
		}
	};
	// Display next question
	let goRight = () => {
		if (questionNumber < state[category].questions.length) {
			setQuestionNumber(questionNumber + 1);
		} else {
			setQuestionNumber(0);
		}
	};

	function optionReducer(state, action) {
		console.log('this is action payload:', action.payload);
		switch (action.type) {
			case 'addOption':
				if (
					state[category].questions[questionNumber].options.length < 9
				) {
					let newOptions = produce(state, (draft) => {
						draft[0].questions[questionNumber].options.push([
							`option${
								state[category].questions[questionNumber]
									.options.length + 1
							}`,
							state[category].questions[questionNumber].options
								.length + 1,
							'',
						]);
					});
					return newOptions;
				} else {
					return state;
				}
			case 'deleteOption':
				if (
					state[category].questions[questionNumber].options.length > 2
				) {
					let deleteOptions = produce(state, (draft) => {
						draft[category].questions[
							questionNumber
						].options = draft[category].questions[
							questionNumber
						].options.filter((el) => el[0] !== action.payload);
					});
					return deleteOptions;
				} else {
					return state;
				}
			case 'addQuestion':
				if (state[category].questions.length < 9) {
					setQuestionNumber(state[category].questions.length + 1);

					let newQuestion = produce(state, (draft) => {
						draft[category].questions.push({
							id: state[category].questions.length,
							question: '',
							options: [
								['option1', 1, ''],
								['option2', 2, ''],
								['option3', 3, ''],
								['option4', 4, ''],
							],
							answer: 4,
						});
					});
					console.log('this is state:', state);
					return newQuestion;
				}

			default:
				return state;
		}
	}

	return (
		<form className="create-page">
			<ControlCategories />
			<View
				category={category}
				questionNumber={questionNumber}
				questionNumberTotal={state[category].questions.length}
				newQuestion={() => dispatch({ type: 'addQuestion' })}
			/>
			<Question
				valueQuestion={
					state[category].questions[questionNumber].question
				}
			/>
			{state[0].questions[questionNumber].options.map((el) => (
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
					lastItem={
						state[category].questions[questionNumber].options
							.length === el[1]
					}
				/>
			))}
			<Answer
				listOptions={state[category].questions[questionNumber].options}
			/>
			<ControlQuestions
				addOption={() => dispatch({ type: 'addOption' })}
				goRight={goRight}
				goLeft={goLeft}
			/>
			<ControlCreate />
		</form>
	);
}
