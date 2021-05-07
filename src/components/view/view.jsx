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
}) {
	return (
		<React.Fragment>
			<div className="view-bar">
				<span>Category {parseInt(category) + 1}</span>
				<div className="delete-category-btn" onClick={deleteCategory}>
					<span>Delete category</span>
				</div>
			</div>
			<div className="view-questions">
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
						<span>question {el.id + 1}</span>
					</div>
				))}
				<div className="view-btn" onClick={newQuestion}>
					<Button buttonName="New Question" />
				</div>
			</div>
		</React.Fragment>
	);
}
