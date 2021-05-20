import React, { useReducer, useState, useEffect } from 'react';
import produce from 'immer';

// Stylesheet
import './mainPage.scss';

// Components
import TextIntro from '../textIntro/textIntro';
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
		edited: false,
		id: 0,
		categoryName: 'Category 1',
		questions: [
			{
				id: 0,
				question: '',
				options: ['', '', '', ''],
				answer: 'A',
			},
		],
	},
];

let lValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
let convertedData;

export default function CreatePage() {
	// Display textIntro
	const [textDisplay, setTextDisplay] = useState(false);
	const [textBtnLabel, setTextBtnLabel] = useState('More Info');

	let showHideText = () => {
		if (textDisplay === true) {
			setTextDisplay(false);
			setTextBtnLabel('More info');
		} else {
			setTextDisplay(true);
			setTextBtnLabel('Close info');
		}
	};

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

	// Delete category or reset quizz
	let resetQuizz = () => {
		setConfirmationWindow(true);
		setBtnLabel('Reset');
		setConfirmationMessage(`Are you sure to want to reset the trivia?`);
		setDeleteType('quizz');
	};

	let deleteCategory = () => {
		setConfirmationWindow(true);
		setBtnLabel('Delete');
		setConfirmationMessage(
			`Are you sure to want to delete ${state[category].categoryName}?`
		);
		setDeleteType('category');
	};

	let deleteQuestion = () => {
		setConfirmationWindow(true);
		setBtnLabel('Delete');
		setConfirmationMessage(
			`Are you sure to want to delete question ${questionNumber + 1}?`
		);
		setDeleteType('question');
	};

	let deleteElement = () => {
		if (deleteType === 'quizz') {
			setConfirmationWindow(false);
			setCategory(0);
			setQuestionNumber(0);
			return dispatch({ type: 'resetQuizz' });
		}
		if (deleteType === 'category') {
			let categoryToDelete = category;
			setConfirmationWindow(false);
			setQuestionNumber(0);
			if (categoryToDelete > 1) {
				setCategory(categoryToDelete - 1);
			} else {
				setCategory(0);
			}
			return dispatch({
				type: 'deleteCategory',
				payload: categoryToDelete,
			});
		}
		if (deleteType === 'question') {
			let questionToDelete = questionNumber;
			setConfirmationWindow(false);
			setQuestionNumber(0);
			if (questionToDelete > 1) {
				setQuestionNumber(questionToDelete - 1);
			} else {
				setQuestionNumber(0);
			}
			return dispatch({
				type: 'deleteQuestion',
				payload: questionToDelete,
			});
		}
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

	// Quizz state & local storage
	let quizzSaved = JSON.parse(localStorage.getItem('Quizz Isadora'));
	let initialState =
		quizzSaved && quizzSaved[0].edited === true
			? JSON.parse(localStorage.getItem('Quizz Isadora'))
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
									options: ['', '', '', ''],
									answer: 'A',
								},
							],
						});
						draft[0].edited = true;
					});

					return newCategory;
				} else {
					return state;
				}
			case 'renameCategory':
				return produce(state, (draft) => {
					draft[category].categoryName = renameValue;
					draft[0].edited = true;
					setRenameWindow(false);
					setRenameValue('');
				});

			case 'deleteCategory':
				console.log('this category before deleting: ', category);
				if (state.length > 1) {
					let categoryDeleted = action.payload;

					let deleting = () => {
						return produce(state, (draft) => {
							draft[0].edited = true;
							return draft.filter(function (el) {
								return el.id !== categoryDeleted;
							});
						});
					};

					let setNewIds = () => {
						return produce(state, (draft) => {
							draft[0].edited = true;
							return draft.forEach(function (el, i) {
								el.id = i;
							});
						});
					};

					state = deleting();
					state = setNewIds();

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
						draft[0].edited = true;
					}
					if (name === 'option') {
						draft[category].questions[questionNumber].options[
							parseInt(id)
						] = value;
						draft[0].edited = true;
					}
					if (name === 'answer') {
						draft[category].questions[
							questionNumber
						].answer = value;
						draft[0].edited = true;
					}
				});
			case 'addOption':
				console.log('add option before');
				if (
					state[category].questions[questionNumber].options.length < 4
				) {
					let newOption = produce(state, (draft) => {
						draft[category].questions[questionNumber].options.push(
							''
						);
						draft[0].edited = true;
					});

					return newOption;
				} else {
					return state;
				}
			case 'deleteOption':
				console.log(
					'this delete action Payload',
					parseInt(action.payload)
				);
				if (
					state[category].questions[questionNumber].options.length > 2
				) {
					let deleteOptions = produce(state, (draft) => {
						draft[category].questions[
							questionNumber
						].options = draft[category].questions[
							questionNumber
						].options.filter(
							(el, i) => i !== parseInt(action.payload)
						);
						draft[0].edited = true;
					});

					return deleteOptions;
				} else {
					return state;
				}
			case 'addQuestion':
				console.log('add question before');
				if (state[category].questions.length < 10) {
					setQuestionNumber(state[category].questions.length);
					console.log('questionNumber is now:', questionNumber);
					let newQuestion = produce(state, (draft) => {
						draft[category].questions.push({
							id: parseInt(state[category].questions.length),
							question: '',
							options: ['', '', '', ''],
							answer: 1,
						});
						draft[0].edited = true;
					});
					console.log('add question after');

					return newQuestion;
				} else {
					return state;
				}
			case 'deleteQuestion':
				if (state[category].questions.length > 1) {
					let questionDeleted = action.payload;

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
							draft[0].edited = true;
						});
					};

					let setNewIds = () => {
						return produce(state, (draft) => {
							draft[0].edited = true;
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
		state.forEach(function (el) {
			let newStructure =
				el.categoryName +
				'\n' +
				el.questions.map(function (el2, i2) {
					return (
						i2 +
						1 +
						'. ' +
						el2.question +
						' ' +
						'Answer' +
						el2.options.map(function (el3, i3, arr) {
							let answerSuite = [];

							if (i3 < arr.length - 1) {
								answerSuite.push(` ${lValues[i3]}`);
							}
							if (i3 === arr.length - 1) {
								answerSuite.push(` or ${lValues[i3]}\t`);
							}

							return answerSuite.join();
						}) +
						el2.options.map(function (el4, i4, arr4) {
							if (i4 < arr4.length - 1) {
								return lValues[i4] + ') ' + arr4[i4] + '\t';
							}
							if (arr4.length === 2 && i4 >= 1) {
								return `\t--\t--\t`;
							}
							if (arr4.length === 3 && i4 >= 2) {
								return `\t--\t`;
							}
						}) +
						'Answer: ' +
						el2.answer +
						') ' +
						el2.options[lValues.indexOf(el2.answer)] +
						'\n'
					);
				}) +
				'\n';
			formatingData.push(newStructure.replace(/(\t)(,)/g, '$1'));
			convertedData = formatingData.join().replace(/(\n)(,)/gm, '$1');
		});
		console.log('this formatted data', formatingData);
		let data = new Blob([convertedData], {
			type: 'text/plain;charset=utf-8',
		});
		if (downloadLink !== '') {
			window.URL.revokeObjectURL(downloadLink);
		}
		setDownloadLink(window.URL.createObjectURL(data));
	};
	useEffect(() => {
		if (parseInt(state.length) === category) {
			setCategory(0);
		}
		if (parseInt(state[category].questions.length) === questionNumber) {
			setQuestionNumber(0);
		}
	}, [category, questionNumber]);

	// Saving quizz to local storage
	localStorage.setItem('Quizz Isadora', JSON.stringify(state));

	console.log('this category before rendering: ', category);
	console.log(state);
	return (
		<form className="create-page">
			{textDisplay && <TextIntro />}
			<div className="header-sub">
				<div
					className={
						textDisplay
							? 'textIntro-close-btn'
							: 'textIntro-more-btn'
					}
					onClick={showHideText}
				>
					<span>{textBtnLabel}</span>
				</div>
			</div>
			<div className="controlCategories-bar">
				<div className="categories-list">
					{state.map((el) => (
						<Category
							selectCategory={selectCategory}
							id={el.id}
							category={category}
							categoryName={el.categoryName}
							key={`category${el.id}`}
						/>
					))}
				</div>
				<Button
					className="create-Category-btn"
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
				deleteQuestion={deleteQuestion}
				value={state[category].questions[questionNumber].question}
				id={state[category].questions[questionNumber].id}
			/>
			{state[category].questions[questionNumber].options.map(
				(el, i, arr) => (
					<Option
						id={i}
						key={`option${i}`}
						value={el}
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
						lastitem={i === arr.length - 1}
					/>
				)
			)}
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
