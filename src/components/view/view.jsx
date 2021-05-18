import React from 'react';
import './view.scss';

// Components
import Button from '../button/button';

export default function View({
	category,
	deleteCategory,
	questionNumber,
	newQuestion,
	questions,
	selectQuestion,
	renameCategory,
	state,
}) {
	return (
		<React.Fragment>
			<div className="view-bar">
				<div className="category-actions">
					<span>{state[category].categoryName}</span>
					<div
						className="rename-category-btn"
						onClick={renameCategory}
					>
						<span>Rename</span>
					</div>
				</div>

				<div className="delete-category-btn" onClick={deleteCategory}>
					<span>Delete category</span>
				</div>
			</div>

			<div className="view-questions">
				<div className="list-questions">
					{questions.map((el) => (
						<div
							className={
								questionNumber === el.id
									? 'question-btn-selected'
									: 'question-btn'
							}
							id={parseInt(el.id + 1)}
							key={`questionBtn${el.id + 1}`}
							onClick={selectQuestion}
						>
							<span>Question {el.id + 1}</span>
						</div>
					))}
				</div>

				<Button buttonName="New Question" onClick={newQuestion} />
			</div>
		</React.Fragment>
	);
}
