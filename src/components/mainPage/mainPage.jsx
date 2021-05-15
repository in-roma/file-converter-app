import React, { useReducer, useState, useEffect } from 'react';
import produce from 'immer';

// Stylesheet
import './createPage.scss';

// Components
import Category from '../category/category';
import Button from '../button/button';
import View from '../view/view';
import Question from '../question/question';
import Option from '../option/option';
import Answer from '../answer/answer';
import ControlQuestions from '../controlQuestions/controlQuestions';
import ControlCreate from '../controlCreate/controlCreate';
import RenameWindow from '../renameWindow/renameWindow';
import ConfirmationWindow from '../confirmationWindow/confirmationWindow';

// Data initial state
let newQuizz = [
	{
		id: 0,
		categoryName: 'Category 1',
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
				answer: 'A',
			},
		],
	},
];

let lValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

export default function CreatePage() {
	// Category displayed
	const [category, setCategory] = useState(0);

	// Question displayed
	const [questionNumber, setQuestionNumber] = useState(0);

	// Rename window
	const [renameWindow, setRenameWindow] = useState(false);
	let openWindow = () => {
		setRenameWindow(true);
	};
	let closeWindow = () => {
		setRenameWindow(false);
	};
	const [renameValue, setRenameValue] = useState('');

	let renamingCategory = (event) => {
		let renamingValue = event.target.value;
		console.log(renamingValue);
		setRenameValue(renamingValue);
	};
	// Confirmation window
	const [confirmationWindow, setConfirmationWindow] = useState(false);
	const [confirmationMessage, setConfirmationMessage] = useState('');
	const [btnLabel, setBtnLabel] = useState('');
	const [deleteType, setDeleteType] = useState('');

	let closeConfirmationWindow = () => {
		setConfirmationWindow(false);
	};

	let deleteElement = () => {
		if (deleteType === 'quizz') {
			setQuestionNumber(0);
			setCategory(0);
			setConfirmationWindow(false);
			return dispatch({ type: 'resetQuizz' });
		}
		if (deleteType === 'category') {
			setQuestionNumber(0);
			setCategory(0);
			setConfirmationWindow(false);
			return dispatch({ type: 'deleteCategory' });
		}
	};
	let deleteCategory = () => {
		setConfirmationWindow(true);
		setBtnLabel('Delete');
		setConfirmationMessage(
			`Are you sure to want to delete ${state[category].categoryName}?`
		);
		setDeleteType('category');
	};

	let resetQuizz = () => {
		setConfirmationWindow(true);
		setBtnLabel('Reset');
		setConfirmationMessage(`Are you sure to want to reset the quizz?`);
		setDeleteType('quizz');
	};

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
		setCategory(parseInt(selectValue));
		console.log('this category while select: ', category);
	};

	// Select Question
	let selectQuestion = (event) => {
		let selectValue = event.currentTarget.id;
		console.log('this selectValue ID: ', parseInt(selectValue));

		setQuestionNumber(parseInt(selectValue) - 1);
	};

	// Data state actions
	// Dispatching actions

	// Quizz local staorage
	let quizzSaved = localStorage.getItem('Quizz Isadora') === 'true';
	let initialState = quizzSaved
		? localStorage.getItem('Quizz Isadora')
		: newQuizz;

	const [state, dispatch] = useReducer(optionReducer, initialState);

	function optionReducer(state, action) {
		console.log('this is action payload:', action.payload);
		switch (action.type) {
			case 'addCategory':
				if (state.length < 9) {
					// setRenameWindow(true);
					setCategory(parseInt(state.length));
					setQuestionNumber(0);

					let newCategory = produce(state, (draft) => {
						draft.push({
							id: parseInt(state.length),
							categoryName: `Category ${
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
									answer: 'A',
								},
							],
						});
					});

					return newCategory;
				} else {
					return state;
				}
			case 'renameCategory':
				return produce(state, (draft) => {
					draft[category].categoryName = renameValue;
					setRenameWindow(false);
					setRenameValue('');
				});

			case 'deleteCategory':
				console.log('this category before deleting: ', category);
				if (state.length > 1) {
					let categoryDeleted = parseInt(category);

					let deleting = () => {
						return produce(state, (draft) => {
							return draft.filter(function (el) {
								return el.id !== categoryDeleted;
							});
						});
					};

					let setNewIds = () => {
						return produce(state, (draft) => {
							return draft.forEach(function (el, i) {
								el.id = i;
							});
						});
					};

					state = deleting();
					state = setNewIds();
					setCategory(parseInt(state.length) - 1);

					setQuestionNumber(0);

					return state;
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
					let questionDeleted = parseInt(questionNumber);

					console.log(
						'this is questionDeleted selection:',
						questionDeleted
					);
					let deleting = () => {
						return produce(state, (draft) => {
							draft[category].questions = draft[
								category
							].questions.filter(function (el, i) {
								return el.id !== questionDeleted;
							});
						});
					};

					let setNewIds = () => {
						return produce(state, (draft) => {
							return draft[category].questions.forEach(function (
								el,
								i
							) {
								el.id = i;
							});
						});
					};

					state = deleting();
					state = setNewIds();
					setQuestionNumber(
						parseInt(state[category].questions.length) - 1
					);

					return state;
				} else {
					return state;
				}
			case 'resetQuizz':
				return produce(state, (draft) => {
					return (draft = newQuizz);
				});

			default:
				return state;
		}
	}

	// Generate file
	const [downloadLink, setDownloadLink] = useState('');
	let generateFile = () => {
		let formatingData = [];
		state.map(function (el) {
			let newStructure =
				el.categoryName +
				'\n' +
				el.questions.map(function (sub, i2) {
					return (
						i2 +
						1 +
						'. ' +
						sub.question +
						'Answer ' +
						sub.options.map(function (i3) {
							return lValues[i3] + ', ';
						}) +
						sub.options.map(function (el, i4) {
							return lValues[i4] + ')  ' + el[2] + '	';
						}) +
						'Answer: ' +
						sub.answer +
						') ' +
						sub.options[lValues.indexOf(sub.answer)][2]
					);
				}) +
				'\n';
			formatingData.push(newStructure);
		});
		console.log('this formatted data', formatingData);
		let data = new Blob([formatingData], {
			type: 'text/plain;charset=utf-8',
		});
		if (downloadLink !== '') {
			window.URL.revokeObjectURL(downloadLink);
		}
		setDownloadLink(window.URL.createObjectURL(data));
	};
	useEffect(() => {
		if (state.length - 1 === category) {
			setCategory(parseInt(state.length) - 1);
		}
		if (state[category].questions.length === questionNumber) {
			setQuestionNumber(parseInt(state[category].questions.length) - 1);
		}
	}, [category, questionNumber]);

	// Saving quizz locally
	localStorage.setItem('Quizz Isadora', state);

	console.log('this category before rendering: ', category);
	console.log(state);
	return (
		<form className="create-page">
			<div className="controlCategories-bar">
				{state.map((el) => (
					<Category
						selectCategory={selectCategory}
						id={el.id}
						category={category}
						categoryName={el.categoryName}
						key={`category${el.id}`}
					/>
				))}
				<Button
					buttonName="Create Category"
					onClick={() => dispatch({ type: 'addCategory' })}
				/>
			</div>

			<View
				state={state}
				category={category}
				questionNumber={questionNumber}
				questionNumberTotal={state[category].questions.length}
				newQuestion={() => dispatch({ type: 'addQuestion' })}
				questions={state[category].questions}
				selectQuestion={selectQuestion}
				renameCategory={openWindow}
				deleteCategory={deleteCategory}
			></View>

			{renameWindow && (
				<RenameWindow
					key={state[category].categoryName + 'window'}
					categoryName={state[category].categoryName}
					value={renameValue}
					onChange={renamingCategory}
					closeWindow={closeWindow}
					renameCategory={() => dispatch({ type: 'renameCategory' })}
				/>
			)}
			{confirmationWindow && (
				<ConfirmationWindow
					message={confirmationMessage}
					deleteElement={deleteElement}
					closeWindow={closeConfirmationWindow}
					btnLabel={btnLabel}
				/>
			)}

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
			<ControlCreate
				totalCategory={state.length}
				generateFile={generateFile}
				href={downloadLink}
				resetQuizz={resetQuizz}
			/>
		</form>
	);
}
