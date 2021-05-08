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

// Data initial state
let initialState = [
	{
		id: 0,
		categoryName: 'category1',
		questions: [
			{
				id: 0,
				question: '',
				options: [
					['option1', 1, ''],
					['option2', 2, ''],
					['option3', 3, ''],
					['option4', 4, ''],
				],
				answer: 1,
			},
		],
	},
];

export default function CreatePage() {
	// Category displayed
	const [category, setCategory] = useState(0);
	// Question displayed
	const [questionNumber, setQuestionNumber] = useState(0);

	// Display previous question
	let goLeft = () => {
		if (questionNumber !== 0) {
			setQuestionNumber(questionNumber - 1);
		} else {
			setQuestionNumber(state[category].questions.length - 1);
		}
	};
	// Display next question
	let goRight = () => {
		if (questionNumber < state[category].questions.length - 1) {
			setQuestionNumber(questionNumber + 1);
		} else {
			setQuestionNumber(0);
		}
	};
	// Select Category
	let selectCategory = (event) => {
		let selectValue = event.currentTarget.id;
		console.log('this selectValue: ', selectValue);
		setQuestionNumber(0);
		setCategory(selectValue);
	};

	// Select Question
	let selectQuestion = (event) => {
		let selectValue = event.currentTarget.id;
		console.log('this selectValue: ', selectValue);

		setQuestionNumber(selectValue - 1);
	};

	// Data state actions
	// Dispatching actions
	const [state, dispatch] = useReducer(optionReducer, initialState);

	function optionReducer(state, action) {
		console.log('this is action payload:', action.payload);
		switch (action.type) {
			case 'addCategory':
				if (state.length < 9) {
					setCategory(state.length);
					setQuestionNumber(0);

					let newCategory = produce(state, (draft) => {
						draft.push({
							id: parseInt(state.length),
							categoryName: `category${
								parseInt(state.length) + 1
							}`,
							questions: [
								{
									id: 0,
									question: '',
									options: [
										['option1', 1, ''],
										['option2', 2, ''],
										['option3', 3, ''],
										['option4', 4, ''],
									],
									answer: 1,
								},
							],
						});
					});
					return newCategory;
				} else {
					return state;
				}
			case 'renameCategory':
			case 'deleteCategory':
				if (state.length > 1) {
					let deleteCategory = produce(state, (draft) => {
						draft.filter(
							(el) => parseInt(el.id) !== parseInt(category)
						);
						setQuestionNumber(0);
						setCategory(parseInt(state.length - 1));
					});

					return deleteCategory;
				} else {
					return state;
				}

			case 'handleChange':
				let value = action.payload.value;
				let name = action.payload.name;
				let id = action.payload.id;

				return produce(state, (draft) => {
					if (name === 'question') {
						draft[category].questions[
							questionNumber
						].question = value;
					}
					if (name === 'option') {
						draft[category].questions[questionNumber].options[
							parseInt(id.slice(-1) - 1)
						][2] = value;
					}
					if (name === 'answer') {
						draft[category].questions[
							questionNumber
						].answer = value;
					}
				});
			case 'addOption':
				console.log('add option before');
				if (
					state[category].questions[questionNumber].options.length < 9
				) {
					let newOption = produce(state, (draft) => {
						draft[category].questions[questionNumber].options.push([
							`option${
								state[category].questions[questionNumber]
									.options.length + 1
							}`,
							state[category].questions[questionNumber].options
								.length + 1,
							'',
						]);
					});
					return newOption;
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
				console.log('add question before');
				if (state[category].questions.length < 9) {
					setQuestionNumber(state[category].questions.length);
					console.log('questionNumber is now:', questionNumber);
					let newQuestion = produce(state, (draft) => {
						draft[category].questions.push({
							id: parseInt(state[category].questions.length),
							question: '',
							options: [
								['option1', 1, ''],
								['option2', 2, ''],
								['option3', 3, ''],
								['option4', 4, ''],
							],
							answer: 1,
						});
					});
					console.log('add question after');
					return newQuestion;
				} else {
					return state;
				}
			case 'deleteQuestion':
				if (state[category].questions.length > 1) {
					let id = action.payload.id;

					let deleteQuestion = produce(state, (draft) => {
						draft[category].questions = draft[
							category
						].questions.filter(
							(el) => parseInt(el.id) !== parseInt(id)
						);
					});
					setQuestionNumber(0);
					return deleteQuestion;
				} else {
					return state;
				}

			default:
				return state;
		}
	}
	console.log(state);
	return (
		<form className="create-page">
			<ControlCategories
				addCategory={() => dispatch({ type: 'addCategory' })}
				category={category}
				categories={state}
				selectCategory={selectCategory}
			/>
			<View
				category={category}
				questionNumber={questionNumber}
				questionNumberTotal={state[category].questions.length}
				newQuestion={() => dispatch({ type: 'addQuestion' })}
				questions={state[category].questions}
				selectQuestion={selectQuestion}
				renameCategory={() => dispatch({ type: 'renameCategory' })}
				deleteCategory={() => dispatch({ type: 'deleteCategory' })}
			/>

			<Question
				onChange={(event) =>
					dispatch({
						type: 'handleChange',
						payload: event.target,
					})
				}
				deleteQuestion={(event) =>
					dispatch({
						type: 'deleteQuestion',
						payload: event.target,
					})
				}
				value={state[category].questions[questionNumber].question}
				id={state[category].questions[questionNumber].id}
			/>
			{state[category].questions[questionNumber].options.map((el) => (
				<Option
					id={el[0]}
					key={el[0]}
					optionNumber={el[1]}
					value={el[2]}
					onChange={(event) =>
						dispatch({
							type: 'handleChange',
							payload: event.target,
						})
					}
					deleteOption={(event) =>
						dispatch({
							type: 'deleteOption',
							payload: event.currentTarget.parentNode.id,
						})
					}
					lastitem={
						state[category].questions[questionNumber].options
							.length === el[1]
					}
				/>
			))}
			<Answer
				listOptions={state[category].questions[questionNumber].options}
				value={state[category].questions[questionNumber].answer}
				onChange={(event) =>
					dispatch({
						type: 'handleChange',
						payload: event.target,
					})
				}
			/>

			<ControlQuestions
				addOption={() => dispatch({ type: 'addOption' })}
				goRight={goRight}
				goLeft={goLeft}
			/>
			<ControlCreate totalCategory={state.length} />
		</form>
	);
}
