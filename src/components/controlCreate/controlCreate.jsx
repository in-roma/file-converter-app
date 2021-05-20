import React from 'react';
import './controlCreate.scss';

// Components

export default function ControlCreate({
	totalCategory,
	generateFile,
	href,
	resetQuizz,
}) {
	return (
		<div className="createFile-control">
			<div className="createFile-control-counts">
				<span>Total of Categories: {totalCategory}</span>
			</div>
			<div className="creates-btns">
				<div className="reset-category-btn" onClick={resetQuizz}>
					<span>Reset Trivia</span>
				</div>
				<div className="createFile-control-button">
					<a
						className="generate-file-btn"
						onClick={generateFile}
						href={href}
						download="quizz.text"
					>
						Generate file
					</a>
				</div>
			</div>
		</div>
	);
}
