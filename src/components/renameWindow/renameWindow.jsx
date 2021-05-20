import React from 'react';
// StyleSheet
import './renameWindow.scss';

// Components
import { ReactComponent as IconDelete } from '../../assets/icons/delete-button-icon2.svg';

export default function RenameWindow({
	categoryName,
	value,
	onChange,
	keyWindow,
	closeWindow,
	renameCategory,
}) {
	return (
		<div className="rename-Window" key={keyWindow}>
			<form action="" className="rename-Window-form">
				<div className="rename-window-header">
					<h1> {categoryName}</h1>
					<IconDelete
						className="rename-window-delete-Icon"
						onClick={closeWindow}
					/>
				</div>
				<div className="label-input-category-window">
					<label>New name:</label>
					<input
						type="text"
						value={value}
						placeholder="Type custom category name."
						onChange={onChange}
						name="newCategoryName"
						autoComplete="off"
						autoFocus="on"
						maxLength="34"
					></input>
				</div>
				<div className="category-window-buttons">
					<div className="cancel-category-btn" onClick={closeWindow}>
						<span>Cancel</span>
					</div>
					<div
						className="rename-category-btn"
						onClick={renameCategory}
					>
						Rename Category
					</div>
				</div>
			</form>
		</div>
	);
}
