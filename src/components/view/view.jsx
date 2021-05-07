import React from 'react';
import './view.scss';

// Components
import Button from '../button/button';

export default function View({
	category,
	questionNumber,
	questionNumberTotal,
	newQuestion,
	questions,
	selectQuestion,
}) {
	return (
		<React.Fragment>
			<div className="view-bar">
				<span>
					Category {category + 1} - Question N°{questionNumber + 1}/
					{questionNumberTotal}
				</span>
				<div className="view-btn" onClick={newQuestion}>
					<Button buttonName="New Question" />
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
						onClick={selectQuestion}
					>
						<span>question {el.id + 1}</span>
					</div>
				))}
			</div>
		</React.Fragment>
	);
}
