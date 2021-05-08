import React from 'react';
import './controlCreate.scss';

// Components

export default function ControlCreate({ totalCategory, generateFile, href }) {
	return (
		<div className="createFile-control">
			<div className="createFile-control-counts">
				<span>Total of Categories: {totalCategory}</span>
			</div>
			<div className="createFile-control-button">
				<div className="createFile-control-questions-mode">
					<select>
						<option>List View</option>
						<option>Numbered</option>
						<option>Lettered</option>
					</select>
				</div>

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
	);
}
