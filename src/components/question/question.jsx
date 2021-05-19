import React from 'react';
import './question.scss';

export default function Question({ value, onChange, deleteQuestion, id }) {
	return (
		<div className="question">
			<div className="label-input-question">
				<label>Question:</label>
				<input
					onChange={onChange}
					type="text"
					value={value}
					placeholder="Type your question here."
					name="question"
					id={id}
				></input>
			</div>
			<div className="delete-category-btn" onClick={deleteQuestion}>
				<span id={id}>Delete question</span>
			</div>
		</div>
	);
}
